/* =====================================================================
   FUNCIONAMENTO DO SITE COOKILI
   Você NÃO precisa editar este arquivo. Textos e preços ficam em
   conteudo.js.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.COOKILI;
  if (!C) {
    console.error("conteudo.js não carregou. Verifique se não há vírgula ou aspas faltando.");
    return;
  }

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }

  function icone(nome) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#i-" + nome);
    svg.appendChild(use);
    return svg;
  }

  function escapar(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // "**texto**" vira negrito, sem permitir HTML vindo do conteúdo
  function comNegrito(t) {
    return escapar(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function valor(caminho) {
    return caminho.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }

  function paraNumero(preco) {
    var n = parseFloat(String(preco).replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  }

  function moeda(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function linkWhatsapp(mensagem) {
    var numero = String(C.contato.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
  }

  /* ---------- Textos simples ---------- */
  $$("[data-campo]").forEach(function (e) {
    var v = valor(e.getAttribute("data-campo"));
    if (v != null && v !== "") e.textContent = v;
  });
  document.title = C.nome + " | Cookies Artesanais";
  $("#ano").textContent = new Date().getFullYear();

  /* ---------- Hero ---------- */
  if (C.destaque.imagem) $("#heroImagem").src = C.destaque.imagem;
  var numeros = $("#numeros");
  (C.destaque.numeros || []).forEach(function (n) {
    var li = el("li");
    li.appendChild(el("strong", null, n.valor));
    li.appendChild(el("span", null, n.legenda));
    numeros.appendChild(li);
  });

  /* ---------- Contato ---------- */
  $$("[data-whatsapp]").forEach(function (a) { a.href = linkWhatsapp(C.mensagemWhatsapp); });
  $("#linkTelefone").href = "tel:+" + String(C.contato.whatsapp).replace(/\D/g, "");
  $("#linkMapa").href = C.contato.mapa ||
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.contato.endereco);

  /* ---------- Redes sociais ---------- */
  var nomesRedes = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };
  var redes = $("#redes");
  Object.keys(C.redes || {}).forEach(function (rede) {
    var url = C.redes[rede];
    if (!url || !nomesRedes[rede]) return;
    var li = el("li");
    var a = el("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", nomesRedes[rede] + " da " + C.nome);
    a.appendChild(icone(rede));
    li.appendChild(a);
    redes.appendChild(li);
  });

  /* ---------- Cardápio ---------- */
  var produtos = (C.cardapio.produtos || []).filter(function (p) { return p.disponivel !== false; });
  var lista = $("#produtos");
  produtos.forEach(function (p, i) {
    var li = el("li", "produto revelar");
    var foto = el("div", "produto__imagem");
    var img = el("img");
    img.src = p.imagem;
    img.alt = "Cookie " + p.nome;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 500;
    img.height = 500;
    foto.appendChild(img);

    var cabeca = el("div", "produto__cabeca");
    cabeca.appendChild(el("h3", "produto__nome", p.nome));
    cabeca.appendChild(el("span", "produto__preco", moeda(paraNumero(p.preco))));

    var botao = el("button", "produto__botao");
    botao.type = "button";
    botao.appendChild(icone("mais"));
    botao.appendChild(el("span", null, "Adicionar ao Carrinho"));
    botao.addEventListener("click", function () {
      adicionar(p.nome);
      botao.classList.add("adicionado");
      botao.lastChild.textContent = "Adicionado!";
      setTimeout(function () {
        botao.classList.remove("adicionado");
        botao.lastChild.textContent = "Adicionar ao Carrinho";
      }, 1200);
    });

    li.appendChild(foto);
    li.appendChild(cabeca);
    li.appendChild(el("p", "produto__descricao", p.descricao));
    li.appendChild(botao);
    li.style.transitionDelay = (i % 3) * 80 + "ms";
    lista.appendChild(li);
  });

  /* ---------- Sobre ---------- */
  var sobreTexto = $("#sobreTexto");
  (C.sobre.paragrafos || []).forEach(function (t) {
    var p = el("p");
    p.innerHTML = comNegrito(t);
    sobreTexto.appendChild(p);
  });
  var diferenciais = $("#diferenciais");
  var mapaIcones = { coracao: 1, medalha: 1, pessoas: 1, estrela: 1, folha: 1 };
  (C.sobre.diferenciais || []).forEach(function (d) {
    var li = el("li", "diferencial revelar");
    var ic = el("div", "diferencial__icone");
    ic.appendChild(icone(mapaIcones[d.icone] ? d.icone : "estrela"));
    var corpo = el("div");
    corpo.appendChild(el("h3", null, d.titulo));
    corpo.appendChild(el("p", null, d.texto));
    li.appendChild(ic);
    li.appendChild(corpo);
    diferenciais.appendChild(li);
  });

  /* ---------- Próximas feiras ---------- */
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  // "05/12/2026" -> Date (ou null se estiver em outro formato)
  function lerData(t) {
    var m = String(t || "").trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return null;
    var d = new Date(+m[3], +m[2] - 1, +m[1]);
    return d.getMonth() === +m[2] - 1 ? d : null;
  }

  var feirasCfg = C.feiras || {};
  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  var feiras = (feirasCfg.lista || [])
    .filter(function (f) { return f.mostrar !== false; })
    .map(function (f) {
      var inicio = lerData(f.data);
      var fim = lerData(f.dataFim) || inicio;
      if (!inicio) console.warn("Feira '" + f.nome + "' com data inválida (use DD/MM/AAAA):", f.data);
      return { f: f, inicio: inicio, fim: fim && fim >= inicio ? fim : inicio };
    })
    .filter(function (x) { return x.inicio && x.fim >= hoje; })
    .sort(function (a, b) { return a.inicio - b.inicio; });

  var listaFeiras = $("#listaFeiras");
  feiras.forEach(function (x) {
    var f = x.f;
    var mesmoDia = x.fim.getTime() === x.inicio.getTime();
    var li = el("li", "feira revelar");

    var data = el("div", "feira__data");
    data.setAttribute("aria-hidden", "true");
    data.appendChild(el("strong", null, mesmoDia ? x.inicio.getDate() : x.inicio.getDate() + "–" + x.fim.getDate()));
    data.appendChild(el("span", null, MESES[x.inicio.getMonth()] +
      (x.fim.getMonth() !== x.inicio.getMonth() ? "/" + MESES[x.fim.getMonth()] : "")));

    var info = el("div", "feira__info");
    var quando = mesmoDia
      ? DIAS[x.inicio.getDay()] + ", " + x.inicio.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })
      : (x.fim.getMonth() === x.inicio.getMonth()
          ? x.inicio.getDate()
          : x.inicio.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })) + " a " +
        x.fim.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
    info.appendChild(el("p", "feira__quando", quando + (f.horario ? " · " + f.horario : "")));
    info.appendChild(el("h3", "feira__nome", f.nome));
    if (f.local || f.endereco) {
      var onde = el("p", "feira__local");
      onde.appendChild(icone("local"));
      onde.appendChild(el("span", null, [f.local, f.endereco].filter(Boolean).join(" · ")));
      info.appendChild(onde);
    }

    var acoes = el("div", "feira__acoes");
    if (f.endereco || f.local) {
      var mapa = el("a", "feira__link", "Como chegar");
      mapa.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(f.endereco || f.local);
      mapa.target = "_blank";
      mapa.rel = "noopener";
      mapa.appendChild(icone("seta"));
      acoes.appendChild(mapa);
    }
    if (f.link) {
      var mais = el("a", "feira__link", "Saiba mais");
      mais.href = f.link;
      mais.target = "_blank";
      mais.rel = "noopener";
      mais.appendChild(icone("seta"));
      acoes.appendChild(mais);
    }
    if (acoes.childNodes.length) info.appendChild(acoes);

    li.appendChild(data);
    li.appendChild(info);
    listaFeiras.appendChild(li);
  });

  if (!feiras.length) {
    listaFeiras.hidden = true;
    $("#feirasVazio").hidden = false;
    if (C.redes && C.redes.instagram) {
      $("#feirasInstagram").href = C.redes.instagram;
      $("#feirasInstagram").hidden = false;
    }
  }

  /* ---------- Menu mobile ---------- */
  var menu = $("#menu");
  var menuBotao = $("#menuBotao");
  function fecharMenu() {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    menuBotao.setAttribute("aria-label", "Abrir menu");
  }
  menuBotao.addEventListener("click", function () {
    var abrir = !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", abrir);
    menuBotao.setAttribute("aria-expanded", String(abrir));
    menuBotao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  });
  $$("#menu a").forEach(function (a) { a.addEventListener("click", fecharMenu); });

  /* ---------- Topo com sombra ao rolar ---------- */
  var topo = $("#topo");
  function aoRolar() { topo.classList.toggle("rolou", window.scrollY > 8); }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  /* ---------- Animação de entrada ---------- */
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$(".revelar").forEach(function (e) { obs.observe(e); });
  } else {
    $$(".revelar").forEach(function (e) { e.classList.add("visivel"); });
  }

  /* =====================================================================
     CARRINHO (pedido enviado pelo WhatsApp)
     ===================================================================== */
  var CHAVE = "cookili-carrinho";
  var porNome = {};
  produtos.forEach(function (p) { porNome[p.nome] = p; });

  var itens = {};
  try {
    var salvo = JSON.parse(localStorage.getItem(CHAVE) || "{}");
    Object.keys(salvo).forEach(function (n) { if (porNome[n] && salvo[n] > 0) itens[n] = salvo[n]; });
  } catch (e) { /* armazenamento indisponível: carrinho só nesta visita */ }

  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch (e) { /* ignora */ }
  }

  var painel = $("#carrinho");
  var listaCarrinho = $("#carrinhoItens");
  var ultimoFoco = null;

  function total() {
    return Object.keys(itens).reduce(function (s, n) { return s + paraNumero(porNome[n].preco) * itens[n]; }, 0);
  }
  function quantidade() {
    return Object.keys(itens).reduce(function (s, n) { return s + itens[n]; }, 0);
  }

  function mensagemPedido() {
    var linhas = ["Olá, " + C.nome + "! Gostaria de fazer este pedido para retirada:", ""];
    Object.keys(itens).forEach(function (n) {
      linhas.push("• " + itens[n] + "x " + n + " (" + moeda(paraNumero(porNome[n].preco) * itens[n]) + ")");
    });
    linhas.push("", "Total: " + moeda(total()));
    return linhas.join("\n");
  }

  function desenhar() {
    var qtd = quantidade();
    var contador = $("#qtdCarrinho");
    contador.textContent = qtd;
    contador.hidden = qtd === 0;
    $("#abrirCarrinho").setAttribute("aria-label", "Abrir carrinho (" + qtd + " itens)");

    listaCarrinho.innerHTML = "";
    Object.keys(itens).forEach(function (n) {
      var p = porNome[n];
      var li = el("li", "carrinho__item");
      var img = el("img");
      img.src = p.imagem;
      img.alt = "";
      var info = el("div");
      info.appendChild(el("h3", null, p.nome));
      info.appendChild(el("small", null, moeda(paraNumero(p.preco))));
      var q = el("div", "quantidade");
      var menos = el("button", null, "−");
      menos.type = "button";
      menos.setAttribute("aria-label", "Remover um " + p.nome);
      menos.addEventListener("click", function () { alterar(n, -1); });
      var mais = el("button", null, "+");
      mais.type = "button";
      mais.setAttribute("aria-label", "Adicionar um " + p.nome);
      mais.addEventListener("click", function () { alterar(n, 1); });
      q.appendChild(menos);
      q.appendChild(el("span", null, itens[n]));
      q.appendChild(mais);
      li.appendChild(img);
      li.appendChild(info);
      li.appendChild(q);
      listaCarrinho.appendChild(li);
    });

    var vazio = qtd === 0;
    $("#carrinhoVazio").hidden = !vazio;
    $("#carrinhoRodape").hidden = vazio;
    $("#carrinhoTotal").textContent = moeda(total());
    $("#enviarPedido").href = linkWhatsapp(mensagemPedido());
  }

  function alterar(nome, delta) {
    itens[nome] = (itens[nome] || 0) + delta;
    if (itens[nome] <= 0) delete itens[nome];
    salvar();
    desenhar();
  }

  var avisoTimer;
  function avisar(texto) {
    var aviso = $("#aviso");
    aviso.textContent = texto;
    aviso.classList.toggle("aviso--topo", !painel.hidden);
    aviso.classList.add("visivel");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () { aviso.classList.remove("visivel"); }, 2200);
  }

  function adicionar(nome) {
    alterar(nome, 1);
    if (painel.hidden) avisar(nome + " adicionado ao carrinho 🍪");
    var b = $("#abrirCarrinho");
    b.classList.remove("pulou");
    void b.offsetWidth;
    b.classList.add("pulou");
  }

  function abrirCarrinho() {
    ultimoFoco = document.activeElement;
    painel.hidden = false;
    document.body.style.overflow = "hidden";
    fecharMenu();
    painel.querySelector(".carrinho__fechar").focus();
  }
  function fecharCarrinho() {
    painel.hidden = true;
    document.body.style.overflow = "";
    if (ultimoFoco) ultimoFoco.focus();
  }

  $("#abrirCarrinho").addEventListener("click", abrirCarrinho);
  $$("[data-fechar]").forEach(function (e) { e.addEventListener("click", fecharCarrinho); });
  $("#limparCarrinho").addEventListener("click", function () { itens = {}; salvar(); desenhar(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!painel.hidden) fecharCarrinho();
      else fecharMenu();
    }
  });

  desenhar();
})();
