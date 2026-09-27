// Sprint 1 – Pessoa 2: leia o ID e mostre os detalhes.
// Sprint 2 – Pessoa 1: conecte o botão de adicionar.

// 1. Ler os parâmetros da URL
const buscaDaUrl = window.location.search;
const parametros = new URLSearchParams(buscaDaUrl);
const idDoLivro = parametros.get("id");

// 2. Localizar o livro correspondente
const livroSelecionado = dados.livros.find(function (livro) {
  return livro.id === idDoLivro;
});

// 3. Selecionar o container
const areaDetalhes = document.querySelector(".book-detail");

// 4. Renderizar a página de detalhes
if (!livroSelecionado) {
  if (areaDetalhes) {
    areaDetalhes.innerHTML = `
      <h1>Livro não encontrado.</h1>
      <a href="./index.html#catalogo">Voltar ao catálogo</a>
    `;
  }
} else {
  if (areaDetalhes) {
    areaDetalhes.innerHTML = `
      <div class="book-detail__cover book-cover book-cover--${livroSelecionado.cor}">
        <h1>${livroSelecionado.titulo}</h1>
        <small>${livroSelecionado.autor}</small>
        <b>p.42</b>
      </div>
      <div class="book-detail__content">
        <h2>${livroSelecionado.titulo}</h2>
        <p class="book-detail__author">por ${livroSelecionado.autor}</p>
        <strong class="book-detail__price">${formatarPreco(livroSelecionado.preco)}</strong>
        <p class="book-detail__description">${livroSelecionado.descricao}</p>
        <div class="book-detail__buy">
          <button class="book-detail__add" type="button">Adicionar ao carrinho</button>
        </div>
      </div>
    `;

    // Conectar o botão de adicionar (Sprint 2 - Pessoa 1)
    const botaoAdicionar = document.querySelector(".book-detail__add");
    if (botaoAdicionar) {
      botaoAdicionar.addEventListener("click", function () {
        // Verifica se o item já está no carrinho
        const itemExistente = carrinho.find(function (item) {
          return item.id === livroSelecionado.id;
        });

        if (itemExistente) {
          itemExistente.quantidade += 1;
        } else {
          carrinho.push({
            id: livroSelecionado.id,
            quantidade: 1,
          });
        }

        // Salva as alterações no localStorage (função definida em apoio.js)
        salvarCarrinho();

        // Abre a gaveta do carrinho (função definida em cart.js)
        if (typeof abrirCarrinho === "function") {
          abrirCarrinho();
        }
      });
    }
  }
}