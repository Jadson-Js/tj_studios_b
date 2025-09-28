export class Carousel {
  constructor() {
    this.carousel = document.querySelector("#carousel");
    this.originalCards = document.querySelectorAll("[data-card]");
    this.totalCards = this.originalCards.length;
    this.cloneCount = 3;
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

  next() {
    this.nextBtn.addEventListener("click", () => {
      if (this.currentPage == 5) {
        this.handleLoop(0);
      } else {
        this.currentPage++;
        this.updateCardStyle();
        this.moveCarousel();
      }
    });
  }

  prev() {
    this.prevBtn.addEventListener("click", () => {
      if (this.currentPage == 0) {
        this.handleLoop(4);
      } else {
        this.currentPage--;
        this.updateCardStyle();
        this.moveCarousel();
      }
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
        "w-[calc(100%/5)]",
        "md:h-125",
        "md:h-100",
      );

      if (index === this.currentPage - 1) {
        console.log(
          index,
          " <- index | currentPage - 1 -> ",
          this.currentPage - 1,
        );

        card.classList.add("w-[calc(125%/5)]", "md:h-125");
      } else {
        card.classList.add("w-[calc(100%/5)]", "md:h-100");
      }
    });
  }

  handleLoop(position) {
    const startCard = this.allCards[2];
    const endCard = this.allCards[5];

    this.carousel.classList.remove("transition-all", "duration-900");
    startCard.classList.remove("transition-all", "duration-900");
    startCard.classList.remove("w-[calc(100%/5)]", "md:h-100");
    startCard.classList.add("w-[calc(125%/5)]", "md:h-125");
    this.currentPage = position;
    this.moveCarousel();

    setTimeout(() => {
      this.carousel.classList.add("transition-all", "duration-900");
      startCard.classList.add("transition-all", "duration-900");

      startCard.classList.remove("w-[calc(125%/5)]", "md:h-125");
      startCard.classList.add("w-[calc(100%/5)]", "md:h-100");

      this.currentPage = position + 1;
      this.updateCardStyle();
      this.moveCarousel();
    }, 0);
  }
}
