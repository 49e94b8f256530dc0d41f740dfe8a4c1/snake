import { Snake } from "./snake";

window.addEventListener("load", function () {
  const snake = new Snake();
  snake.start();
  onkeydown = (event) => snake.onkeydown(event);
});
