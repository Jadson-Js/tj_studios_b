import { menuToggle } from "./scripts/menuToggle";
import { Carousel } from "./scripts/Carousel";
import { testemunity } from "./scripts/testemunity";
import { faq } from "./scripts/faq";
import { scroll } from "./scripts/scroll";
import { form } from "./scripts/form";

menuToggle();
testemunity();
faq();
scroll();
form();

document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
