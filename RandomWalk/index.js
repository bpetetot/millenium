import Node from '../utils/node.js';
import { createEngine } from '../utils/engine.js';
import { randomColor, randomWalk } from '../utils/math.js';

let nodes = [];
let currentHue;

const variables = {
  type: 'circle',
  size: 5,
};

createEngine({
  init: ({ gui, boundingBox }) => {
    gui.add(variables, 'type', ['circle', 'rect']);
    gui.add(variables, 'size', 1, 20).step(1);

    nodes.push(new Node(boundingBox.width / 2, boundingBox.height / 2));

    currentHue = 180;
  },
  render: ({ canvas, boundingBox }) => {
    nodes = nodes.map((node) => {
      // compute
      const newNode = randomWalk(node, boundingBox, variables.size);

      // draw
      let element;
      if (variables.type === 'circle') {
        element = canvas.circle(variables.size);
      } else if (variables.type === 'rect') {
        element = canvas.rect(variables.size, variables.size);
      }

      currentHue = randomColor(currentHue, 0, 360, 10);
      const color = `hsl(${currentHue}, 50%, 50%)`;

      element.move(newNode.x, newNode.y).fill(color).stroke({ color: 'hsl(0, 0%, 0%)', width: 1 });

      return newNode;
    });

    return true;
  },
}).then((start) => start());
