import { menuToggle } from "./scripts/menuToggle";

menuToggle();

class Carousel {
  constructor() {
    this.currentPage = 0;
    this.cardsPerPage = 5;
    this.carousel = document.querySelector("#carousel");
    this.allCards = document.querySelectorAll("[data-card]");
    this.totalPages = Math.ceil(this.allCards.length / this.cardsPerPage);

    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");

    this.init();
  }

  init() {
    // Event listeners para os botões
    this.nextBtn.addEventListener("click", () => this.nextPage());
    this.prevBtn.addEventListener("click", () => this.prevPage());
    this.resetCardLayout();
    this.updateCardLayout();
  }

  nextPage() {
    if (this.currentPage < this.allCards.length - this.cardsPerPage) {
      this.currentPage++;

      this.resetCardLayout();
      this.moveCards();
      this.updateCardLayout();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;

      this.resetCardLayout();
      this.moveCards();
      this.updateCardLayout();
    }
  }

  resetCardLayout() {
    this.allCards.forEach((card) => {
      const cardClass = card.classList;
      const innerDiv = card.querySelector("div");

      // RESETA CLASSES
      cardClass.remove(
        "w-[calc((120%_-_4rem)/5)]",
        "w-[calc((110%_-_4rem)/5)]",
        "w-[calc((100%_-_4rem)/5)]",
        "w-[calc((80%_-_4rem)/5)]",
      );
      innerDiv.classList.remove("md:h-80", "md:h-95", "md:h-110");

      // PADRONIZA CLASSES
      cardClass.add("w-[calc((100%_-_4rem)/5)]");
      innerDiv.classList.add("md:h-80");
    });
  }

  moveCards() {
    const distance = `calc(${this.currentPage} * -20%)`;

    this.carousel.style.transform = `translateX(${distance})`;
  }

  updateCardLayout() {
    const firstCard = this.allCards[this.currentPage + 2];
    const secondeCards = [
      this.allCards[this.currentPage + 1],
      this.allCards[this.currentPage + 3],
    ];
    const thirdCards = [
      this.allCards[this.currentPage],
      this.allCards[this.currentPage + 4],
    ];

    firstCard.classList.remove("w-[calc((100%_-_4rem)/5)]");
    firstCard.classList.add("w-[calc((120%_-_4rem)/5)]");
    firstCard.querySelector("div").classList.add("md:h-110");

    secondeCards.forEach((card) => {
      card.classList.remove("w-[calc((100%_-_4rem)/5)]");
      card.classList.add("w-[calc((110%_-_4rem)/5)]");
      card.querySelector("div").classList.add("md:h-95");
    });

    thirdCards.forEach((card) => {
      card.classList.remove("w-[calc((100%_-_4rem)/5)]");
      card.classList.add("w-[calc((80%_-_4rem)/5)]");
    });
  }
}

// Para o carrossel funcionar, as classes CSS precisam estar definidas
// Adicione isso ao seu <style> ou arquivo CSS, se ainda não tiver:

// Inicializar o carousel quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});

/*
<div class="transform transition-all duration-500 hover:scale-105 flex-shrink-0 basis-1/6" data-card="0">
            <div class="bg-white shadow-sm h-48 md:h-80">
              <img src="https://images.pexels.com/photos/34017201/pexels-photo-34017201.jpeg" alt="Fotógrafo ao amanhecer" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Card 2 -->
          <div class="transform transition-all duration-500 hover:scale-105 flex-shrink-0 basis-1/6" data-card="1">
            <div class="bg-white shadow-sm h-48 md:h-95">
              <img src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fotografia de paisagem" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Card 3 -->
          <div class="transform transition-all duration-500 hover:scale-105 flex-shrink-0 basis-2/6" data-card="2">
            <div class="bg-white shadow-sm h-48 md:h-110">
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Equipamento fotográfico" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Card 4 -->
          <div class="transform transition-all duration-500 hover:scale-105 flex-shrink-0 basis-1/6" data-card="3">
            <div class="bg-white shadow-sm h-48 md:h-95">
              <img src="https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Fotógrafo ao amanhecer" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Card 5 -->
          <div class="transform transition-all duration-500 hover:scale-105 flex-shrink-0 basis-1/6" data-card="4">
            <div class="bg-white shadow-sm h-48 md:h-80 rounded-lg">
              <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Mão segurando câmera com fumaça" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Card 6 -->
          <div class="transform transition-all duration-500 hover:scale-105 flex-shrink-0 basis-1/6" data-card="5">
            <div class="bg-white shadow-sm h-48 md:h-80 rounded-lg">
              <img src="https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Pessoa fotografando através de flores" class="w-full h-full object-cover">
            </div>
          </div>
*/
