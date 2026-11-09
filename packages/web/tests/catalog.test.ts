import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { products, categories } from "../src/api/catalog/products";
import {
  hasSizeChoice,
  lingerieCategories,
  lingerieProducts,
  lingerieSizeSummary,
} from "../src/api/catalog/lingerie-products";
import {
  defaultFilters,
  filterProducts,
  normalizeSearch,
  optimizedImage,
} from "../src/web/lib/catalog";
import type { PriceFilter } from "../src/web/lib/catalog";
import { readSelection, SELECTION_STORAGE_KEY, selectionSummary } from "../src/web/lib/selection";
import {
  DEFAULT_MESSAGE,
  STORE,
  formatPrice,
  productMessage,
  productWhatsappLink,
  selectionMessage,
  selectionWhatsappLink,
} from "../src/web/lib/whatsapp";

const publicDir = new URL("../public/", import.meta.url);

// Lista independente do cadastro: detecta troca de foto, nome ou preço por engano.
const approvedCatalog = [
  ["Colar Árvore da Vida", 59.9, "colares", "213857"],
  ["Colar de Borboleta", 69.9, "colares", "220233"],
  ["Pulseira com Corrente de Corações", 69.9, "pulseiras", "220447"],
  ["Pulseira com Corrente com Pedras e Quadrado", 69.9, "pulseiras", "220543"],
  ["Colar de Corrente Circular", 89.9, "colares", "220336"],
  ["Pulseira Infantil de Coração", 69.9, "pulseiras", "220918"],
  ["Colar com um Menino", 119.9, "colares", "220315"],
  ["Pulseira de Flor", 59.9, "pulseiras", "220655"],
  ["Pulseira com Pata de Cachorro/Gato", 69.9, "pulseiras", "220729"],
  ["Anel de Coração", 99.9, "aneis", "211337"],
  ["Anel Dourado", 139.9, "aneis", "212044"],
  ["Anel com Textura", 89.9, "aneis", "213757"],
  ["Anel com Estrela", 69.9, "aneis", "211615"],
  ["Anel de Borboleta", 89.9, "aneis", "211515"],
  ["Anel com Símbolo de Infinito", 109.9, "aneis", "212649"],
] as const;

export const newCatalog = [
  ["143632", "Colar de Coração", 89.9, "colares"],
  ["144012", "Colar de Pedra Quadrada", 89.9, "colares"],
  ["144133", "Colar de Pingente de Menina", 79.9, "colares"],
  ["144451", "Colar com Pingente Quadrado", 89.9, "colares"],
  ["144612", "Colar com Flor", 109.9, "colares"],
  ["144817", "Colar de Desenho de Coração com Chave", 119.9, "colares"],
  ["144844", "Colar com Pingente de Coruja", 79.9, "colares"],
  ["144954", "Colar de Pingente Crucifixo", 99.9, "colares"],
  ["145017", "Pulseira", 89.9, "pulseiras"],
  ["145118", "Pulseira Pingente de Menino Folheado a Ouro", 69.9, "pulseiras"],
  ["145234", "Pulseira Folheado a Ouro Larga", 99.9, "pulseiras"],
  ["145442", "Pulseira com Pingente de Crucifixo e Amém", 69.9, "pulseiras"],
  ["145512", "Pulseira com Pérola de Flor", 79.9, "pulseiras"],
  ["145627", "Brinco Pequeno de Bolinha Prata", 11.9, "brincos"],
  ["145658", "Brinco Pequeno de Arco-Íris", 21.9, "brincos"],
  ["145725", "Brinco Pequeno de Rosas", 11.9, "brincos"],
  ["145801", "Brinco Pequeno de Estrela do Mar", 21.9, "brincos"],
  ["145936", "Brinco Pequeno de Girafa", 34.9, "brincos"],
  ["150114", "Brinco Pequeno de Coração", 11.9, "brincos"],
  ["150223", "Brinco Pequeno de Cavalo", 21.9, "brincos"],
  ["150259", "Brinco Pequeno de Cereja", 34.9, "brincos"],
  ["151359", "Brinco Pequeno de Floco de Neve", 21.9, "brincos"],
  ["151442", "Brinco Pequeno de Coração Dourado", 26.9, "brincos"],
  ["151525", "Brinco Pequeno de Pedra Dourado", 39.9, "brincos"],
  ["151559", "Brinco Pequeno de Carro", 39.9, "brincos"],
  ["151702", "Brinco Pequeno de Pedra Preta", 26.9, "brincos"],
  ["151749", "Brinco Pequeno de Pérola", 17.9, "brincos"],
  ["151827", "Brinco Pequeno de Quadradinho Dourado", 16.9, "brincos"],
  ["151923", "Brinco Pequeno de Coroa", 17.9, "brincos"],
  ["152111", "Colar de Flor Rosa", 79.9, "colares"],
  ["152204", "Brinco Gota Prata", 44.9, "brincos"],
  ["152444", "Anel Regulador", 79.9, "aneis"],
  ["152538", "Brinco Quadrado Pedras Coloridas", 44.9, "brincos"],
  ["152630", "Brinco Dourado Largo", 64.9, "brincos"],
  ["152727", "Colar Folheado Prata Pingente 3 Meninos", 149.9, "colares"],
  ["153005", "Brinco Pequeno Largo Dourado", 44.9, "brincos"],
  ["153025", "Brinco Folheado Prata Triângulo", 44.9, "brincos"],
  ["153133", "Colar Pingente 2 Meninas", 139.9, "colares"],
] as const;

