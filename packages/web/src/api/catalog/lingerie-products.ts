/**
 * Catálogo de lingerie da Nany — atualização de novembro de 2026.
 * Nomes, códigos, preços e tamanhos foram informados pela loja; cada peça usa a
 * foto original enviada. Os códigos conferem com as etiquetas visíveis nas fotos.
 * Não presumimos composição, medidas ou estoque além do que a loja confirmou.
 */
export type LingerieCategorySlug =
  | "calcinhas"
  | "sutias"
  | "cuecas"
  | "conjuntos"
  | "kits"
  | "pijamas"
  | "leggings"
  | "blusas";

export interface LingerieCategory {
  slug: LingerieCategorySlug;
  name: string;
  tagline: string;
}

export interface LingerieProduct {
  id: number;
  slug: string;
  name: string;
  /** Código informado pela loja; null quando a peça não tem código no catálogo. */
  codigo: string | null;
  category: LingerieCategorySlug;
  /**
   * Tamanhos realmente disponíveis, informados pela loja. Lista vazia quando a
   * peça não tem grade de tamanhos e precisa ser combinada no atendimento.
   */
  sizes: string[];
  /** Observação da loja sobre a grade (equivalência ou peça sem tamanho). */
  sizeNote?: string;
  price: number;
  compareAtPrice?: number;
  summary: string;
  description: string;
  highlights: string[];
  badge?: string;
  featured?: boolean;
  tone: number;
  image: string | null;
}

export const lingerieCategories: LingerieCategory[] = [
  { slug: "calcinhas", name: "Calcinhas", tagline: "Delicadeza e conforto" },
  { slug: "sutias", name: "Sutiãs", tagline: "Sustentação e caimento" },
  { slug: "cuecas", name: "Cuecas", tagline: "Conforto no dia a dia" },
  { slug: "conjuntos", name: "Conjuntos", tagline: "Combinações prontas" },
  { slug: "kits", name: "Kits", tagline: "Mais de uma peça junta" },
  { slug: "pijamas", name: "Pijamas", tagline: "Noites aconchegantes" },
  { slug: "leggings", name: "Leggings", tagline: "Movimento e conforto" },
  { slug: "blusas", name: "Blusas", tagline: "Para completar o look" },
];

const imagePath = (filename: string) => `/images/images/${filename}.jpg`;

