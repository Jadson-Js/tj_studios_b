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

    this.title = document.getElementById("galeryCardTitle");

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
        "md:h-100",
      );

      clone.style.flexBasis = "19%";
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
        "md:h-100",
      );

      clone.style.flexBasis = "19%";
      this.carousel.appendChild(clone);
    }
  }

  next() {
    this.nextBtn.addEventListener("click", () => {
      this.currentPage++;

      if (this.currentPage == 6) {
        this.handleLoop(1);
      } else {
        this.updateCardStyle();
        this.moveCarousel();
      }
    });
  }

  prev() {
    this.prevBtn.addEventListener("click", () => {
      this.currentPage--;

      if (this.currentPage == 0) {
        this.handleLoop(5);
      } else {
        this.updateCardStyle();
        this.moveCarousel();
      }
    });
  }

  moveCarousel(loop) {
    /* let distance = 0;

    for (let i = 0; i < this.currentPage; i++) {
      distance += this.allCards[i].offsetWidth;
    }

    this.carousel.style.transform = `translateX(-${distance}px)`; */
    let distance;
    if (loop) {
      distance = `calc(${this.currentPage} * -20%)`;
    } else {
      distance = `calc(${this.currentPage} * -19%)`;
    }

    this.carousel.style.transform = `translateX(${distance})`;
  }

  updateCardStyle() {
    this.originalCards.forEach((card, index) => {
      card.classList.remove("md:h-125", "md:h-100");

      if (index === this.currentPage - 1) {
        card.style.flexBasis = "24%";
        card.classList.add("md:h-125");

        this.title.innerText = card.getAttribute("data-card");
      } else {
        card.style.flexBasis = "19%";
        card.classList.add("md:h-100");
      }
    });
  }

  resetCardStyle() {
    this.originalCards.forEach((card, index) => {
      card.style.flexBasis = "20%";
    });
  }

  handleLoop(position) {
    const nextCard = this.allCards[2];
    const prevCard = this.allCards[8];
    const targetCard = position == 1 ? nextCard : prevCard;

    // Remove transições
    this.carousel.classList.remove("transition-all", "duration-900");
    targetCard.classList.remove("transition-all", "duration-900");

    // Atualiza posição
    this.currentPage = position == 1 ? position - 1 : position + 1;
    this.resetCardStyle();
    this.moveCarousel(true);

    // Muda tamanho
    targetCard.classList.remove("md:h-100");
    targetCard.classList.add("md:h-125");
    targetCard.style.flexBasis = "24%";

    // Força repaint antes de animar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.currentPage = position;

        // Restaura transições
        this.carousel.classList.add("transition-all", "duration-900");
        targetCard.classList.add("transition-all", "duration-900");

        this.moveCarousel();
        this.updateCardStyle();

        // Reverte tamanho (agora com transição)
        targetCard.classList.remove("md:h-125");
        targetCard.style.flexBasis = "19%";
        targetCard.classList.add("md:h-100");
      });
    });
  }
}