describe("catálogo aprovado em novembro de 2026", () => {
  it("publica exatamente os 15 nomes, preços, categorias e fotos solicitados", () => {
    assert.equal(products.length, 15 + newCatalog.length);
    assert.deepEqual(
      products
        .slice(0, approvedCatalog.length)
        .map(({ name, price, category, image }) => [
          name,
          price,
          category,
          image?.match(/20261103_(\d+)\.jpg$/)?.[1],
        ]),
      approvedCatalog.map((item) => [...item]),
    );
    for (const field of ["id", "slug", "image"] as const) {
      assert.equal(new Set(products.map((product) => product[field])).size, products.length);
    }
    for (const product of products) {
      assert.ok(categories.some((category) => category.slug === product.category));
      assert.ok(Number.isFinite(product.price) && product.price! > 0);
      assert.ok(Math.abs(Math.round(product.price! * 100) - product.price! * 100) < 1e-8);
    }
    assert.deepEqual(
      categories.map((category) => category.slug),
      ["colares", "pulseiras", "brincos", "aneis"],
    );
    assert.deepEqual(
      categories.map((category) => products.filter((p) => p.category === category.slug).length),
      [15, 10, 21, 7],
    );
    assert.deepEqual(
      products.filter((product) => product.featured).map((p) => p.slug),
      ["colar-arvore-da-vida"],
    );
  });

  it("todas as fotos e suas três variantes otimizadas existem", async () => {
    for (const product of products) {
      assert.ok(product.image);
      for (const image of [
        product.image,
        ...([480, 960, 1600] as const).map((width) => optimizedImage(product.image!, width)),
      ]) {
        assert.ok((await stat(fileURLToPath(new URL(image.slice(1), publicDir)))).size > 0, image);
      }
    }
  });

  it("cada foto enviada pela loja está publicada em uma única peça", async () => {
    const images = [...products, ...lingerieProducts].map((product) => product.image);
    assert.equal(new Set(images).size, images.length);
    for (const image of images) {
      assert.ok((await stat(fileURLToPath(new URL(image!.slice(1), publicDir)))).size > 0, image!);
    }
  });

  it("associa os brincos e os colares/fios da nova lista às fotos certas", () => {
    assert.deepEqual(
      newCatalog.slice(0, 4).map(([photo, name, price]) => [name, price, photo]),
      [
        ["Colar de Coração", 89.9, "143632"],
        ["Colar de Pedra Quadrada", 89.9, "144012"],
        ["Colar de Pingente de Menina", 79.9, "144133"],
        ["Colar com Pingente Quadrado", 89.9, "144451"],
      ],
    );
    const brincos = products.filter((product) => product.category === "brincos");
    assert.equal(brincos.length, 21);
    assert.deepEqual(
      brincos.slice(0, 3).map((product) => [product.name, product.price, product.image]),
      [
        ["Brinco Pequeno de Bolinha Prata", 11.9, "/images/images/20261108_145627.jpg"],
        ["Brinco Pequeno de Arco-Íris", 21.9, "/images/images/20261108_145658.jpg"],
        ["Brinco Pequeno de Rosas", 11.9, "/images/images/20261108_145725.jpg"],
      ],
    );
  });

  it("publica a lingerie com as subcategorias e os códigos das fotos", () => {
    assert.equal(lingerieProducts.length, 43);
    assert.deepEqual(
      lingerieCategories.map((category) => [
        category.slug,
        lingerieProducts.filter((product) => product.category === category.slug).length,
      ]),
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
    const byName = new Map(lingerieProducts.map((product) => [product.name, product]));
    assert.deepEqual(
      [
        ["Tanga Bolsinha", "18.1", 22.9],
        ["Fio Dental Renda", "9.12", 21.9],
        ["Calça Berenice", "7.16", 20.9],
        ["Tangão Cotton/Lycra", "7.5", 24.9],
      ].map(([name, codigo, price]) => {
        const product = byName.get(name as string);
        return [product?.codigo, product?.price, codigo, price];
      }),
      [
        ["18.1", 22.9, "18.1", 22.9],
        ["9.12", 21.9, "9.12", 21.9],
        [undefined, undefined, "7.16", 20.9],
        ["7.5", 24.9, "7.5", 24.9],
      ],
    );
    assert.equal(byName.get("Calçola Cotton Lisa")?.codigo, "7.16");
    assert.equal(byName.get("Sutiã Zipper")?.codigo, "6.7");
    assert.equal(byName.get("Conjunto Fashion")?.codigo, "1.6");
    assert.equal(byName.get("Legging Academia")?.codigo, "15.19");
  });

  it("publica a grade de tamanhos informada pela loja em cada peça", () => {
    // Lista independente do cadastro: tamanho a mais ou a menos aparece aqui.
    const approvedSizes = [
      ["Tanga Bolsinha", ["M", "G", "GG"]],
      ["Tanga Confortão", ["M", "G", "GG"]],
      ["Fio Dental Colegial", ["M", "G"]],
      ["Fio Dental Duplo Largo", ["P", "M", "G"]],
      ["Calcinha Cotton", ["M", "G"]],
      ["Calcinha Infantil Personagens", ["G", "GG"]],
      ["Fio Dental Renda", ["G", "GG"]],
      ["Calçola Cotton Lisa", ["M", "G", "GG"]],
      ["Fio Dental", ["M", "G", "GG"]],
      ["Fio Dental Fabiana", ["M"]],
      ["Calcinha Lateral Larga", ["M", "G", "GG"]],
      ["Fio Dental Lateral Largo", ["P", "M", "G"]],
      ["Tangão Cotton/Lycra", ["P", "M"]],
      ["Calçola Microfibra", ["G", "GG"]],
      ["Fio Duplo", ["M", "G"]],
      ["Calcinha Canelada Zee Nucci", ["P", "M"]],
      ["Sutiã Reforçado Renda", ["G"]],
      ["Sutiã Microfibra Nadador", ["GG"]],
      ["Sutiã Gripir", ["M"]],
      ["Sutiã Fita Reforçado", ["GG"]],
      ["Sutiã Zipper", ["P", "G"]],
      ["Sutiã Microfibra com Renda", ["GG"]],
      ["Sutiã Drapeado com Bojo", ["G", "GG"]],
      ["Sutiã Rendado", ["M"]],
      ["Sutiã Reforçado", ["48"]],
      ["Cueca Boxer Microfibra", ["P", "M"]],
      ["Cueca Boxer Juvenil", ["M", "G", "GG"]],
      ["Cueca Boxer Feminina", ["G"]],
      ["Conjunto Fashion", ["P"]],
      ["Conjunto Rendado", ["G"]],
      ["Conjunto Renda", ["M"]],
      ["Conjunto Renda Cores", ["M"]],
      ["Conjunto Comportado", ["G"]],
      ["Conjunto Promoção", ["GG"]],
      ["Kit Calcinha", ["P"]],
      ["Kit Cueca", []],
      ["Pijama Infantil", ["12"]],
      ["Baby Doll de Malha/Helanca", ["G"]],
      ["Legging Academia", ["G"]],
      ["Legging Montaria", []],
      ["Legging Forrada", ["GG"]],
      ["Blusa", ["M"]],
      ["Blusinhas Variadas", ["M"]],
    ] as const;
    assert.deepEqual(
      lingerieProducts.map((product) => [product.name, product.sizes]),
      approvedSizes.map((item) => [item[0], [...item[1]]]),
    );
    const allowed = new Set(["P", "M", "G", "GG", "48", "12"]);
    for (const product of lingerieProducts) {
      for (const size of product.sizes) assert.ok(allowed.has(size), `${product.name}: ${size}`);
      assert.equal(new Set(product.sizes).size, product.sizes.length, product.name);
    }
    const byName = new Map(lingerieProducts.map((product) => [product.name, product]));
    assert.match(byName.get("Sutiã Reforçado")?.sizeNote ?? "", /48.*GG/);
    for (const name of ["Kit Cueca", "Legging Montaria"]) {
      const product = byName.get(name)!;
      assert.deepEqual(product.sizes, []);
      assert.match(product.sizeNote ?? "", /confirmar com a Eliane/);
    }
  });

  it("gera variantes para as fotos novas e mantém URLs externos intactos", () => {
    assert.equal(
      optimizedImage("/images/images/20261103_213857.jpg"),
      "/images/optimized/20261103_213857-480.webp",
    );
    assert.equal(optimizedImage("https://example.test/nova.jpg"), "https://example.test/nova.jpg");
    assert.equal(optimizedImage("/images/nova.jpg"), "/images/nova.jpg");
  });
});

describe("busca, filtros e ordenação", () => {
  it("normaliza acentos, maiúsculas e espaços", () => {
    assert.equal(normalizeSearch("  CORAÇÃO BORBOLETA  "), "coracao borboleta");
    const result = filterProducts(products, { ...defaultFilters, search: "coracao" });
    assert.ok(result.length > 3);
    for (const slug of [
      "pulseira-com-corrente-de-coracoes",
      "pulseira-infantil-de-coracao",
      "anel-de-coracao",
    ]) {
      assert.ok(result.some((product) => product.slug === slug), slug);
    }
  });

  it("combina várias palavras, categoria e preço", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      search: "anel PRATEADO",
      category: "aneis",
      price: "acima80",
    });
    assert.deepEqual(
      result.map((product) => product.slug),
      ["anel-de-coracao"],
    );
    assert.deepEqual(
      filterProducts(products, { ...defaultFilters, category: "pulseiras", search: "borboleta" }),
      [],
    );
  });

  it("não altera a ordem do catálogo original", () => {
    const ids = products.map((product) => product.id);
    filterProducts(products, { ...defaultFilters, sort: "maior" });
    assert.deepEqual(
      products.map((product) => product.id),
      ids,
    );
  });

  for (const sort of ["menor", "maior"] as const) {
    it(`${sort}: ordena os preços atuais e mantém futuros valores sob consulta ao final`, () => {
      const sample = [...products, { ...products[0]!, id: 100, price: null }];
      const result = filterProducts(sample, { ...defaultFilters, sort });
      assert.equal(result.at(-1)!.price, null);
      const prices = result.slice(0, -1).map((product) => product.price!);
      assert.deepEqual(
        prices,
        [...prices].sort((a, b) => (sort === "menor" ? a - b : b - a)),
      );
    });
  }

  it("respeita as faixas, incluindo limites e preço ausente", () => {
    const sample = [null, 49.9, 50, 50.01, 80, 80.01].map((price, index) => ({
      ...products[0]!,
      id: index,
      price,
    }));
    const expected: Record<PriceFilter, (number | null)[]> = {
      todos: [null, 49.9, 50, 50.01, 80, 80.01],
      ate50: [49.9, 50],
      "50a80": [50.01, 80],
      acima80: [80.01],
      consultar: [null],
    };
    for (const price of Object.keys(expected) as PriceFilter[]) {
      assert.deepEqual(
        filterProducts(sample, { ...defaultFilters, price }).map((product) => product.price),
        expected[price],
      );
    }
  });

  it("retorna vazio para uma busca sem correspondência", () => {
    assert.deepEqual(
      filterProducts(products, { ...defaultFilters, search: "nenhuma-peca-assim" }),
      [],
    );
  });
});

