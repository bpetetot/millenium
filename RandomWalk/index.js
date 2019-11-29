import { createEngine } from "./engine.js";

import Dot from "./dot.js";

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

function randomWalk(dot, boundingBox) {
  const { top, bottom, left, right } = boundingBox;
  const newX = randomNumber(dot.x, variables.size, left, right);
  const newY = randomNumber(dot.y, variables.size, top, bottom);
  return new Dot(newX, newY);
}

let dots = [];
let currentHue;

const variables = {
  type: "circle",
  size: 5
};

createEngine({
  init: ({ gui, boundingBox }) => {
    gui.add(variables, "type", ["circle", "rect"]);
    gui.add(variables, "size", 1, 20).step(1);

    dots.push(new Dot(boundingBox.width / 2, boundingBox.height / 2))
    // dots.push(new Dot(boundingBox.width / 4, boundingBox.height / 2))
    // dots.push(new Dot(boundingBox.width / 2, boundingBox.height / 4))
    // dots.push(new Dot(boundingBox.width / 8, boundingBox.height / 2))

    currentHue = 180;
  },
  render: ({ canvas, boundingBox }) => {
    dots = dots.map((dot) => {
      // compute
      const newDot = randomWalk(dot, boundingBox);

      // draw
      let element;
      if (variables.type === "circle") {
        element = canvas.circle(variables.size);
      } else if (variables.type === "rect") {
        element = canvas.rect(variables.size, variables.size);
      }

      // currentHue = randomNumber(currentHue, 5, 0, 360);
      // const color = `hsl(${currentHue}, 50%, 50%)`;
      const color = "#fff";

      element
        .move(newDot.x, newDot.y)
        .fill(color)
        .stroke({ color: "hsl(0, 0%, 0%)", width: 1 });

      return newDot;
    })
  }
}).then(start => start());
