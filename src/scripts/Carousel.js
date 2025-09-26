export class Carousel {
  constructor() {
    this.cardsPerPage = 5;
    this.carousel = document.querySelector("#carousel");
    this.originalCards = document.querySelectorAll("[data-card]");
    this.totalOriginalCards = this.originalCards.length;

    // Duplicar cards para criar loop infinito
    this.createInfiniteLoop();

    this.allCards = document.querySelectorAll("[data-card]");
    this.totalPages = Math.ceil(this.allCards.length / this.cardsPerPage);

    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");

    // Começar na posição que mostra os cards originais
    this.currentPage = this.totalOriginalCards;

    // Flag para controlar se está fazendo reset
    this.isResetting = false;

    // Configurações de animação
    this.animationConfig = {
      carousel: {
        duration: "0.4s",
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      cards: {
        duration: "0.35s",
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 20, // ms de delay entre cada card
      },
    };

    this.init();
  }

  createInfiniteLoop() {
    const carouselContainer = this.carousel;

    // Adicionar clones no final
    this.originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("cloned-card");
      carouselContainer.appendChild(clone);
    });

    // Adicionar clones no início
    for (let i = this.originalCards.length - 1; i >= 0; i--) {
      const clone = this.originalCards[i].cloneNode(true);
      clone.classList.add("cloned-card");
      carouselContainer.insertBefore(clone, carouselContainer.firstChild);
    }
  }

  init() {
    // Configurar CSS para animações dos cards
    this.setupCardAnimations();

    // Event listeners para os botões
    this.nextBtn.addEventListener("click", () => {
      if (!this.isResetting) this.nextPage();
    });
    this.prevBtn.addEventListener("click", () => {
      if (!this.isResetting) this.prevPage();
    });

    // Posicionar inicialmente no conjunto original de cards
    this.carousel.style.transition = `transform ${this.animationConfig.carousel.duration} ${this.animationConfig.carousel.easing}`;
    this.moveCardsAndUpdate();
  }

  setupCardAnimations() {
    // Adicionar transições CSS para cada card
    this.allCards.forEach((card, index) => {
      const innerDiv = card.querySelector("div");

      // IMPORTANTE: Configurar transições com a mesma duração e timing para sincronização
      const transitionProps = `${this.animationConfig.carousel.duration} ${this.animationConfig.carousel.easing}`;

      // Configurar transições para o card principal (largura sincronizada com movimento)
      card.style.transition = `
        width ${transitionProps},
        transform 0.25s ease-out
      `;

      // Configurar transições para o div interno (altura sincronizada)
      if (innerDiv) {
        innerDiv.style.transition = `
          height ${transitionProps},
          transform 0.2s ease-out
        `;
      }
    });
  }

  nextPage() {
    this.currentPage++;
    this.moveCardsAndUpdate();

    // Verificar se precisa "resetar" para o início
    if (this.currentPage >= this.totalOriginalCards * 2) {
      this.performInfiniteReset(this.totalOriginalCards);
    }
  }

  prevPage() {
    this.currentPage--;
    this.moveCardsAndUpdate();

    // Verificar se precisa "resetar" para o final
    if (this.currentPage < 0) {
      this.performInfiniteReset(this.totalOriginalCards - 1);
    }
  }

  // CORREÇÃO PRINCIPAL: Reset sem flick com pre-posicionamento
  performInfiniteReset(newPage) {
    this.isResetting = true;

    // Aguardar a transição atual terminar completamente
    setTimeout(() => {
      requestAnimationFrame(() => {
        // 1. Primeiro, posicionar instantaneamente na nova posição
        this.carousel.style.transition = "none";
        this.currentPage = newPage;

        // 2. Aplicar posição sem animação
        const distance = `calc(${this.currentPage} * -20%)`;
        this.carousel.style.transform = `translateX(${distance})`;

        // 3. Forçar repaint para garantir posicionamento
        this.carousel.offsetHeight;

        // 4. Aplicar layout dos cards instantaneamente
        this.applyCardLayoutInstant();

        // 5. Forçar outro repaint
        this.carousel.offsetWidth;

        // 6. Restaurar transições em frame separado
        requestAnimationFrame(() => {
          this.carousel.style.transition = `transform ${this.animationConfig.carousel.duration} ${this.animationConfig.carousel.easing}`;
          this.restoreCardTransitions();
          this.isResetting = false;
        });
      });
    }, 400); // Tempo ligeiramente maior que a duração da animação
  }

  // NOVO: Aplicar layout instantâneo sem transições
  applyCardLayoutInstant() {
    const centerIndex = this.currentPage + 2;
    const leftIndices = [this.currentPage + 1, this.currentPage + 3];
    const outerIndices = [this.currentPage, this.currentPage + 4];

    this.allCards.forEach((card, index) => {
      const cardClass = card.classList;
      const innerDiv = card.querySelector("div");

      // Temporariamente remover transições
      const originalCardTransition = card.style.transition;
      const originalInnerTransition = innerDiv ? innerDiv.style.transition : "";

      card.style.transition = "none";
      if (innerDiv) innerDiv.style.transition = "none";

      // Remover todas as classes de layout
      cardClass.remove(
        "w-[calc((120%_-_4rem)/5)]",
        "w-[calc((110%_-_4rem)/5)]",
        "w-[calc((100%_-_4rem)/5)]",
        "w-[calc((80%_-_4rem)/5)]",
      );
      if (innerDiv) {
        innerDiv.classList.remove("md:h-80", "md:h-95", "md:h-110");
      }

      // Aplicar novo layout
      if (index === centerIndex) {
        cardClass.add("w-[calc((120%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-110");
      } else if (leftIndices.includes(index)) {
        cardClass.add("w-[calc((110%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-95");
      } else if (outerIndices.includes(index)) {
        cardClass.add("w-[calc((80%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-80");
      } else {
        cardClass.add("w-[calc((100%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-80");
      }
    });
  }

  // NOVO: Restaurar transições dos cards com sincronização
  restoreCardTransitions() {
    this.allCards.forEach((card, index) => {
      const innerDiv = card.querySelector("div");

      // Usar as mesmas configurações de timing para manter sincronização
      const transitionProps = `${this.animationConfig.carousel.duration} ${this.animationConfig.carousel.easing}`;

      // Restaurar sem delay para evitar dessincronização
      card.style.transition = `
        width ${transitionProps},
        transform 0.25s ease-out
      `;

      if (innerDiv) {
        innerDiv.style.transition = `
          height ${transitionProps},
          transform 0.2s ease-out
        `;
      }
    });
  }

  // CORRIGIDO: Método unificado com animações simultâneas
  moveCardsAndUpdate() {
    if (!this.isResetting) {
      // Aplicar layout dos cards ANTES do movimento para começar simultaneamente
      this.applyCardLayoutImmediate();

      // Usar requestAnimationFrame para garantir que ambas animações comecem juntas
      requestAnimationFrame(() => {
        this.moveCards();
      });
    }
  }

  // NOVO: Aplicação imediata do layout sem delay
  applyCardLayoutImmediate() {
    const centerIndex = this.currentPage + 2;
    const leftIndices = [this.currentPage + 1, this.currentPage + 3];
    const outerIndices = [this.currentPage, this.currentPage + 4];

    this.allCards.forEach((card, index) => {
      if (this.isResetting) return; // Cancelar se reset começou

      const cardClass = card.classList;
      const innerDiv = card.querySelector("div");

      // Remover classes existentes
      cardClass.remove(
        "w-[calc((120%_-_4rem)/5)]",
        "w-[calc((110%_-_4rem)/5)]",
        "w-[calc((100%_-_4rem)/5)]",
        "w-[calc((80%_-_4rem)/5)]",
      );
      if (innerDiv) {
        innerDiv.classList.remove("md:h-80", "md:h-95", "md:h-110");
      }

      // Aplicar novo layout imediatamente (sem delay)
      if (index === centerIndex) {
        cardClass.add("w-[calc((120%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-110");
      } else if (leftIndices.includes(index)) {
        cardClass.add("w-[calc((110%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-95");
      } else if (outerIndices.includes(index)) {
        cardClass.add("w-[calc((80%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-80");
      } else {
        cardClass.add("w-[calc((100%_-_4rem)/5)]");
        if (innerDiv) innerDiv.classList.add("md:h-80");
      }
    });
  }

  // OTIMIZADO: Mantido para compatibilidade
  applyCardLayout() {
    const centerIndex = this.currentPage + 2;
    const leftIndices = [this.currentPage + 1, this.currentPage + 3];
    const outerIndices = [this.currentPage, this.currentPage + 4];

    this.allCards.forEach((card, index) => {
      if (
        index === centerIndex &&
        !card.classList.contains("w-[calc((120%_-_4rem)/5)]")
      ) {
        const cardClass = card.classList;
        const innerDiv = card.querySelector("div");

        cardClass.remove(
          "w-[calc((100%_-_4rem)/5)]",
          "w-[calc((110%_-_4rem)/5)]",
          "w-[calc((80%_-_4rem)/5)]",
        );
        cardClass.add("w-[calc((120%_-_4rem)/5)]");
        if (innerDiv) {
          innerDiv.classList.remove("md:h-80", "md:h-95");
          innerDiv.classList.add("md:h-110");
        }
      } else if (
        leftIndices.includes(index) &&
        !card.classList.contains("w-[calc((110%_-_4rem)/5)]")
      ) {
        const cardClass = card.classList;
        const innerDiv = card.querySelector("div");

        cardClass.remove(
          "w-[calc((100%_-_4rem)/5)]",
          "w-[calc((120%_-_4rem)/5)]",
          "w-[calc((80%_-_4rem)/5)]",
        );
        cardClass.add("w-[calc((110%_-_4rem)/5)]");
        if (innerDiv) {
          innerDiv.classList.remove("md:h-80", "md:h-110");
          innerDiv.classList.add("md:h-95");
        }
      } else if (
        outerIndices.includes(index) &&
        !card.classList.contains("w-[calc((80%_-_4rem)/5)]")
      ) {
        const cardClass = card.classList;
        const innerDiv = card.querySelector("div");

        cardClass.remove(
          "w-[calc((100%_-_4rem)/5)]",
          "w-[calc((120%_-_4rem)/5)]",
          "w-[calc((110%_-_4rem)/5)]",
        );
        cardClass.add("w-[calc((80%_-_4rem)/5)]");
        if (innerDiv) {
          innerDiv.classList.remove("md:h-95", "md:h-110");
          innerDiv.classList.add("md:h-80");
        }
      }
    });
  }

  moveCards() {
    const distance = `calc(${this.currentPage} * -20%)`;
    this.carousel.style.transform = `translateX(${distance})`;

    if (!this.carousel.style.transition) {
      this.carousel.style.transition = `transform ${this.animationConfig.carousel.duration} ${this.animationConfig.carousel.easing}`;
    }
  }

  updateCardLayout() {
    this.applyCardLayout();
  }

  // MELHORADO: Auto-play com prevenção durante animações
  startAutoPlay(interval = 4000) {
    // Intervalo ligeiramente maior para acomodar animações
    this.autoPlayInterval = setInterval(() => {
      if (!this.isResetting) {
        this.nextPage();
      }
    }, interval);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // NOVO: Método para ajustar velocidade das animações (sincronizado)
  setAnimationSpeed(speed = "normal") {
    const speeds = {
      slow: {
        carousel: {
          duration: "0.6s",
          easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        },
      },
      normal: {
        carousel: {
          duration: "0.4s",
          easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        },
      },
      fast: {
        carousel: {
          duration: "0.25s",
          easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        },
      },
    };

    this.animationConfig = speeds[speed] || speeds.normal;

    // Atualizar transição do carousel
    this.carousel.style.transition = `transform ${this.animationConfig.carousel.duration} ${this.animationConfig.carousel.easing}`;

    // Reconfigurar animações dos cards com sincronização
    this.setupCardAnimations();
  }

  // NOVO: Método para pausar/retomar animações
  pauseAnimations() {
    this.carousel.style.animationPlayState = "paused";
    this.allCards.forEach((card) => {
      card.style.animationPlayState = "paused";
      const innerDiv = card.querySelector("div");
      if (innerDiv) innerDiv.style.animationPlayState = "paused";
    });
  }

  resumeAnimations() {
    this.carousel.style.animationPlayState = "running";
    this.allCards.forEach((card) => {
      card.style.animationPlayState = "running";
      const innerDiv = card.querySelector("div");
      if (innerDiv) innerDiv.style.animationPlayState = "running";
    });
  }
}
