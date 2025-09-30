export function faq() {
  // Seleciona todos os botões dentro dos artigos do FAQ
  const faqButtons = document.querySelectorAll("article .faq-button");

  // Adiciona um evento de clique a cada botão
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Encontra o 'article' pai mais próximo do botão clicado
      const article = button.closest("article");

      // Dentro do artigo, encontra o contêiner da resposta e o ícone svg
      const answerContainer = article.querySelector(".faq-answer");
      const icon = button.querySelector("svg");

      // Alterna a rotação do ícone
      icon.classList.toggle("rotate-180");

      // Verifica se o contêiner da resposta está fechado (max-h-0)
      if (answerContainer.classList.contains("max-h-0")) {
        // Se estiver fechado, abre
        answerContainer.classList.remove("max-h-0");
        answerContainer.classList.add("max-h-[500px]");
      } else {
        // Se estiver aberto, fecha
        answerContainer.classList.remove("max-h-[500px]");
        answerContainer.classList.add("max-h-0");
      }
    });
  });
}
