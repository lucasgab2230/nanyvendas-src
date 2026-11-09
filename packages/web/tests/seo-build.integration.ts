import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { readFileSync } from "node:fs";
import { once } from "node:events";
import { after, before, describe, it } from "node:test";
import { JSDOM } from "jsdom";
import { SITE_URL, INDEXNOW_KEY } from "../src/shared/seo";

let server: ChildProcessWithoutNullStreams;
let origin: string;

before(async () => {
  server = spawn("./node_modules/.bin/tsx", ["src/server.ts"], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: "0" },
    stdio: ["pipe", "pipe", "pipe"],
  });
  origin = await new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Servidor de produção não iniciou")), 15_000);
    let output = "";
    const consume = (chunk: Buffer) => {
      output += chunk.toString();
      const port = output.match(/Nany disponível na porta (\d+)/)?.[1];
      if (port) {
        clearTimeout(timeout);
        resolve(`http://127.0.0.1:${port}`);
      }
    };
    server.stdout.on("data", consume);
    server.stderr.on("data", consume);
    server.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.once("exit", (code) => {
      if (!origin) {
        clearTimeout(timeout);
        reject(new Error(`Servidor terminou: ${code}\n${output}`));
      }
    });
  });
});

after(async () => {
  if (server && server.exitCode === null) {
    const closed = once(server, "exit");
    server.kill("SIGTERM");
    await closed;
  }
});

describe("Build e HTTP de produção", () => {
  it("publica todas as URLs do sitemap com HTML e canonical corretos", async () => {
    const sitemap = await fetch(`${origin}/sitemap.xml`);
    assert.equal(sitemap.status, 200);
    const xml = new JSDOM(await sitemap.text(), { contentType: "text/xml" }).window.document;
    const urls = [
      ...xml.getElementsByTagNameNS("http://www.sitemaps.org/schemas/sitemap/0.9", "loc"),
    ].map((node) => node.textContent!);
    assert.equal(urls.length, 20);
    for (const url of urls) {
      assert.equal(new URL(url).origin, SITE_URL);
      const path = new URL(url).pathname;
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 200, path);
      const doc = new JSDOM(await response.text()).window.document;
      assert.ok(doc.querySelector("#root main h1"), `${path}: conteúdo inicial`);
      assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute("href"), url, path);
      assert.equal(
        doc.querySelector('meta[property="og:url"]')?.getAttribute("content"),
        url,
        path,
      );
      assert.match(
        doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
        /index/,
      );
      assert.doesNotMatch(
        doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
        /noindex/,
      );
      assert.ok(doc.querySelector("#structured-data"), path);
    }
  });

  it("arquivos de descoberta e imagem social respondem corretamente", async () => {
    for (const path of [
      "/robots.txt",
      "/llms.txt",
      "/images/social/nany.jpg",
      `/${INDEXNOW_KEY}.txt`,
    ]) {
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 200, path);
    }
    assert.match(
      await (await fetch(`${origin}/robots.txt`)).text(),
      /Sitemap: https:\/\/nanyvendas\.vercel\.app\/sitemap\.xml/,
    );
    assert.match(await (await fetch(`${origin}/llms.txt`)).text(), /Guarapuava/);
    assert.equal(await (await fetch(`${origin}/${INDEXNOW_KEY}.txt`)).text(), INDEXNOW_KEY);
  });

  it("filtros e links legados preservam a canonical da vitrine", async () => {
    for (const path of ["/?busca=anel&ordem=menor", "/?peca=anel-dourado"]) {
      const response = await fetch(`${origin}${path}`);
      const doc = new JSDOM(await response.text()).window.document;
      assert.equal(
        doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        `${SITE_URL}/`,
      );
    }
  });

  it("retorna 404 real e noindex para páginas ausentes, sem capturar API nem arquivos", async () => {
    for (const path of [
      "/nao-existe",
      "/semijoias/inexistente",
      "/categorias/conjuntos",
      "/categorias/brincos",
      "/semijoias/brinco-coracao-canelado",
      "/semijoias/anel-dourado-largo",
    ]) {
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 404, path);
      assert.equal(response.headers.get("x-robots-tag"), "noindex");
      const doc = new JSDOM(await response.text()).window.document;
      assert.match(doc.querySelector('meta[name="robots"]')!.getAttribute("content")!, /noindex/);
      assert.equal(doc.querySelector('link[rel="canonical"]'), null);
    }
    for (const path of ["/api/inexistente", "/imagem-inexistente.jpg"]) {
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 404, path);
      assert.doesNotMatch(response.headers.get("content-type") ?? "", /text\/html/);
    }
    assert.equal((await fetch(`${origin}/api/health`)).status, 200);
    assert.ok(
      readFileSync(new URL("../dist/404.html", import.meta.url), "utf8").includes("noindex"),
    );
  });
});
