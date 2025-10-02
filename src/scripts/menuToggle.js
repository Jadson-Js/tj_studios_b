export function menuToggle() {
  const menuToggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuToggleBtn.querySelector(".menu-icon");
  const menuLinks = document.querySelectorAll(".menu-link");
  let isOpen = false;

  function closeMenu() {
    mobileMenu.classList.remove("menu-enter");
    mobileMenu.classList.add("menu-exit");
    menuIcon.classList.remove("active");

    setTimeout(() => {
      mobileMenu.classList.add("menu-hidden");
      mobileMenu.classList.remove("menu-exit");
    }, 300);

    isOpen = false;
  }

  function openMenu() {
    mobileMenu.classList.remove("menu-hidden");
    mobileMenu.classList.add("menu-enter");
    menuIcon.classList.add("active");

    setTimeout(() => {
      mobileMenu.classList.remove("menu-enter");
    }, 300);

    isOpen = true;
  }

  menuToggleBtn.addEventListener("click", () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fechar menu ao clicar em qualquer link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isOpen) {
        closeMenu();
      }
    });
  });
}
