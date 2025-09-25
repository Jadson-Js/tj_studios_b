export class Carousel {
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
