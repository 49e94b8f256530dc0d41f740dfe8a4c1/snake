import { Key } from "ts-key-enum";
import { Snake } from "./snake";
import "./styles/styles.scss";

const snake = new Snake();
const playButton = document.getElementById("play-btn");
const leftButton = document.getElementById("left-btn");
const upButton = document.getElementById("up-btn");
const downButton = document.getElementById("down-btn");
const rightButton = document.getElementById("right-btn");

window.addEventListener("load", function () {
  onkeydown = (event) => snake.onkeydown(event);
});

playButton.addEventListener("click", () => {
  snake.start();
});

leftButton.addEventListener("click", () => {
  snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowLeft }));
});

upButton.addEventListener("click", () => {
  snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowUp }));
});

downButton.addEventListener("click", () => {
  snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
});

rightButton.addEventListener("click", () => {
  snake.onkeydown(new KeyboardEvent("keydown", { code: Key.ArrowRight }));
});
