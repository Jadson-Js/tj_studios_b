import { menuToggle } from "./scripts/menuToggle";
import { Carousel } from "./scripts/Carousel";

menuToggle();

document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
