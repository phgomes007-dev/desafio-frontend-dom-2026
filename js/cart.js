// Sprint 2 – Pessoa 2: renderize, abra e feche o carrinho.
// Sprint 3 – Pessoa 1: conecte a remoção de cada item.

const elementoCarrinho = document.querySelector(".cart");
const backdropCarrinho = document.querySelector(".cart-backdrop");
const botaoAbrirCarrinho = document.querySelector(".cart-trigger");
const botaoFecharCarrinho = document.querySelector(".cart__close");
const listaProdutosCarrinho = document.querySelector(".cart__products");
const elementoTotal = document.querySelector(".total");

function abrirCarrinho() {
  if (elementoCarrinho && backdropCarrinho) {
    elementoCarrinho.classList.add("cart--active");
    backdropCarrinho.classList.add("cart-backdrop--active");
    renderizarCarrinho();
  }
}

function fecharCarrinho() {
  if (elementoCarrinho && backdropCarrinho) {
    elementoCarrinho.classList.remove("cart--active");
    backdropCarrinho.classList.remove("cart-backdrop--active");
  }
}

function renderizarCarrinho() {
  if (!listaProdutosCarrinho || !elementoTotal) return;

  listaProdutosCarrinho.innerHTML = "";
  let totalGeral = 0;

  for (const item of carrinho) {
    const livro = dados.livros.find(function (l) {
      return l.id === item.id;
    });

    if (livro) {
      const subtotal = livro.preco * item.quantidade;
      totalGeral += subtotal;

      const divItem = document.createElement("div");
      divItem.classList.add("cart__product");

      // Modelo fiel ao modelos.md
      divItem.innerHTML = `
        <div class="cart-mini-cover book-cover--${livro.cor}"><b>p.42</b></div>
        <div class="cart__product-info">
          <h3>${livro.titulo}</h3>
          <p>Quantidade: ${item.quantidade}</p>
          <strong>${formatarPreco(subtotal)}</strong>
        </div>
        <button class="remove" type="button" aria-label="Remover item">Remover</button>
      `;

      // Sprint 3 - Conexão do botão remover
      const botaoRemover = divItem.querySelector(".remove");
      if (botaoRemover) {
        botaoRemover.addEventListener("click", function () {
          carrinho = carrinho.filter(function (c) {
            return c.id !== item.id;
          });
          salvarCarrinho();
          renderizarCarrinho();
        });
      }

      listaProdutosCarrinho.appendChild(divItem);
    }
  }

  elementoTotal.textContent = formatarPreco(totalGeral);
}

// Eventos de clique para abrir e fechar a gaveta
if (botaoAbrirCarrinho) {
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
}

if (botaoFecharCarrinho) {
  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
}

if (backdropCarrinho) {
  backdropCarrinho.addEventListener("click", fecharCarrinho);
}

// Renderiza o carrinho ao iniciar
renderizarCarrinho();