export const lingerieProducts: LingerieProduct[] = [
  {
    id: 101,
    slug: "tanga-bolsinha",
    name: "Tanga Bolsinha",
    codigo: "18.1",
    category: "calcinhas",
    sizes: ["M", "G", "GG"],
    price: 22.9,
    summary: "Tanga Bolsinha — código 18.1. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 18.1", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_171415"),
  },
  {
    id: 102,
    slug: "tanga-confortao",
    name: "Tanga Confortão",
    codigo: "8.10",
    category: "calcinhas",
    sizes: ["M", "G", "GG"],
    price: 23.9,
    summary: "Tanga Confortão — código 8.10. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 8.10", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_171717"),
  },
  {
    id: 103,
    slug: "fio-dental-colegial",
    name: "Fio Dental Colegial",
    codigo: "9.21",
    category: "calcinhas",
    sizes: ["M", "G"],
    price: 21.9,
    summary: "Fio Dental Colegial — código 9.21. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 9.21", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_171756"),
  },
  {
    id: 104,
    slug: "fio-dental-duplo-largo",
    name: "Fio Dental Duplo Largo",
    codigo: "9.28",
    category: "calcinhas",
    sizes: ["P", "M", "G"],
    price: 27.9,
    summary: "Fio Dental Duplo Largo — código 9.28. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 9.28", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_172227"),
  },
  {
    id: 105,
    slug: "calcinha-cotton",
    name: "Calcinha Cotton",
    codigo: "16.1",
    category: "calcinhas",
    sizes: ["M", "G"],
    price: 20.9,
    summary: "Calcinha Cotton — código 16.1. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 16.1", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_172351"),
  },
  {
    id: 106,
    slug: "calcinha-infantil-personagens",
    name: "Calcinha Infantil Personagens",
    codigo: "5.3",
    category: "calcinhas",
    sizes: ["G", "GG"],
    price: 14.9,
    summary: "Calcinha Infantil Personagens — código 5.3. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 5.3", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_172422"),
  },
  {
    id: 107,
    slug: "fio-dental-renda",
    name: "Fio Dental Renda",
    codigo: "9.12",
    category: "calcinhas",
    sizes: ["G", "GG"],
    price: 21.9,
    summary: "Fio Dental Renda — código 9.12. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 9.12", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_171552"),
  },
  {
    id: 108,
    slug: "calcola-cotton-lisa",
    name: "Calçola Cotton Lisa",
    codigo: "7.16",
    category: "calcinhas",
    sizes: ["M", "G", "GG"],
    price: 20.9,
    summary: "Calçola Cotton Lisa — código 7.16. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 7.16", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_172707"),
  },
  {
    id: 109,
    slug: "fio-dental",
    name: "Fio Dental",
    codigo: "8.7",
    category: "calcinhas",
    sizes: ["M", "G", "GG"],
    price: 27.9,
    summary: "Fio Dental — código 8.7. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 8.7", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_172759"),
  },
  {
    id: 110,
    slug: "fio-dental-fabiana",
    name: "Fio Dental Fabiana",
    codigo: "8.4",
    category: "calcinhas",
    sizes: ["M"],
    price: 18.9,
    summary: "Fio Dental Fabiana — código 8.4. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 8.4", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_173001"),
  },
  {
    id: 111,
    slug: "calcinha-lateral-larga",
    name: "Calcinha Lateral Larga",
    codigo: "8.5",
    category: "calcinhas",
    sizes: ["M", "G", "GG"],
    price: 20.9,
    summary: "Calcinha Lateral Larga — código 8.5. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 8.5", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_173106"),
  },
  {
    id: 112,
    slug: "fio-dental-lateral-largo",
    name: "Fio Dental Lateral Largo",
    codigo: "9.30",
    category: "calcinhas",
    sizes: ["P", "M", "G"],
    price: 23.9,
    summary: "Fio Dental Lateral Largo — código 9.30. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 9.30", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_173156"),
  },
  {
    id: 113,
    slug: "tangao-cotton-lycra",
    name: "Tangão Cotton/Lycra",
    codigo: "7.5",
    category: "calcinhas",
    sizes: ["P", "M"],
    price: 24.9,
    summary: "Tangão Cotton/Lycra — código 7.5. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 7.5", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_172909"),
  },
  {
    id: 114,
    slug: "calcola-microfibra",
    name: "Calçola Microfibra",
    codigo: "18.10",
    category: "calcinhas",
    sizes: ["G", "GG"],
    price: 41.9,
    summary: "Calçola Microfibra — código 18.10. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 18.10", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_162513"),
  },
  {
    id: 115,
    slug: "fio-duplo",
    name: "Fio Duplo",
    codigo: "18.11",
    category: "calcinhas",
    sizes: ["M", "G"],
    price: 39.9,
    summary: "Fio Duplo — código 18.11. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 18.11", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_171258"),
  },
  {
    id: 116,
    slug: "calcinha-canelada-zee-nucci",
    name: "Calcinha Canelada Zee Nucci",
    codigo: null,
    category: "calcinhas",
    sizes: ["P", "M"],
    price: 31.9,
    summary: "Calcinha Canelada Zee Nucci — peça da coleção. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_161952"),
  },
  {
    id: 117,
    slug: "sutia-reforcado-renda",
    name: "Sutiã Reforçado Renda",
    codigo: "6.16",
    category: "sutias",
    sizes: ["G"],
    price: 43.9,
    summary: "Sutiã Reforçado Renda — código 6.16. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.16", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_173307"),
  },
  {
    id: 118,
    slug: "sutia-microfibra-nadador",
    name: "Sutiã Microfibra Nadador",
    codigo: "6.20",
    category: "sutias",
    sizes: ["GG"],
    price: 38.9,
    summary: "Sutiã Microfibra Nadador — código 6.20. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.20", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_173351"),
  },
  {
    id: 119,
    slug: "sutia-gripir",
    name: "Sutiã Gripir",
    codigo: "6.4",
    category: "sutias",
    sizes: ["M"],
    price: 56.9,
    summary: "Sutiã Gripir — código 6.4. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.4", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_174020"),
  },
  {
    id: 120,
    slug: "sutia-fita-reforcado",
    name: "Sutiã Fita Reforçado",
    codigo: "6.6",
    category: "sutias",
    sizes: ["GG"],
    price: 64.9,
    summary: "Sutiã Fita Reforçado — código 6.6. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.6", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_174108"),
  },
  {
    id: 121,
    slug: "sutia-zipper",
    name: "Sutiã Zipper",
    codigo: "6.7",
    category: "sutias",
    sizes: ["P", "G"],
    price: 75.9,
    summary: "Sutiã Zipper — código 6.7. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.7", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_174321"),
  },
  {
    id: 122,
    slug: "sutia-microfibra-com-renda",
    name: "Sutiã Microfibra com Renda",
    codigo: "6.9",
    category: "sutias",
    sizes: ["GG"],
    price: 45.9,
    summary: "Sutiã Microfibra com Renda — código 6.9. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.9", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_174225"),
  },
  {
    id: 123,
    slug: "sutia-drapeado-com-bojo",
    name: "Sutiã Drapeado com Bojo",
    codigo: "6.17",
    category: "sutias",
    sizes: ["G", "GG"],
    price: 51.9,
    summary: "Sutiã Drapeado com Bojo — código 6.17. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 6.17", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_174412"),
  },
  {
    id: 124,
    slug: "sutia-rendado",
    name: "Sutiã Rendado",
    codigo: "11.1",
    category: "sutias",
    sizes: ["M"],
    price: 49.9,
    summary: "Sutiã Rendado — código 11.1. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 11.1", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_174504"),
  },
  {
    id: 125,
    slug: "sutia-reforcado-119",
    name: "Sutiã Reforçado",
    codigo: null,
    category: "sutias",
    sizes: ["48"],
    sizeNote: "Tamanho 48 equivale ao GG",
    price: 119.9,
    summary: "Sutiã Reforçado — peça da coleção. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho, bojo e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_174806"),
  },
  {
    id: 126,
    slug: "cueca-boxer-microfibra",
    name: "Cueca Boxer Microfibra",
    codigo: "3.9",
    category: "cuecas",
    sizes: ["P", "M"],
    price: 27.9,
    summary: "Cueca Boxer Microfibra — código 3.9. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 3.9", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_173454"),
  },
  {
    id: 127,
    slug: "cueca-boxer-juvenil",
    name: "Cueca Boxer Juvenil",
    codigo: "3.7",
    category: "cuecas",
    sizes: ["M", "G", "GG"],
    price: 17.9,
    summary: "Cueca Boxer Juvenil — código 3.7. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 3.7", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_173613"),
  },
  {
    id: 128,
    slug: "cueca-boxer-feminina",
    name: "Cueca Boxer Feminina",
    codigo: "3.8",
    category: "cuecas",
    sizes: ["G"],
    price: 23.9,
    summary: "Cueca Boxer Feminina — código 3.8. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 3.8", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_172524"),
  },
  {
    id: 129,
    slug: "conjunto-fashion",
    name: "Conjunto Fashion",
    codigo: "1.6",
    category: "conjuntos",
    sizes: ["P"],
    price: 99.9,
    summary: "Conjunto Fashion — código 1.6. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 1.6", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_173816"),
  },
  {
    id: 130,
    slug: "conjunto-rendado",
    name: "Conjunto Rendado",
    codigo: "2.4",
    category: "conjuntos",
    sizes: ["G"],
    price: 99.9,
    summary: "Conjunto Rendado — código 2.4. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 2.4", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_173919"),
  },
  {
    id: 131,
    slug: "conjunto-renda",
    name: "Conjunto Renda",
    codigo: "11.7",
    category: "conjuntos",
    sizes: ["M"],
    price: 69.9,
    summary: "Conjunto Renda — código 11.7. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 11.7", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_174706"),
  },
  {
    id: 132,
    slug: "conjunto-renda-cores",
    name: "Conjunto Renda Cores",
    codigo: "12.3",
    category: "conjuntos",
    sizes: ["M"],
    price: 74.9,
    summary: "Conjunto Renda Cores — código 12.3. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 12.3", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_174919"),
  },
  {
    id: 133,
    slug: "conjunto-comportado",
    name: "Conjunto Comportado",
    codigo: "12.4",
    category: "conjuntos",
    sizes: ["G"],
    price: 74.9,
    summary: "Conjunto Comportado — código 12.4. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 12.4", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_175204"),
  },
  {
    id: 134,
    slug: "conjunto-promocao",
    name: "Conjunto Promoção",
    codigo: null,
    category: "conjuntos",
    sizes: ["GG"],
    price: 79.9,
    summary: "Conjunto Promoção — peça da coleção. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Peça único com sutiã e calcinha; confirme tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_175026"),
  },
  {
    id: 135,
    slug: "kit-calcinha",
    name: "Kit Calcinha",
    codigo: null,
    category: "kits",
    sizes: ["P"],
    price: 39.9,
    summary: "Kit Calcinha — peça da coleção. Conjunto de peças vendido junto; confirme tamanhos e cores com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Conjunto de peças vendido junto; confirme tamanhos e cores com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_162306"),
  },
  {
    id: 136,
    slug: "kit-cueca",
    name: "Kit Cueca",
    codigo: null,
    category: "kits",
    sizes: [],
    sizeNote: "Tamanho a confirmar com a Eliane",
    price: 59.0,
    summary: "Kit Cueca — peça da coleção. Conjunto de peças vendido junto; confirme tamanhos e cores com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Conjunto de peças vendido junto; confirme tamanhos e cores com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_162219"),
  },
  {
    id: 137,
    slug: "pijama-infantil",
    name: "Pijama Infantil",
    codigo: "14.1",
    category: "pijamas",
    sizes: ["12"],
    price: 69.9,
    summary: "Pijama Infantil — código 14.1. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 14.1", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_160116"),
  },
  {
    id: 138,
    slug: "baby-doll-de-malha-helanca",
    name: "Baby Doll de Malha/Helanca",
    codigo: "15.10",
    category: "pijamas",
    sizes: ["G"],
    price: 59.9,
    summary: "Baby Doll de Malha/Helanca — código 15.10. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 15.10", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_161341"),
  },
  {
    id: 139,
    slug: "legging-academia",
    name: "Legging Academia",
    codigo: "15.19",
    category: "leggings",
    sizes: ["G"],
    price: 179.9,
    summary: "Legging Academia — código 15.19. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 15.19", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 5,
    image: imagePath("20261108_160812"),
  },
  {
    id: 140,
    slug: "legging-montaria",
    name: "Legging Montaria",
    codigo: "1.5",
    category: "leggings",
    sizes: [],
    sizeNote: "Tamanho a confirmar com a Eliane",
    price: 139.9,
    summary: "Legging Montaria — código 1.5. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 1.5", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 1,
    image: imagePath("20261108_161510"),
  },
  {
    id: 141,
    slug: "legging-forrada",
    name: "Legging Forrada",
    codigo: "1.5",
    category: "leggings",
    sizes: ["GG"],
    price: 139.9,
    summary: "Legging Forrada — código 1.5. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 1.5", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 2,
    image: imagePath("20261108_161735"),
  },
  {
    id: 142,
    slug: "blusa",
    name: "Blusa",
    codigo: null,
    category: "blusas",
    sizes: ["M"],
    price: 99.9,
    summary: "Blusa — peça da coleção. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 3,
    image: imagePath("20261108_160551"),
  },
  {
    id: 143,
    slug: "blusinhas-variadas",
    name: "Blusinhas Variadas",
    codigo: "15.14",
    category: "blusas",
    sizes: ["M"],
    price: 59.9,
    summary: "Blusinhas Variadas — código 15.14. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp.",
    description:
      "Peça de lingerie da Nany. Confira o modelo na foto e combine tamanho e cor com a Eliane pelo WhatsApp. O valor e a disponibilidade são confirmados no atendimento.",
    highlights: ["Código 15.14", "Foto real da peça", "Atendimento pelo WhatsApp"],
    tone: 4,
    image: imagePath("20261108_161100"),
  },
];

// Regras de tamanho também usadas pela interface e pelos testes.
export { sizeSummary as lingerieSizeSummary, hasSizeChoice } from "../../shared/sizes";
