import { getCanvas } from "./canvas.js";

import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";

import Dot from "./dot.js";

const variables = {
  type: "circle",
  size: 5
};

const gui = new dat.GUI();
gui.add(variables, "type", ["circle", "rect"]);
gui.add(variables, "size", 1, 20).step(1);

let canvas;
let boundingBox;
let currentDot;
let currentHue;

// start / stop button
let running = true;
const startButton = document.getElementById("start-button");
startButton.addEventListener('click', () => {
  running = !running;
  if (running) {
    window.requestAnimationFrame(loop);
  }
});

// export button
const exportButton = document.getElementById("export-button");
exportButton.addEventListener('click', () => {
  console.log(canvas.svg())
});

async function main() {
  canvas = await getCanvas();
  boundingBox = canvas.node.getBoundingClientRect();

  // setup
  currentDot = new Dot(boundingBox.width / 2, boundingBox.height / 2);
  currentHue = 180;
  window.requestAnimationFrame(loop);
}

function randomNumber(n, size = 1, min, max) {
  const newN = n + (Math.floor(Math.random() * 3) - 1) * size;
  if (min !== undefined && newN < min) {
    return n;
  }
  if (max !== undefined && newN > max) {
    return n;
  }
  return newN;
}

function randomWalk(dot) {
  const { top, bottom, left, right } = boundingBox;
  const newX = randomNumber(dot.x, variables.size, left, right);
  const newY = randomNumber(dot.y, variables.size, top, bottom);
  return new Dot(newX, newY);
}

function loop() {
  if (!canvas) return;

  // canvas.clear();

  currentDot = randomWalk(currentDot);

  let element;
  if (variables.type === "circle") {
    element = canvas.circle(variables.size);
  } else if (variables.type === "rect") {
    element = canvas.rect(variables.size, variables.size);
  }

  // currentHue = randomNumber(currentHue, 5, 0, 360);
  // const color = `hsl(${currentHue}, 50%, 50%)`;
  const color = '#fff'

  element
    .move(currentDot.x, currentDot.y)
    .fill(color)
    .stroke({ color: "hsl(0, 0%, 0%)", width: 1 });

  if (running) {
    window.requestAnimationFrame(loop);
  }
}

main();
