import Grid from "../utils/grid.js";
import Node from "../utils/node.js";
import { createEngine } from "../utils/engine.js";
import { randomNumber, randomWalk } from "../utils/math.js";

let nodes = [];
let currentHue;

const variables = {
  type: "circle",
  size: 1
};

const options = {
  clear: false,
}

createEngine({
  options,
  init: ({ gui, boundingBox }) => {
    gui.add(variables, "type", ["circle", "rect"]);
    gui.add(variables, "size", 1, 20).step(1);

    // nodes.push(new Node(boundingBox.width / 2, boundingBox.height / 2))
    const grid = new Grid(50, 50, 10, 100);
    nodes = grid.toArray();

    currentHue = 0;
  },
  render: ({ canvas, boundingBox }) => {
    nodes = nodes.map(node => {
      // compute
      const newNode = randomWalk(node, boundingBox, variables.size);

      // draw
      let element;
      if (variables.type === "circle") {
        element = canvas.circle(variables.size);
      } else if (variables.type === "rect") {
        element = canvas.rect(variables.size, variables.size);
      }

      currentHue = randomNumber(currentHue, 1, 0, 100);
      const color = `hsl(0, 0%, ${currentHue}%)`;
      // const color = "#fff";

      element
        .move(newNode.x, newNode.y)
        .fill(color)
        .stroke({ color, width: 1 });

      return newNode;
    });
  }
}).then(start => start());
