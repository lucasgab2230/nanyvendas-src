import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import app from "../src/api";
import type { AppRouterClient } from "../src/api";

// Exercita a montagem HTTP real e a serialização oRPC, sem banco ou rede externa.
const client: AppRouterClient = createORPCClient(
  new RPCLink({
    url: "http://nany.test/api/rpc",
    fetch: (request) => app.fetch(request),
  }),
);

describe("API pública", () => {
  it("responde à verificação de saúde", async () => {
    const response = await app.request("/api/health");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  });

  it("entrega o catálogo completo pelo cliente HTTP", async () => {
    const result = await client.catalog.list();
    assert.equal(result.total, 53);
    assert.equal(result.products.length, 53);
    assert.deepEqual(
      result.featured.map((product) => product.slug),
      ["colar-arvore-da-vida"],
    );
  });

  it("busca sem acentos na API e combina categoria", async () => {
    const result = await client.catalog.list({ category: "colares", search: "BORBOLETA" });
    assert.deepEqual(
      result.products.map((product) => product.slug),
      ["colar-de-borboleta"],
    );
  });

  it("entrega um produto pelo slug", async () => {
    const result = await client.catalog.get({ slug: "anel-dourado" });
    assert.equal(result.price, 139.9);
  });

  it("não encontra produtos removidos do catálogo anterior", async () => {
    await assert.rejects(() => client.catalog.get({ slug: "brinco-coracao-canelado" }));
    await assert.rejects(() => client.catalog.get({ slug: "anel-dourado-largo" }));
  });

  it("produto inexistente retorna NOT_FOUND, não erro interno", async () => {
    for (const get of [client.catalog.get, client.vestuario.get, client.lingerie.get]) {
      await assert.rejects(
        () => get({ slug: "nao-existe" }),
        (error: unknown) => {
          assert.ok(error instanceof Error && "code" in error);
          assert.equal(error.code, "NOT_FOUND");
          return true;
        },
      );
    }
  });

  it("não publica itens fictícios de vestuário", async () => {
    const result = await client.vestuario.list();
    assert.equal(result.catalogTotal, 0);
    assert.deepEqual(result.products, []);
  });

  it("publica a lingerie com subcategorias, contagens e busca por código", async () => {
    const result = await client.lingerie.list();
    assert.equal(result.catalogTotal, 43);
    assert.equal(result.total, 43);
    assert.deepEqual(
      result.categories.map((category) => [category.slug, category.total]),
      [
        ["calcinhas", 16],
        ["sutias", 9],
        ["cuecas", 3],
        ["conjuntos", 6],
        ["kits", 2],
        ["pijamas", 2],
        ["leggings", 3],
        ["blusas", 2],
      ],
    );
    assert.equal(
      (await client.lingerie.list({ category: "sutias" })).products.length,
      9,
    );
    assert.deepEqual(
      (await client.lingerie.list({ search: "12.3" })).products.map((p) => p.slug),
      ["conjunto-renda-cores"],
    );
  });

  it("cadastra os 38 produtos novos de semijoias, incluindo brincos", async () => {
    const result = await client.catalog.list({ category: "brincos" });
    assert.equal(result.products.length, 21);
    const one = await client.catalog.get({ slug: "brinco-pequeno-de-girafa" });
    assert.equal(one.price, 34.9);
  });
});
