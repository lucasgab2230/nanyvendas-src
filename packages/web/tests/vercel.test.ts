import assert from "node:assert/strict";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import type { Server } from "node:http";
import { after, before, describe, it } from "node:test";
import { getRequestListener } from "@hono/node-server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import * as rootEntrypoint from "../../../api/index.mjs";
import * as webEntrypoint from "../api/index.mjs";
import type { AppRouterClient } from "../src/api";

// Adapt the same Web Request/Response contract that Vercel uses to a real
// local HTTP connection. The API entry points themselves never call listen().
const methods = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] as const;
for (const [name, entrypoint] of [
  ["raiz do repositório", rootEntrypoint],
  ["packages/web", webEntrypoint],
] as const) {
  const handler = getRequestListener((request) => {
    const method = request.method as (typeof methods)[number];
    return entrypoint[method]?.(request) ?? new Response(null, { status: 405 });
  });
  describe(`Função Vercel — ${name}`, () => {
    let server: Server;
    let origin: string;
    let client: AppRouterClient;

    before(async () => {
      server = createServer(handler);
      server.listen(0, "127.0.0.1");
      await once(server, "listening");
      const address = server.address();
      assert.ok(address && typeof address !== "string");
      origin = `http://127.0.0.1:${address.port}`;
      client = createORPCClient(
        new RPCLink({
          url: `${origin}/api/rpc`,
          fetch: (request, init) => fetch(request, { ...init, signal: AbortSignal.timeout(5_000) }),
        }),
      );
    });

    after(async () => {
      const closed = once(server, "close");
      server.close();
      server.closeAllConnections();
      await closed;
    });

    it("responde à verificação de saúde em HTTP", async () => {
      const response = await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(5_000) });
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /application\/json/);
      assert.deepEqual(await response.json(), { status: "ok" });
    });

    it("entrega as 53 peças pelo oRPC em HTTP", async () => {
      const result = await client.catalog.list();
      assert.equal(result.total, 53);
      assert.equal(result.products.length, 53);
    });

    it("preserva o corpo JSON dos filtros no POST", async () => {
      const result = await client.catalog.list({ category: "colares", search: "BORBOLETA" });
      assert.deepEqual(
        result.products.map((product) => product.slug),
        ["colar-de-borboleta"],
      );
    });

    it("serializa os detalhes e os erros de produto", async () => {
      assert.equal((await client.catalog.get({ slug: "anel-dourado" })).price, 139.9);
      await assert.rejects(
        () => client.catalog.get({ slug: "nao-existe" }),
        (error: unknown) => {
          assert.ok(error instanceof Error && "code" in error);
          assert.equal(error.code, "NOT_FOUND");
          return true;
        },
      );
    });

    it("não devolve a página HTML para uma rota de API inexistente", async () => {
      for (const path of ["/api", "/api/nao-existe", "/api/rpc/nao-existe"]) {
        const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(5_000) });
        assert.equal(response.status, 404, path);
        assert.doesNotMatch(response.headers.get("content-type") ?? "", /text\/html/, path);
        assert.doesNotMatch(await response.text(), /<!doctype|<html/i, path);
      }
    });
  });
}

interface DeployConfig {
  outputDirectory: string;
  rewrites: Array<{ source: string; destination: string }>;
}

const rootDeployConfig: DeployConfig = JSON.parse(
  readFileSync(new URL("../../../vercel.json", import.meta.url), "utf8"),
);
const webDeployConfig: DeployConfig = JSON.parse(
  readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
);

describe("Configuração de deploy Vercel", () => {
  it("expõe os mesmos métodos HTTP com Request/Response, sem pré-processar o corpo", () => {
    for (const method of methods) {
      assert.equal(typeof rootEntrypoint[method], "function", method);
      assert.equal(typeof webEntrypoint[method], "function", method);
    }
    assert.ok(!("default" in webEntrypoint));
  });

  it("suporta as duas pastas raiz sem divergir nas rotas ou no build", () => {
    assert.equal(rootDeployConfig.outputDirectory, "packages/web/dist");
    assert.equal(webDeployConfig.outputDirectory, "dist");
    assert.deepEqual({ ...rootDeployConfig, outputDirectory: "dist" }, webDeployConfig);
  });

  it("encaminha a API e as páginas pré-renderizadas sem fallback genérico", () => {
    assert.deepEqual(rootDeployConfig.rewrites, [
      { source: "/api/:path*", destination: "/api/index" },
      { source: "/lingerie", destination: "/lingerie/index.html" },
      { source: "/categorias/:slug", destination: "/categorias/:slug/index.html" },
      { source: "/semijoias/:slug", destination: "/semijoias/:slug/index.html" },
    ]);
    assert.ok(rootDeployConfig.rewrites.every((rule) => rule.destination !== "/index.html"));
  });
});
