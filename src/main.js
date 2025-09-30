import { menuToggle } from "./scripts/menuToggle";
import { Carousel } from "./scripts/Carousel";
import { testemunity } from "./scripts/testemunity";

menuToggle();
testemunity();

document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
