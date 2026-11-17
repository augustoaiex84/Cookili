# Cookili 🍪

A nova página da **Cookili**, cookies artesanais.

Site simples (HTML, CSS e JavaScript puros): não precisa instalar nada, não tem banco de dados nem mensalidade. Funciona em computador, tablet e celular.

---

## ✏️ Como editar o site (sem programador)

Quase tudo fica em **um arquivo só: `conteudo.js`**. Ali estão os textos, sabores, preços, telefone, endereço, horário e redes sociais.

### Pelo próprio GitHub (navegador ou celular)
1. Abra o repositório no GitHub e clique no arquivo **`conteudo.js`**.
2. Clique no ícone de **lápis ✏️** (Edit this file).
3. Altere só o texto **entre aspas**. Exemplo: `preco: "12,00"` → `preco: "13,50"`.
4. Clique em **Commit changes** e confirme.
5. Espere 1 ou 2 minutos e recarregue o site.

### Regras para não quebrar nada
- Mude só o que está **entre aspas "..."**.
- Não apague vírgulas `,`, chaves `{ }` ou colchetes `[ ]`.
- Precisa de aspas dentro de um texto? Use aspas simples: `'assim'`.
- Preço é só o número com vírgula: `"15,00"` (sem "R$").
- Negrito no texto "Nossa História": `**palavra**`.

> Se depois de salvar o cardápio sumiu, provavelmente faltou uma vírgula ou aspa. No GitHub, abra a aba **History** do arquivo e volte para a versão anterior.

### Tarefas comuns

| Quero... | Onde, em `conteudo.js` |
|---|---|
| Mudar preço ou descrição | Bloco do sabor em `cardapio > produtos` |
| Adicionar um sabor | Copie um bloco `{ ... }` inteiro, cole depois do último (com vírgula entre eles) e troque os dados |
| Tirar um sabor por um tempo | Mude `disponivel: true` para `disponivel: false` |
| Mudar telefone/WhatsApp | `contato > telefone` e `contato > whatsapp` (WhatsApp: 55 + DDD + número, só números) |
| Mudar endereço/horário | `contato > endereco` e `contato > horario` |
| Mostrar Facebook ou TikTok | Cole o link em `redes > facebook` / `redes > tiktok` (vazio = ícone escondido) |

### Trocar ou adicionar fotos
1. Abra a pasta **`imagens`** no GitHub, clique em **Add file > Upload files** e envie a foto.
   - De preferência **quadrada** (600×600 px ou mais), em `.jpg`, com menos de 300 KB.
   - Nome sem espaços nem acentos, ex.: `cookie-de-nutella.jpg`.
2. Em `conteudo.js`, aponte o sabor para ela: `imagem: "imagens/cookie-de-nutella.jpg"`.

---

## 🛒 Como funciona o pedido
O cliente adiciona cookies ao carrinho e clica em **Enviar pedido pelo WhatsApp**. Abre uma conversa com o número configurado e a mensagem já preenchida (itens, quantidades e total). Não há pagamento online.

## 🚀 Publicar no ar (GitHub Pages, grátis)
1. No repositório: **Settings > Pages**.
2. Em *Source*, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e salve.
3. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/cookili/`.
4. (Opcional) Domínio próprio, ex. `cookili.com.br`: no mesmo lugar, em *Custom domain*.

Para ver no computador sem publicar, basta abrir o `index.html` no navegador.

## 🎨 Cores e fontes
Ficam no começo de `estilo.css` (bloco `:root`). Trocou ali, muda no site inteiro.

## 📁 Estrutura
```
index.html    estrutura da página
conteudo.js   ← TEXTOS, PREÇOS E CONTATOS (edite aqui)
estilo.css    visual e cores
script.js     funcionamento (cardápio, carrinho, menu)
imagens/      fotos e ícone
```
