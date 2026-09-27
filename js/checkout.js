// Sprint 3 — Pessoa 2: implemente a finalização simulada.
// Seleciona o botão de finalizar compra
const botaoCheckout = document.querySelector(".checkout");

if (botaoCheckout) {
  botaoCheckout.addEventListener("click", function () {
    // 1. Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
      alert("O seu carrinho está vazio! Adicione pelo menos um livro.");
      return; // Encerra a função aqui para não finalizar nada
    }

    // 2. Notifica o utilizador que a compra foi concluída
    alert("Compra realizada com sucesso! Obrigado pela sua leitura.");

    // 3. Esvazia o array do carrinho
    carrinho = [];

    // 4. Salva o carrinho vazio no localStorage
    salvarCarrinho();

    // 5. Atualiza a lista visual do carrinho para ficar zerada
    renderizarCarrinho();

    // 6. Fecha a gaveta lateral
    fecharCarrinho();
  });
}