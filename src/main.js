import { menuToggle } from "./scripts/menuToggle";
import { Carousel } from "./scripts/Carousel";
import { testemunity } from "./scripts/testemunity";
import { faq } from "./scripts/faq";

menuToggle();
testemunity();
faq();

document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
