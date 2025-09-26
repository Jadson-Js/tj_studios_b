export class Carousel {
  constructor() {
    this.carousel = document.querySelector("#carousel");
    this.originalCards = document.querySelectorAll("[data-card]");
    this.totalCards = this.originalCards.length;
    this.cloneCount = 2;
    this.currentPage = this.cloneCount;

    this.createClones();

    this.allCards = document.querySelectorAll("[data-card]");

    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");

    this.init();
  }

  init() {
    this.updateCardStyle();
    this.moveCarousel();

    this.next();
    this.prev();
  }

  next() {
    this.nextBtn.addEventListener("click", () => {
      this.currentPage++;
      this.moveCarousel();
      this.updateCardStyle();
    });
  }

  prev() {
    this.prevBtn.addEventListener("click", () => {
      this.currentPage--;
      this.moveCarousel();
      this.updateCardStyle();
    });
  }

  moveCarousel() {
    const distance = `calc(${this.currentPage} * -20%)`;
    this.carousel.style.transform = `translateX(${distance})`;
  }

  updateCardStyle() {
    this.originalCards.forEach((card, index) => {
      card.classList.remove(
        "w-[calc(125%/5)]",
        "w-[calc(93.75%/5)]",
        "md:h-125",
        "md:h-100",
      );

      if (index === this.currentPage) {
        card.classList.add("w-[calc(125%/5)]", "md:h-125");
      } else {
        card.classList.add("w-[calc(93.75%/5)]", "md:h-100");
      }
    });
  }

  createClones() {
    // Criar clones dos últimos cards no início
    for (
      let i = this.totalCards - 1;
      i >= this.totalCards - this.cloneCount;
      i--
    ) {
      const clone = this.originalCards[i].cloneNode(true);
      clone.classList.add(
        "flex-shrink-0",
        "border-8",
        "border-white",
        "transition-all",
        "duration-900",
        "w-[calc(100%/5)]",
        "md:h-100",
      );
      this.carousel.insertBefore(clone, this.carousel.firstChild);
    }

    // Criar clones dos primeiros cards no final
    for (let i = 0; i < this.cloneCount; i++) {
      const clone = this.originalCards[i].cloneNode(true);
      clone.classList.add(
        "flex-shrink-0",
        "border-8",
        "border-white",
        "transition-all",
        "duration-900",
        "w-[calc(100%/5)]",
        "md:h-100",
      );
      this.carousel.appendChild(clone);
    }
  }
}
