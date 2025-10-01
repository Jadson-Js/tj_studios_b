import { menuToggle } from "./scripts/menuToggle";
import { Carousel } from "./scripts/Carousel";
import { testemunity } from "./scripts/testemunity";
import { faq } from "./scripts/faq";
import { scroll } from "./scripts/scroll";

menuToggle();
testemunity();
faq();
scroll();

document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
