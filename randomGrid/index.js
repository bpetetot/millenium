import { buildSquareGrid, getGridBBox } from '../utils/grid.js';
import Node from '../utils/node.js';
import { createEngine } from '../utils/engine.js';
import { randomColor, randomWalk } from '../utils/math.js';

let nodes = [];
let currentHue;

const parameters = {
  type: 'circle',
  size: 5,
  width: 500,
  height: 500,
};

const options = {
  clear: false,
};

createEngine({
  options,
  init: ({ gui, boundingBox }) => {
    gui.add(parameters, 'type', ['circle', 'rect']);
    gui.add(parameters, 'size', 1, 20).step(1);

    const { type, size, width, height } = parameters;
    nodes = buildSquareGrid(width, height, 50);

    currentHue = 0;
  },
  render: ({ canvas, boundingBox }) => {
    const { type, size, width, height } = parameters;
    const bbox = getGridBBox(width, height, 50);
    const top = (boundingBox.height - height) / 2;
    const left = (boundingBox.width - width) / 2;

    nodes = nodes.map((node) => {
      // compute
      const newNode = randomWalk(node, bbox, size);

      // draw
      let element;
      if (type === 'circle') {
        element = canvas.circle(size);
      } else if (type === 'rect') {
        element = canvas.rect(size, size);
      }

      currentHue = randomColor(currentHue, 0, 100);
      const color = `hsl(0, 0%, ${currentHue}%)`;
      // const color = "#fff";

      element
        .move(left + newNode.x, top + newNode.y)
        .fill(color)
        .stroke({ color, width: 1 });

      return newNode;
    });

    return true;
  },
}).then((start) => start());
