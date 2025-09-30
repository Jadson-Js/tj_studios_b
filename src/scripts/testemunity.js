export function testemunity() {
  const items = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.querySelectorAll(".prevBtnTestemunity");
  const nextBtn = document.querySelectorAll(".nextBtnTestemunity");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const totalItems = items.length;

  // Event listeners para botões
  nextBtn.forEach((item) => item.addEventListener("click", nextItem));
  prevBtn.forEach((item) => item.addEventListener("click", prevItem));

  // Função para mostrar item específico
  function showItem(index) {
    // Remove classe active de todos os itens
    items.forEach((item) => item.classList.remove("active"));
    indicators.forEach((ind) => {
      ind.classList.remove("bg-stone-400");
      ind.classList.add("bg-stone-300");
    });

    // Adiciona classe active ao item atual
    items[index].classList.add("active");
    indicators[index].classList.remove("bg-stone-300");
    indicators[index].classList.add("bg-stone-400");

    currentIndex = index;
  }

  // Função para ir ao próximo
  function nextItem() {
    const newIndex = (currentIndex + 1) % totalItems;

    showItem(newIndex);
  }

  // Função para ir ao anterior
  function prevItem() {
    const newIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(newIndex);
  }

  // Event listeners para indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => showItem(index));
  });
}
