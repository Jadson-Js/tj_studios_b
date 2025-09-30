export class Carousel {
  constructor() {
    this.carousel = document.querySelector("#carousel");
    this.originalCards = document.querySelectorAll("[data-card]");
    this.totalCards = this.originalCards.length;
    this.cloneCount = 3;
    this.currentPage = this.cloneCount;

    this.isMobile = window.matchMedia("(max-width: 768px)").matches;

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
      const border = this.isMobile ? "border-none" : "border-8";
      clone.classList.add(
        "flex-shrink-0",
        border,
        "border-white",
        "transition-all",
        "duration-900",
        "h-80",
        "md:h-100",
      );

      clone.style.flexBasis = this.isMobile ? "10%" : "19%";
      this.carousel.insertBefore(clone, this.carousel.firstChild);
    }

    // Criar clones dos primeiros cards no final
    for (let i = 0; i < this.cloneCount; i++) {
      const clone = this.originalCards[i].cloneNode(true);
      const border = this.isMobile ? "border-none" : "border-8";

      clone.classList.add(
        "flex-shrink-0",
        border,
        "border-white",
        "transition-all",
        "duration-900",
        "h-80",
        "md:h-100",
      );

      clone.style.flexBasis = this.isMobile ? "10%" : "19%";
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

  moveCarousel(isLoopNext) {
    if (isLoopNext) {
      let distance = 0;

      for (let i = 0; i < this.currentPage; i++) {
        distance += this.allCards[i].offsetWidth;
      }

      this.carousel.style.transform = `translateX(-${distance}px)`;
    } else {
      const distance = `calc(${this.currentPage} * ${
        this.isMobile ? "-10% + -10%" : "-19%"
      })`;

      this.carousel.style.transform = `translateX(${distance})`;
    }
  }

  updateCardStyle() {
    const border = this.isMobile ? "border-none" : "border-8";

    this.originalCards.forEach((card, index) => {
      card.classList.remove("h-100", "h-80", "md:h-125", "md:h-100");

      if (index === this.currentPage - 1) {
        card.style.flexBasis = this.isMobile ? "80%" : "24%";
        card.classList.add(this.isMobile ? "h-100" : "md:h-125", border);

        this.title.innerText = card.getAttribute("data-card");
      } else {
        card.style.flexBasis = this.isMobile ? "10%" : "19%";
        card.classList.add(this.isMobile ? "h-80" : "md:h-100", border);
      }
    });
  }

  /* handleLoop(position) {
    const nextCard = this.allCards[2];
    const prevCard = this.allCards[8];
    const targetCard = position == 1 ? nextCard : prevCard;

    // Remove transições
    this.carousel.classList.remove("transition-all", "duration-900");
    targetCard.classList.remove("transition-all", "duration-900");

    // Atualiza posição
    this.currentPage = position == 1 ? position - 1 : position + 1;
    this.moveCarousel(true);

    // Muda tamanho
    targetCard.classList.remove("h-100", "h-80", "md:h-100", "h-125");
    targetCard.classList.add(this.isMobile ? "h-100" : "md:h-125");
    targetCard.style.flexBasis = this.isMobile ? "80%" : "24%";

    // Força repaint antes de animar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Restaura transições
        this.carousel.classList.add("transition-all", "duration-900");
        targetCard.classList.add("transition-all", "duration-900");

        this.currentPage = position;
        this.updateCardStyle();
        this.moveCarousel();

        // Reverte tamanho (agora com transição)
        targetCard.classList.remove("h-100", "h-80", "md:h-125", "md:h-100");
        targetCard.style.flexBasis = this.isMobile ? "10%" : "19%";
        targetCard.classList.add(this.isMobile ? "h-80" : "md:h-100");
      });
    });
  } */

  handleLoop(position) {
    const nextCard = this.allCards[2];
    const prevCard = this.allCards[8];
    const targetCard = position == 1 ? nextCard : prevCard;

    // Remove transições
    this.carousel.classList.remove("transition-all", "duration-900");
    targetCard.classList.remove("transition-all", "duration-900");

    // Atualiza posição
    this.currentPage = position == 1 ? position - 1 : position + 1;
    this.moveCarousel(true);

    // Muda tamanho
    targetCard.classList.remove("h-100", "h-80", "md:h-100", "h-125");
    targetCard.classList.add(this.isMobile ? "h-100" : "md:h-125");
    targetCard.style.flexBasis = this.isMobile ? "80%" : "24%";

    // Força repaint antes de animar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Restaura transições
        this.carousel.classList.add("transition-all", "duration-900");
        targetCard.classList.add("transition-all", "duration-900");

        this.currentPage = position;
        this.updateCardStyle();
        this.moveCarousel();

        // Reverte tamanho (agora com transição)
        targetCard.classList.remove("h-100", "h-80", "md:h-125", "md:h-100");
        targetCard.style.flexBasis = this.isMobile ? "10%" : "19%";
        targetCard.classList.add(this.isMobile ? "h-80" : "md:h-100");
      });
    });
  }
}
