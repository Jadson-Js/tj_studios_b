export function scroll() {
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Offset de 2rem (convertido para pixels)
    const remInPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const offset = 2 * remInPixels;

    // Posição do elemento menos o offset
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  // Suporte para links com hash (#) na URL
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => smoothScrollTo(targetId), 100);
  }
}