describe("seleção e mensagens de compra", () => {
  it("usa uma chave nova para não recuperar favoritos dos produtos removidos", () => {
    assert.equal(SELECTION_STORAGE_KEY, "nany:selection:v2");
    assert.notEqual(SELECTION_STORAGE_KEY, "nany:selection:v1");
  });

  it("recupera somente IDs positivos únicos, tolerando armazenamento inválido", () => {
    assert.deepEqual(readSelection('[1, 1, 2, "3", null, -1, 0, {}, 1.2]'), [1, 2]);
    for (const input of [null, "{", '"string"', "null", "{}"] as const)
      assert.deepEqual(readSelection(input), []);
    assert.equal(
      readSelection(JSON.stringify(Array.from({ length: 150 }, (_, index) => index + 1))).length,
      100,
    );
  });

  it("soma em centavos e não trata preços ausentes como produtos grátis", () => {
    assert.deepEqual(selectionSummary([{ price: 0.1 }, { price: 0.2 }, { price: null }]), {
      subtotal: 0.3,
      unknownPrices: 1,
    });
    assert.deepEqual(selectionSummary([products[0]!, products[10]!]), {
      subtotal: 199.8,
      unknownPrices: 0,
    });
  });

  it("formata reais em português", () => {
    assert.match(formatPrice(59.9).replace(/\s/g, " "), /^R\$ 59,90$/);
  });

  it("pedido individual identifica a peça e inclui o preço informado", () => {
    const product = products[0]!;
    const url = new URL(productWhatsappLink(product));
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, `/${STORE.whatsapp}`);
    assert.equal(url.searchParams.get("text"), productMessage(product));
    assert.match(url.searchParams.get("text")!, /R\$\s59,90/);
    assert.match(url.searchParams.get("text")!, /gostaria de saber se ela está disponível/);
    assert.ok(url.searchParams.get("text")!.includes(product.slug));
  });

  it("resume a grade e leva o tamanho escolhido para a mensagem do WhatsApp", () => {
    const bySlug = (slug: string) => lingerieProducts.find((product) => product.slug === slug)!;
    const bolsinha = bySlug("tanga-bolsinha");
    const fabiana = bySlug("fio-dental-fabiana");
    const kit = bySlug("kit-cueca");
    const reforcado = bySlug("sutia-reforcado-119");

    assert.equal(lingerieSizeSummary(bolsinha), "Tamanhos: M · G · GG");
    assert.equal(lingerieSizeSummary(fabiana), "Tamanho: M");
    assert.match(lingerieSizeSummary(kit), /confirmar com a Eliane/);
    assert.equal(hasSizeChoice(bolsinha), true);
    assert.equal(hasSizeChoice(fabiana), false);

    assert.match(productMessage(bolsinha, "G"), /Tamanho: G/);
    assert.equal(
      new URL(productWhatsappLink(bolsinha, "G")).searchParams.get("text"),
      productMessage(bolsinha, "G"),
    );
    // Tamanho único e peça sem grade também são comunicados sem intervenção.
    assert.match(productMessage(fabiana), /Tamanho: M/);
    assert.match(productMessage(reforcado), /Tamanho: 48/);
    assert.match(productMessage(kit), /Tamanho: a confirmar com a Eliane/);
    assert.match(productMessage(bolsinha), /Tamanho: a confirmar com a Eliane/);
    // Semijoias não têm grade e continuam sem a linha de tamanho.
    assert.doesNotMatch(productMessage(products[0]!), /Tamanho:/);
  });

  it("mensagem da seleção reúne as peças e soma os preços corretos", () => {
    const chosen = [products[0]!, products[10]!];
    const message = selectionMessage(chosen);
    assert.ok(
      chosen.every((product) => message.includes(product.name) && message.includes(product.slug)),
    );
    assert.match(message, /Subtotal dos preços informados: R\$\s199,80\./);
    assert.doesNotMatch(message, /sob consulta/);
    assert.match(message, /confirmar os valores, a disponibilidade/);
    assert.equal(new URL(selectionWhatsappLink(chosen)).searchParams.get("text"), message);
    assert.equal(selectionMessage([]), DEFAULT_MESSAGE);
  });

  it("mantém a consulta de preço e a soma parcial para futuras peças sem valor", () => {
    const unknown = {
      ...products[0]!,
      id: 100,
      slug: "futura-peca",
      name: "Futura peça",
      price: null,
    };
    assert.match(productMessage(unknown), /gostaria de saber o preço/);
    assert.match(selectionMessage([products[0]!, unknown]), /R\$\s59,90 \+ 1 peça sob consulta/);
  });
});
