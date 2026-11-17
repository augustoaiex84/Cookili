/* =====================================================================
   CONTEÚDO DO SITE COOKILI
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para mudar textos,
   preços, sabores, telefone, endereço e redes sociais.

   REGRAS SIMPLES (para não quebrar o site):
   1. Altere apenas o que está ENTRE ASPAS "assim".
   2. Não apague vírgulas, chaves { } ou colchetes [ ].
   3. Para usar aspas dentro de um texto, use aspas simples: 'assim'.
   4. Preços: escreva só o número com vírgula, ex.: "12,00".
   5. Depois de salvar, aguarde 1 ou 2 minutos e recarregue o site.

   Passo a passo completo no arquivo README.md.
   ===================================================================== */

window.COOKILI = {

  /* ---------- MARCA ---------- */
  nome: "Cookili",

  /* ---------- CONTATO E PEDIDOS ---------- */
  contato: {
    // Telefone exibido no site
    telefone: "(11) 99644-3658",

    // WhatsApp que recebe os pedidos: 55 + DDD + número, só números
    whatsapp: "5511996443658",

    endereco: "Rua dos Cookies, 123 - SP",
    horario: "Aberto das 8h às 20h",

    // Link do Google Maps (opcional). Deixe "" para gerar automaticamente
    // a partir do endereço acima.
    mapa: ""
  },

  /* ---------- REDES SOCIAIS ----------
     Deixe "" (vazio) para esconder o ícone. */
  redes: {
    instagram: "https://www.instagram.com/cookili.cookies",
    facebook: "",
    tiktok: ""
  },

  /* ---------- TOPO DA PÁGINA ---------- */
  destaque: {
    selo: "🍪 Cookies fresquinhos todos dias",
    tituloLinha1: "Felicidade",
    tituloLinha2: "Artesanal",
    texto: "Cookies artesanais feitos com amor, ingredientes premium e um toque de magia. Experimente a perfeição quentinha e macia em cada mordida.",
    imagem: "imagens/hero.jpg",
    numeros: [
      { valor: "50K+", legenda: "Clientes Felizes" },
      { valor: "12+",  legenda: "Sabores Únicos" },
      { valor: "4.9",  legenda: "Avaliação" }
    ]
  },

  /* ---------- CARDÁPIO ----------
     Para ADICIONAR um sabor: copie um bloco { ... }, cole abaixo do
     último (com vírgula entre eles) e troque os dados.
     Para REMOVER: apague o bloco inteiro { ... } e a vírgula.
     Para ESCONDER temporariamente: mude disponivel para false.
     Imagens: envie a foto para a pasta "imagens" (quadrada, ~600x600). */
  cardapio: {
    etiqueta: "Nosso Cardápio",
    titulo: "Favoritos do Público",
    texto: "Descubra nossos cookies mais amados, feitos fresquinhos toda manhã com os melhores ingredientes.",
    produtos: [
      {
        nome: "Gotas de Chocolate",
        preco: "12,00",
        descricao: "O clássico irresistível: massa amanteigada e muitas gotas de chocolate meio amargo.",
        imagem: "imagens/gotas-de-chocolate.jpg",
        disponivel: true
      },
      {
        nome: "Aveia com Passas",
        preco: "10,00",
        descricao: "Aconchegante e macio, com aveia em flocos, uvas-passas e um toque de canela.",
        imagem: "imagens/aveia-com-passas.jpg",
        disponivel: true
      },
      {
        nome: "Brownie de Chocolate",
        preco: "12,00",
        descricao: "Intenso e úmido por dentro, com casquinha craquelada de puro chocolate.",
        imagem: "imagens/brownie-de-chocolate.jpg",
        disponivel: true
      },
      {
        nome: "Cookie de M&M's",
        preco: "13,00",
        descricao: "Colorido e divertido, com M&M's crocantes em uma massa macia de baunilha.",
        imagem: "imagens/mms.jpg",
        disponivel: true
      },
      {
        nome: "Cookie de Pistache",
        preco: "15,00",
        descricao: "Sofisticado e único, com pistaches torrados e um toque de flor de sal.",
        imagem: "imagens/pistache.jpg",
        disponivel: true
      },
      {
        nome: "Cookie de Chocolate Branco",
        preco: "12,00",
        descricao: "Doce e cremoso, repleto de pedaços generosos de chocolate branco belga.",
        imagem: "imagens/chocolate-branco.jpg",
        disponivel: true
      }
    ]
  },

  /* ---------- NOSSA HISTÓRIA ----------
     Use **palavra** para deixar em negrito. */
  sobre: {
    titulo: "Nossa História",
    subtitulo: "Conheça a paixão por trás de cada cookie que fazemos",
    paragrafos: [
      "A Cookili nasceu de um sonho simples: criar os melhores cookies artesanais da cidade. Tudo começou na cozinha de casa, com receitas de família passadas de geração em geração.",
      "Hoje, mantemos a mesma dedicação e amor em cada cookie que preparamos. Usamos apenas ingredientes premium, chocolate belga importado e uma pitada especial de carinho que faz toda a diferença.",
      "Nossa missão é simples: fazer você sorrir com cada mordida. Seja para um momento especial ou para alegrar o dia a dia, nossos cookies são feitos para criar memórias doces."
    ],
    // icone pode ser: "coracao", "medalha", "pessoas", "estrela", "folha"
    diferenciais: [
      { icone: "coracao", titulo: "Feitos com Amor", texto: "Cada cookie é preparado à mão com dedicação e carinho, como se fosse para nossa própria família." },
      { icone: "medalha", titulo: "Ingredientes Premium", texto: "Selecionamos os melhores ingredientes do mercado para garantir sabor e qualidade incomparáveis." },
      { icone: "pessoas", titulo: "Comunidade Feliz", texto: "Mais de 50 mil clientes satisfeitos que confiam em nós para adoçar seus momentos especiais." }
    ]
  },

  /* ---------- PRÓXIMAS FEIRAS ----------
     Cada feira é um bloco { ... }. Para ADICIONAR: copie um bloco,
     cole abaixo do último (com vírgula entre eles) e troque os dados.

     - data: dia da feira no formato DD/MM/AAAA, ex.: "05/12/2026"
     - dataFim: último dia, se durar mais de um dia (senão deixe "")
     - endereco: usado no botão "Como chegar" (Google Maps)
     - link: página/Instagram da feira (opcional, deixe "" se não houver)
     - mostrar: true para aparecer no site, false para esconder

     Feiras que já passaram somem do site sozinhas, e a lista é
     ordenada por data automaticamente. Se não houver nenhuma feira
     futura, aparece o texto de "semFeiras". */
  feiras: {
    etiqueta: "Agenda",
    titulo: "Próximas Feiras",
    texto: "Venha provar nossos cookies pessoalmente! Confira onde vamos estar nas próximas semanas.",
    semFeiras: "Novas datas em breve! Acompanhe nosso Instagram para não perder nenhuma feira.",
    lista: [
      {
        nome: "Feira Medieval",
        data: "05/12/2026",
        dataFim: "06/12/2026",
        horario: "10h às 18h",
        local: "Praça Ayrton Senna",
        endereco: "Rua Curitiba, 290 - Paraíso - São Paulo, SP",
        link: "",
        mostrar: true
      },
      {
        nome: "Outra Feira (modelo)",
        data: "13/12/2026",
        dataFim: "",
        horario: "9h às 15h",
        local: "Praça Exemplo",
        endereco: "Praça Exemplo - São Paulo, SP",
        link: "",
        mostrar: false
      }
    ]
  },

  /* ---------- CHAMADA FINAL ---------- */
  chamada: {
    titulo: "Bateu aquela vontade?",
    texto: "Visite-nos hoje ou peça online para retirada. Cookies fresquinhos estão a poucas mordidas de distância.",
    botao: "Pedir para Retirada"
  },

  /* ---------- MENSAGEM DO WHATSAPP ----------
     Texto inicial quando o cliente clica em "Peça Agora". */
  mensagemWhatsapp: "Olá, Cookili! Gostaria de fazer um pedido 🍪"
};
