/** Condições comerciais confirmadas pela loja; não representam pagamento on-line. */
export const storeTerms = {
  payment: "Pagamento via Pix, cartões de débito e crédito.",
  installments: "*Parcelamento no cartão de crédito sob consulta da taxa da maquininha.",
  jewelryWarranty: "Garantia das peças de semijoias de 6 meses.",
} as const;

/** Respostas públicas compartilhadas pela página e pelos dados estruturados. */
export const storeFaq = [
  {
    q: "Como faço meu pedido?",
    a: "Abra uma peça e toque no botão do WhatsApp. Se quiser várias, salve-as no coração e envie sua seleção. A mensagem identifica cada escolha. A Eliane confirma tudo antes de você pagar.",
  },
  {
    q: "Onde a Nany atende?",
    a: "A Nany atende em Guarapuava — PR e região. Converse com a Eliane pelo WhatsApp para combinar as opções de entrega ou retirada para o seu pedido.",
  },
  {
    q: "Quais semijoias posso encontrar na Nany?",
    a: "A vitrine reúne colares, pulseiras, brincos e anéis com fotos reais. A página de lingerie mostra calcinhas, sutiãs, cuecas, conjuntos, kits, pijamas, leggings e blusas, com o código de cada peça. Abra a peça para ver os detalhes e confirme a disponibilidade com a Eliane.",
  },
  {
    q: "Por que algumas peças estão com preço sob consulta?",
    a: "Os preços são informados pela loja. Quando uma peça estiver sob consulta, confirme o valor com a Eliane antes de pedir. Atualmente, todas as peças publicadas, de semijoias e de lingerie, têm preço informado.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: `${storeTerms.payment} ${storeTerms.installments} Combine o pagamento diretamente com a Eliane pelo WhatsApp antes de concluir a compra.`,
  },
  {
    q: "As semijoias têm garantia?",
    a: `${storeTerms.jewelryWarranty} Para tirar dúvidas sobre a garantia da sua peça, converse com a Eliane pelo WhatsApp.`,
  },
  {
    q: "Como funciona a entrega?",
    a: "Combine diretamente com a Eliane as opções de entrega ou retirada para a sua região. Prazos, custos e disponibilidade são confirmados para cada pedido.",
  },
  {
    q: "Salvar uma peça já faz uma reserva?",
    a: "Não. O coração serve para organizar suas escolhas neste navegador. Sua seleção não é um pedido concluído nem uma reserva. A disponibilidade pode mudar e precisa ser confirmada com a Eliane.",
  },
  {
    q: "Quais tamanhos de lingerie estão disponíveis?",
    a: "Cada peça de lingerie mostra, na página e ao abrir a foto, os tamanhos confirmados pela loja — P, M, G, GG, 48 ou 12, conforme o modelo. Algumas peças têm tamanho único, como o Sutiã Reforçado (48, equivalente ao GG). O Kit Cueca e a Legging Montaria não têm grade de tamanho: a Eliane confirma no atendimento. A disponibilidade de cada tamanho é sempre confirmada antes do pedido.",
  },
  {
    q: "Posso saber o tamanho, material, cuidados e condições de troca?",
    a: "Sim. Envie a peça pelo WhatsApp e pergunte sobre medidas, composição, conservação e trocas. Esses detalhes podem variar de um produto para outro, então confirme as condições da sua escolha antes de comprar.",
  },
  {
    q: "Onde encontro as lingeries?",
    a: "As lingeries estão reunidas na página de Lingerie, com fotos reais, código, preço e os tamanhos disponíveis de cada peça. Para escolher, abra a peça, toque no tamanho desejado e envie a mensagem para a Eliane pelo WhatsApp.",
  },
] as const;
