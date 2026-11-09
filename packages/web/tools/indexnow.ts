import { categories, products } from "../src/api/catalog/products";
import { indexNowPayload } from "../src/shared/seo";

// IndexNow não é uma garantia de rastreamento. Execute somente após publicar.
const payload = indexNowPayload(products, categories);
if (payload.urlList.length > 10_000)
  throw new Error("IndexNow aceita até 10.000 URLs por requisição.");
if (process.argv.includes("--dry-run")) {
  console.log(
    `Simulação: ${payload.urlList.length} URLs de ${payload.host}; chave pública em ${payload.keyLocation}. Nenhum envio foi feito.`,
  );
} else {
  const verified = await fetch(payload.keyLocation, { signal: AbortSignal.timeout(15_000) });
  if (!verified.ok || (await verified.text()).trim() !== payload.key) {
    throw new Error(
      "A chave IndexNow ainda não está acessível no domínio de produção. Publique o build antes de enviar.",
    );
  }
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok)
    throw new Error(`IndexNow respondeu HTTP ${response.status}. Nenhuma indexação é garantida.`);
  console.log(
    `IndexNow aceitou a solicitação (HTTP ${response.status}) para ${payload.urlList.length} URLs. Isso não garante indexação.`,
  );
}
