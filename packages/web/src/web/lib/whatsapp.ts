import { selectionSummary } from "./selection";
import { STORE } from "../../shared/store";
export { STORE } from "../../shared/store";

/**
 * Tudo que envolve WhatsApp passa por aqui.
 *
 * Regra combinada com a loja: o link é sempre `wa.me` com mensagem padrão já
 * escrita, para a Eliane saber de qual peça a cliente está falando antes mesmo
 * de responder a primeira mensagem.
 */

/** Mensagem que abre qualquer conversa vinda do site. */
export const DEFAULT_MESSAGE = `Olá, ${STORE.owner}! Vim pelo site da ${STORE.name} e gostaria de conhecer as peças e confirmar a disponibilidade.`;

/** Saudação acolhedora para quem está fazendo a primeira visita ao site. */
export const FIRST_VISIT_MESSAGE = `Olá, ${STORE.owner}! Estou conhecendo a Nany pela primeira vez e gostaria de uma ajuda para escolher. Você pode me mostrar as peças disponíveis e confirmar valores e entrega?`;

/** Formata o preço do jeito que a cliente lê em voz alta. */
export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Mensagem com a peça identificada — usada no botão do modal. */
export function productMessage(
  product: {
    name: string;
    price: number | null;
    slug: string;
    sizes?: string[];
    sizeNote?: string;
  },
  size?: string | null,
): string {
  // Tamanho único já vai na mensagem; sem grade, avisamos que é combinado.
  const chosenSize = size ?? (product.sizes?.length === 1 ? product.sizes[0] : null);
  const sizeLine = chosenSize
    ? `Tamanho: ${chosenSize}`
    : product.sizes?.length === 0 || (product.sizes && product.sizes.length > 1)
      ? "Tamanho: a confirmar com a Eliane"
      : null;
  return [
    `Olá, ${STORE.owner}! Vi no site a peça *${product.name}*${product.price === null ? "" : ` (${formatPrice(product.price)})`}`,
    product.price === null
      ? "e gostaria de saber o preço e se ela está disponível."
      : "e gostaria de saber se ela está disponível.",
    "",
    ...(sizeLine ? [sizeLine] : []),
    `Peça: ${product.slug}`,
  ].join("\n");
}

/** Monta o link wa.me com a mensagem já codificada. */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function firstVisitWhatsappLink(): string {
  return whatsappLink(FIRST_VISIT_MESSAGE);
}

export function productWhatsappLink(
  product: {
    name: string;
    price: number | null;
    slug: string;
    sizes?: string[];
    sizeNote?: string;
  },
  size?: string | null,
): string {
  return whatsappLink(productMessage(product, size));
}

/** Uma mensagem única, com referências suficientes para a loja identificar tudo. */
export function selectionMessage(
  products: { name: string; price: number | null; slug: string }[],
): string {
  if (products.length === 0) return DEFAULT_MESSAGE;
  const { subtotal, unknownPrices: unknown } = selectionSummary(products);
  return [
    `Olá, ${STORE.owner}! Escolhi estas peças no site da Nany:`,
    "",
    ...products.map(
      (product, index) =>
        `${index + 1}. *${product.name}* — ${product.price === null ? "consultar preço" : formatPrice(product.price)}\nReferência: ${product.slug}`,
    ),
    "",
    `Subtotal dos preços informados: ${formatPrice(subtotal)}${unknown ? ` + ${unknown} ${unknown === 1 ? "peça sob consulta" : "peças sob consulta"}.` : "."}`,
    "Você pode confirmar os valores, a disponibilidade, as formas de pagamento e as opções de entrega ou retirada?",
  ].join("\n");
}

export function selectionWhatsappLink(
  products: { name: string; price: number | null; slug: string }[],
): string {
  return whatsappLink(selectionMessage(products));
}
