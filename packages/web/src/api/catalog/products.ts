/**
 * Catálogo da Nany Semijoias — atualização de novembro de 2026.
 * As 15 peças da atualização anterior continuam publicadas e receberam as 38
 * peças novas informadas pela loja (colares, pulseiras, brincos e anéis).
 * Nomes e preços informados pela loja; cada produto usa a foto original enviada.
 * As descrições relatam apenas os detalhes visíveis, sem presumir material ou medida.
 */

export type CategorySlug = "colares" | "pulseiras" | "brincos" | "aneis";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Preço informado pela loja; null fica disponível para futuras peças sob consulta. */
  price: number | null;
  compareAtPrice?: number;
  summary: string;
  description: string;
  highlights: string[];
  badge?: string;
  featured?: boolean;
  tone: number;
  image: string | null;
}

export const categories: Category[] = [
  { slug: "colares", name: "Colares", tagline: "O ponto de luz" },
  { slug: "pulseiras", name: "Pulseiras", tagline: "No pulso, todo dia" },
  { slug: "brincos", name: "Brincos", tagline: "Detalhes que brilham" },
  { slug: "aneis", name: "Anéis", tagline: "Para marcar o dia" },
];

const imagePath = (filename: string) => `/images/images/${filename}.jpg`;

export const products: Product[] = [
  {
    id: 1,
    slug: "colar-arvore-da-vida",
    name: "Colar Árvore da Vida",
    category: "colares",
    price: 59.9,
    featured: true,
    summary: "Colar prateado com pingente redondo de árvore da vida em relevo.",
    description:
      "Pingente redondo com árvore da vida em relevo, contorno trabalhado e acabamento prateado, acompanhado de corrente fina. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente Árvore da Vida", "Detalhes em relevo", "Acabamento prateado"],
    tone: 1,
    image: imagePath("20261103_213857"),
  },
  {
    id: 2,
    slug: "colar-de-borboleta",
    name: "Colar de Borboleta",
    category: "colares",
    price: 69.9,
    summary: "Colar prateado com pingente de borboleta e detalhes nas asas.",
    description:
      "Pingente de borboleta com asas trabalhadas em relevo e acabamento prateado, em uma corrente delicada. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente de borboleta", "Asas em relevo", "Acabamento prateado"],
    tone: 2,
    image: imagePath("20261103_220233"),
  },
  {
    id: 3,
    slug: "pulseira-com-corrente-de-coracoes",
    name: "Pulseira com Corrente de Corações",
    category: "pulseiras",
    price: 69.9,
    summary: "Pulseira prateada com elos em formato de coração e fecho lagosta.",
    description:
      "Corrente prateada formada por elos em formato de coração, com fecho lagosta. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Elos de coração", "Acabamento prateado", "Fecho lagosta"],
    tone: 3,
    image: imagePath("20261103_220447"),
  },
  {
    id: 4,
    slug: "pulseira-com-corrente-com-pedras-e-quadrado",
    name: "Pulseira com Corrente com Pedras e Quadrado",
    category: "pulseiras",
    price: 69.9,
    summary: "Pulseira prateada de múltiplas correntes com detalhes quadrados e pedras claras.",
    description:
      "Pulseira de acabamento prateado com várias fileiras de correntes, detalhes quadrados texturizados e pedras claras. O fecho lagosta aparece na foto. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Múltiplas correntes", "Detalhes quadrados", "Pedras claras"],
    tone: 4,
    image: imagePath("20261103_220543"),
  },
  {
    id: 5,
    slug: "colar-de-corrente-circular",
    name: "Colar de Corrente Circular",
    category: "colares",
    price: 89.9,
    summary: "Colar prateado de corrente com elos circulares entrelaçados.",
    description:
      "Colar de acabamento prateado com elos circulares entrelaçados ao longo da corrente. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Elos circulares", "Corrente entrelaçada", "Acabamento prateado"],
    tone: 5,
    image: imagePath("20261103_220336"),
  },
  {
    id: 6,
    slug: "pulseira-infantil-de-coracao",
    name: "Pulseira Infantil de Coração",
    category: "pulseiras",
    price: 69.9,
    summary: "Pulseira prateada delicada com coração no extensor e detalhes claros.",
    description:
      "Pulseira prateada com corrente delicada, detalhe de infinito, duas pedras claras e um pequeno coração na ponta do extensor. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Coração no extensor", "Detalhe de infinito", "Pedras claras"],
    tone: 1,
    image: imagePath("20261103_220918"),
  },
  {
    id: 7,
    slug: "colar-com-um-menino",
    name: "Colar com um Menino",
    category: "colares",
    price: 119.9,
    summary: "Colar prateado com pingente de menino, boné e roupa com pedras azuis.",
    description:
      "Pingente em formato de menino, com boné e roupa preenchida por pedras azuis, acompanhado de corrente de acabamento prateado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente de menino", "Pedras azuis", "Detalhe de boné"],
    tone: 2,
    image: imagePath("20261103_220315"),
  },
  {
    id: 8,
    slug: "pulseira-de-flor",
    name: "Pulseira de Flor",
    category: "pulseiras",
    price: 59.9,
    summary: "Pulseira prateada de corrente fina com detalhe central de flor de quatro pétalas.",
    description:
      "Corrente fina prateada com uma flor de quatro pétalas no centro e superfície trabalhada que reflete a luz. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Flor de quatro pétalas", "Corrente fina", "Acabamento prateado"],
    tone: 3,
    image: imagePath("20261103_220655"),
  },
  {
    id: 9,
    slug: "pulseira-com-pata-de-cachorro-gato",
    name: "Pulseira com Pata de Cachorro/Gato",
    category: "pulseiras",
    price: 69.9,
    summary: "Pulseira prateada com pequeno pingente de pata de cachorro ou gato.",
    description:
      "Pulseira de corrente fina prateada com detalhe central de pata de cachorro ou gato, com almofadas em relevo. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Detalhe de pata", "Almofadas em relevo", "Corrente delicada"],
    tone: 4,
    image: imagePath("20261103_220729"),
  },
  {
    id: 10,
    slug: "anel-de-coracao",
    name: "Anel de Coração",
    category: "aneis",
    price: 99.9,
    summary: "Anel prateado com uma sequência de corações em relevo.",
    description:
      "Anel de acabamento prateado com corações em relevo dispostos ao redor da faixa. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Corações em relevo", "Acabamento prateado", "Detalhes em sequência"],
    tone: 5,
    image: imagePath("20261103_211337"),
  },
  {
    id: 11,
    slug: "anel-dourado",
    name: "Anel Dourado",
    category: "aneis",
    price: 139.9,
    summary: "Anel dourado de faixa larga e abaulada com fileira de pedras claras.",
    description:
      "Anel dourado com faixa larga, superfície abaulada e uma fileira de pedras claras junto à borda. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Faixa larga abaulada", "Fileira de pedras claras", "Acabamento dourado"],
    tone: 1,
    image: imagePath("20261103_212044"),
  },
  {
    id: 12,
    slug: "anel-com-textura",
    name: "Anel com Textura",
    category: "aneis",
    price: 89.9,
    summary: "Anel dourado com faixas cruzadas, partes lisas e detalhes texturizados.",
    description:
      "Anel de acabamento dourado com faixas cruzadas que combinam superfícies lisas e texturizadas. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Faixas cruzadas", "Detalhes texturizados", "Acabamento dourado"],
    tone: 2,
    image: imagePath("20261103_213757"),
  },
  {
    id: 13,
    slug: "anel-com-estrela",
    name: "Anel com Estrela",
    category: "aneis",
    price: 69.9,
    summary: "Anel dourado com estrela vazada contornada por pedras claras.",
    description:
      "Anel dourado com uma estrela de centro vazado e contorno preenchido por pedras claras. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Estrela vazada", "Contorno com pedras claras", "Acabamento dourado"],
    tone: 3,
    image: imagePath("20261103_211615"),
  },
  {
    id: 14,
    slug: "anel-de-borboleta",
    name: "Anel de Borboleta",
    category: "aneis",
    price: 89.9,
    summary: "Anel dourado aberto com borboletas e detalhes de pedras claras.",
    description:
      "Anel dourado de desenho aberto com duas borboletas, uma com pedras claras, e uma faixa com pontos de brilho. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Detalhes de borboleta", "Pedras claras", "Desenho aberto"],
    tone: 4,
    image: imagePath("20261103_211515"),
  },
  {
    id: 15,
    slug: "anel-com-simbolo-de-infinito",
    name: "Anel com Símbolo de Infinito",
    category: "aneis",
    price: 109.9,
    summary: "Anel dourado com símbolo de infinito vazado, textura e pedras claras.",
    description:
      "Anel dourado com símbolo de infinito de desenho vazado, bordas texturizadas e pedras claras distribuídas pelo detalhe central. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Símbolo de infinito", "Desenho vazado e texturizado", "Pedras claras"],
    tone: 5,
    image: imagePath("20261103_212649"),
  },
  {
    id: 16,
    slug: "colar-de-coracao",
    name: "Colar de Coração",
    category: "colares",
    price: 89.9,
    summary: "Colar dourado de corrente fina com pingente vazado em formato de coração.",
    description:
      "Corrente fina dourada com pingente de coração de contorno vazado e acabamento polido. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente vazado de coração", "Corrente fina", "Acabamento dourado"],
    tone: 2,
    image: imagePath("20261108_143632"),
  },
  {
    id: 17,
    slug: "colar-de-pedra-quadrada",
    name: "Colar de Pedra Quadrada",
    category: "colares",
    price: 89.9,
    summary: "Colar dourado com pingente quadrado de pedra clara e contorno texturizado.",
    description:
      "Pingente quadrado com pedra clara central e moldura de pequenos pontos texturizados, em corrente dourada. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Pedra clara central", "Moldura texturizada", "Corrente dourada"],
    tone: 3,
    image: imagePath("20261108_144012"),
  },
  {
    id: 18,
    slug: "colar-de-pingente-de-menina",
    name: "Colar de Pingente de Menina",
    category: "colares",
    price: 79.9,
    summary: "Colar dourado com pingente de menina e detalhes em pedras rosadas.",
    description:
      "Pingente com a figura de uma menina, vestido preenchido por pedras rosadas e laço de acabamento dourado. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente de menina", "Pedras rosadas", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_144133"),
  },
  {
    id: 19,
    slug: "colar-com-pingente-quadrado",
    name: "Colar com Pingente Quadrado",
    category: "colares",
    price: 89.9,
    summary: "Colar dourado com pingente quadrado vazado e pedra central.",
    description:
      "Pingente quadrado de desenho vazado com pedra central clara, preso a uma corrente dourada delicada. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente quadrado", "Desenho vazado", "Pedra central clara"],
    tone: 5,
    image: imagePath("20261108_144451"),
  },
  {
    id: 20,
    slug: "colar-com-flor",
    name: "Colar com Flor",
    category: "colares",
    price: 109.9,
    summary: "Colar dourado com flor de pétalas claras e miolo de pedraria.",
    description:
      "Pingente em formato de flor com pétalas em resina clara e miolo de pedras, em corrente dourada. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Flor de pétalas claras", "Miolo de pedraria", "Corrente dourada"],
    tone: 1,
    image: imagePath("20261108_144612"),
  },
  {
    id: 21,
    slug: "colar-de-coracao-com-chave",
    name: "Colar de Desenho de Coração com Chave",
    category: "colares",
    price: 119.9,
    summary: "Colar dourado com coração de pedras rosas e desenho de chave vazado.",
    description:
      "Pingente em forma de coração preenchido por pedras rosas, com contorno dourado e desenho vazado de chave. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Coração com pedras rosas", "Desenho de chave", "Contorno dourado"],
    tone: 2,
    image: imagePath("20261108_144817"),
  },
  {
    id: 22,
    slug: "colar-com-pingente-de-coruja",
    name: "Colar com Pingente de Coruja",
    category: "colares",
    price: 79.9,
    summary: "Colar dourado com pingente de coruja de penas texturizadas.",
    description:
      "Pingente de coruja com olhos marcados, penas texturizadas e acabamento dourado, em corrente fina. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente de coruja", "Penas texturizadas", "Acabamento dourado"],
    tone: 3,
    image: imagePath("20261108_144844"),
  },
  {
    id: 23,
    slug: "colar-de-pingente-crucifixo",
    name: "Colar de Pingente Crucifixo",
    category: "colares",
    price: 99.9,
    summary: "Colar dourado com pingente de crucifixo e pedras claras.",
    description:
      "Pingente de crucifixo com braços trabalhados, pedras claras e acabamento dourado. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente de crucifixo", "Pedras claras", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_144954"),
  },
  {
    id: 24,
    slug: "pulseira-elos-dourados",
    name: "Pulseira",
    category: "pulseiras",
    price: 89.9,
    summary: "Pulseira dourada formada por elos elípticos.",
    description:
      "Pulseira de elos elípticos polidos com fecho de pressão e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Elos elípticos", "Fecho de pressão", "Acabamento dourado"],
    tone: 5,
    image: imagePath("20261108_145017"),
  },
  {
    id: 25,
    slug: "pulseira-pingente-de-menino-folheada-a-ouro",
    name: "Pulseira Pingente de Menino Folheado a Ouro",
    category: "pulseiras",
    price: 69.9,
    summary: "Pulseira de elos quadrados com pingente de menino folheado a ouro.",
    description:
      "Corrente de elos quadrados com pingente de menino e detalhes de iniciais, em folheado a ouro. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pingente de menino", "Elos quadrados", "Folheado a ouro"],
    tone: 1,
    image: imagePath("20261108_145118"),
  },
  {
    id: 26,
    slug: "pulseira-folheada-a-ouro-larga",
    name: "Pulseira Folheado a Ouro Larga",
    category: "pulseiras",
    price: 99.9,
    summary: "Pulseira larga de malha folheada a ouro.",
    description:
      "Pulseira de malha larga e flexível com fecho lagosta, em folheado a ouro. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Malha larga", "Fecho lagosta", "Folheado a ouro"],
    tone: 2,
    image: imagePath("20261108_145234"),
  },
  {
    id: 27,
    slug: "pulseira-crucifixo-e-amem",
    name: "Pulseira com Pingente de Crucifixo e Amém",
    category: "pulseiras",
    price: 69.9,
    summary: "Pulseira dourada com medalha redonda Amém e pingente de crucifixo.",
    description:
      "Pulseira dourada com medalha redonda trabalhada com a palavra Amém, contas e pingente de crucifixo. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Medalha Amém", "Pingente de crucifixo", "Acabamento dourado"],
    tone: 3,
    image: imagePath("20261108_145442"),
  },
  {
    id: 28,
    slug: "pulseira-com-perola-de-flor",
    name: "Pulseira com Pérola de Flor",
    category: "pulseiras",
    price: 79.9,
    summary: "Pulseira dourada com flores vazadas e pérolas claras.",
    description:
      "Corrente dourada fina com flores de contorno vazado e pérolas claras intercaladas, fecho lagosta e extensor. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Flores vazadas", "Pérolas claras", "Fecho lagosta"],
    tone: 4,
    image: imagePath("20261108_145512"),
  },
  {
    id: 29,
    slug: "brinco-pequeno-de-bolinha-prata",
    name: "Brinco Pequeno de Bolinha Prata",
    category: "brincos",
    price: 11.9,
    summary: "Par de brincos pequenos de bolinha prateada.",
    description:
      "Brincos pequenos em formato de bolinha com acabamento prateado e fecho de tarraxa. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de bolinha", "Acabamento prateado", "Fecho de tarraxa"],
    tone: 5,
    image: imagePath("20261108_145627"),
  },
  {
    id: 30,
    slug: "brinco-pequeno-de-arco-iris",
    name: "Brinco Pequeno de Arco-Íris",
    category: "brincos",
    price: 21.9,
    summary: "Par de brincos pequenos com arco-íris e nuvens douradas.",
    description:
      "Brincos pequenos com arco-íris e nuvens em relevo, acabamento dourado e fecho de tarraxa. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Arco-íris com nuvens", "Acabamento dourado", "Fecho de tarraxa"],
    tone: 1,
    image: imagePath("20261108_145658"),
  },
  {
    id: 31,
    slug: "brinco-pequeno-de-rosas",
    name: "Brinco Pequeno de Rosas",
    category: "brincos",
    price: 11.9,
    summary: "Par de brincos pequenos de rosa dourada em relevo.",
    description:
      "Brincos pequenos em formato de rosa com pétalas em relevo e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de rosa", "Pétalas em relevo", "Acabamento dourado"],
    tone: 2,
    image: imagePath("20261108_145725"),
  },
  {
    id: 32,
    slug: "brinco-pequeno-de-estrela-do-mar",
    name: "Brinco Pequeno de Estrela do Mar",
    category: "brincos",
    price: 21.9,
    summary: "Par de brincos pequenos de estrela do mar dourada.",
    description:
      "Brincos pequenos em formato de estrela do mar com superfície texturizada e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Estrela do mar", "Superfície texturizada", "Acabamento dourado"],
    tone: 3,
    image: imagePath("20261108_145801"),
  },
  {
    id: 33,
    slug: "brinco-pequeno-de-girafa",
    name: "Brinco Pequeno de Girafa",
    category: "brincos",
    price: 34.9,
    summary: "Par de brincos pequenos de girafa dourada com pedras claras.",
    description:
      "Brincos pequenos em formato de girafa, com manchas preenchidas por pedras claras e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de girafa", "Pedras claras", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_145936"),
  },
  {
    id: 34,
    slug: "brinco-pequeno-de-coracao",
    name: "Brinco Pequeno de Coração",
    category: "brincos",
    price: 11.9,
    summary: "Par de brincos pequenos de coração vazado prateado.",
    description:
      "Brincos pequenos com contorno de coração vazado e acabamento prateado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Coração vazado", "Acabamento prateado", "Fecho de tarraxa"],
    tone: 5,
    image: imagePath("20261108_150114"),
  },
  {
    id: 35,
    slug: "brinco-pequeno-de-cavalo",
    name: "Brinco Pequeno de Cavalo",
    category: "brincos",
    price: 21.9,
    summary: "Par de brincos pequenos de cavalo prateado com pedras.",
    description:
      "Brincos pequenos em formato de cavalo, com detalhes em pedras claras e acabamento prateado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de cavalo", "Pedras claras", "Acabamento prateado"],
    tone: 1,
    image: imagePath("20261108_150223"),
  },
  {
    id: 36,
    slug: "brinco-pequeno-de-cereja",
    name: "Brinco Pequeno de Cereja",
    category: "brincos",
    price: 34.9,
    summary: "Par de brincos pequenos de cereja dourada com pedras.",
    description:
      "Brincos pequenos em formato de cereja, com frutos preenchidos por pedras claras e folhas douradas. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de cereja", "Pedras claras", "Acabamento dourado"],
    tone: 2,
    image: imagePath("20261108_150259"),
  },
  {
    id: 37,
    slug: "brinco-pequeno-de-floco-de-neve",
    name: "Brinco Pequeno de Floco de Neve",
    category: "brincos",
    price: 21.9,
    summary: "Par de brincos pequenos de floco de neve prateado com pedras.",
    description:
      "Brincos pequenos em formato de floco de neve com pedras claras e acabamento prateado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Floco de neve", "Pedras claras", "Acabamento prateado"],
    tone: 3,
    image: imagePath("20261108_151359"),
  },
  {
    id: 38,
    slug: "brinco-pequeno-de-coracao-dourado",
    name: "Brinco Pequeno de Coração Dourado",
    category: "brincos",
    price: 26.9,
    summary: "Par de brincos pequenos de coração dourado com pedra central.",
    description:
      "Brincos pequenos em formato de coração com superfície texturizada, pedra central e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Coração texturizado", "Pedra central", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_151442"),
  },
  {
    id: 39,
    slug: "brinco-pequeno-de-pedra-dourado",
    name: "Brinco Pequeno de Pedra Dourado",
    category: "brincos",
    price: 39.9,
    summary: "Par de brincos pequenos com pedra facetada clara e base dourada.",
    description:
      "Brincos pequenos com pedra facetada clara em base dourada de garras. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pedra facetada clara", "Base de garras", "Acabamento dourado"],
    tone: 5,
    image: imagePath("20261108_151525"),
  },
  {
    id: 40,
    slug: "brinco-pequeno-de-carro",
    name: "Brinco Pequeno de Carro",
    category: "brincos",
    price: 39.9,
    summary: "Par de brincos pequenos de carro prateado com pedras.",
    description:
      "Brincos pequenos em formato de carro, com pedras claras e acabamento prateado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de carro", "Pedras claras", "Acabamento prateado"],
    tone: 1,
    image: imagePath("20261108_151559"),
  },
  {
    id: 41,
    slug: "brinco-pequeno-de-pedra-preta",
    name: "Brinco Pequeno de Pedra Preta",
    category: "brincos",
    price: 26.9,
    summary: "Par de brincos pequenos com pedra preta facetada e contorno dourado.",
    description:
      "Brincos pequenos com pedra preta facetada e contorno dourado de garras. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pedra preta facetada", "Contorno de garras", "Acabamento dourado"],
    tone: 2,
    image: imagePath("20261108_151702"),
  },
  {
    id: 42,
    slug: "brinco-pequeno-de-perola",
    name: "Brinco Pequeno de Pérola",
    category: "brincos",
    price: 17.9,
    summary: "Par de brincos pequenos com pérolas brancas.",
    description:
      "Brincos pequenos com pérola branca arredondada e fecho de tarraxa. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Pérola branca", "Formato arredondado", "Fecho de tarraxa"],
    tone: 3,
    image: imagePath("20261108_151749"),
  },
  {
    id: 43,
    slug: "brinco-pequeno-de-quadradinho-dourado",
    name: "Brinco Pequeno de Quadradinho Dourado",
    category: "brincos",
    price: 16.9,
    summary: "Par de brincos pequenos quadrados dourados com textura.",
    description:
      "Brincos pequenos em formato de quadrado com superfície texturizada e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato quadrado", "Superfície texturizada", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_151827"),
  },
  {
    id: 44,
    slug: "brinco-pequeno-de-coroa",
    name: "Brinco Pequeno de Coroa",
    category: "brincos",
    price: 17.9,
    summary: "Par de brincos pequenos em formato de coroa dourada.",
    description:
      "Brincos pequenos em formato de coroa com pontas marcadas e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato de coroa", "Pontas marcadas", "Acabamento dourado"],
    tone: 5,
    image: imagePath("20261108_151923"),
  },
  {
    id: 45,
    slug: "colar-de-flor-rosa",
    name: "Colar de Flor Rosa",
    category: "colares",
    price: 79.9,
    summary: "Colar de corrente prateada com pingente de flor rosa.",
    description:
      "Pingente de flor de quatro pétalas em resina rosa, com contorno cravejado de pedras, em corrente prateada. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Flor rosa de quatro pétalas", "Contorno com pedras", "Corrente prateada"],
    tone: 1,
    image: imagePath("20261108_152111"),
  },
  {
    id: 46,
    slug: "brinco-gota-prata",
    name: "Brinco Gota Prata",
    category: "brincos",
    price: 44.9,
    summary: "Par de brincos prateados em formato de gota alongada.",
    description:
      "Brincos em formato de gota alongada, com superfície polida e acabamento prateado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Gota alongada", "Superfície polida", "Acabamento prateado"],
    tone: 2,
    image: imagePath("20261108_152204"),
  },
  {
    id: 47,
    slug: "anel-regulador",
    name: "Anel Regulador",
    category: "aneis",
    price: 79.9,
    summary: "Anel dourado regulável com detalhe de pedraria.",
    description:
      "Anel de aro fino e regulável, com detalhe de pedraria em uma das pontas. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Aro regulável", "Detalhe de pedraria", "Acabamento dourado"],
    tone: 3,
    image: imagePath("20261108_152444"),
  },
  {
    id: 48,
    slug: "brinco-quadrado-pedras-coloridas",
    name: "Brinco Quadrado Pedras Coloridas",
    category: "brincos",
    price: 44.9,
    summary: "Par de brincos quadrados dourados com pedras coloridas.",
    description:
      "Brincos de formato quadrado vazado, com pedras coloridas no contorno e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Formato quadrado", "Pedras coloridas", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_152538"),
  },
  {
    id: 49,
    slug: "brinco-dourado-largo",
    name: "Brinco Dourado Largo",
    category: "brincos",
    price: 64.9,
    summary: "Par de brincos de argola larga dourada.",
    description:
      "Brincos de argola larga com superfície polida e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Argola larga", "Superfície polida", "Acabamento dourado"],
    tone: 5,
    image: imagePath("20261108_152630"),
  },
  {
    id: 50,
    slug: "colar-folheado-prata-pingente-3-meninos",
    name: "Colar Folheado Prata Pingente 3 Meninos",
    category: "colares",
    price: 149.9,
    summary: "Colar folheado a prata com três pingentes de menino.",
    description:
      "Colar de corrente folheada a prata com três pingentes de menino, um deles com contorno cravejado de pedras. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Três pingentes de menino", "Contorno com pedras", "Folheado a prata"],
    tone: 1,
    image: imagePath("20261108_152727"),
  },
  {
    id: 51,
    slug: "brinco-pequeno-largo-dourado",
    name: "Brinco Pequeno Largo Dourado",
    category: "brincos",
    price: 44.9,
    summary: "Par de brincos pequenos de argola larga dourada.",
    description:
      "Brincos pequenos de argola larga com superfície polida e acabamento dourado. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Argola larga", "Tamanho pequeno", "Acabamento dourado"],
    tone: 2,
    image: imagePath("20261108_153005"),
  },
  {
    id: 52,
    slug: "brinco-folheado-prata-triangulo",
    name: "Brinco Folheado Prata Triângulo",
    category: "brincos",
    price: 44.9,
    summary: "Par de brincos de triângulo vazado folheado a prata.",
    description:
      "Brincos de formato triangular vazado, com contorno cravejado de pedras e acabamento folheado a prata. Consulte medidas, composição e disponibilidade com a Eliane.",
    highlights: ["Triângulo vazado", "Contorno com pedras", "Folheado a prata"],
    tone: 3,
    image: imagePath("20261108_153025"),
  },
  {
    id: 53,
    slug: "colar-pingente-2-meninas",
    name: "Colar Pingente 2 Meninas",
    category: "colares",
    price: 139.9,
    summary: "Colar dourado com dois pingentes de menina e pedras.",
    description:
      "Colar dourado com dois pingentes de menina, com vestidos cravejados de pedras e coração de acabamento. Consulte comprimento, composição e disponibilidade com a Eliane.",
    highlights: ["Dois pingentes de menina", "Pedras no vestido", "Acabamento dourado"],
    tone: 4,
    image: imagePath("20261108_153133"),
  },
];
