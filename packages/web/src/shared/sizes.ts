/**
 * Regras de tamanho compartilhadas pela API, pela interface e pelos testes.
 * A loja informa a grade peça por peça; quando não existe grade (ou o tamanho
 * precisa ser combinado), a peça não recebe um tamanho inventado.
 */
export interface SizeGrid {
  sizes: string[];
  sizeNote?: string;
}

/** Texto curto para cards, modal e mensagens do WhatsApp. */
export function sizeSummary(product: SizeGrid): string {
  if (product.sizes.length === 0) {
    return product.sizeNote ?? "Tamanho confirmado com a Eliane";
  }
  if (product.sizes.length === 1) return `Tamanho: ${product.sizes[0]}`;
  return `Tamanhos: ${product.sizes.join(" · ")}`;
}

/** Peças com mais de uma opção permitem escolher o tamanho antes do pedido. */
export function hasSizeChoice(product: Pick<SizeGrid, "sizes">): boolean {
  return product.sizes.length > 1;
}
