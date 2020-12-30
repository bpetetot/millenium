import Node from '../utils/node.js';
import { buildSquareGrid, buildCircleGrid } from '../utils/grid.js';
import { createEngine } from '../utils/engine.js';
import { randomDirection, randomWalk } from '../utils/math.js';

const parameters = {
  type: 'square',
  size: 15,
  width: 500,
  height: 500,
  radius: 400,
  emptyDirections: false,
  strokeWidth: 5,
  strokeColor: '#ff0066',
};

createEngine({
  init: ({ gui, boundingBox, reset }) => {
    gui.add(parameters, 'type', ['circle', 'square']).onFinishChange(reset);
    gui.add(parameters, 'size', 5, 50).step(5).onFinishChange(reset);
    gui.add(parameters, 'width', 100, boundingBox.width).step(10).onFinishChange(reset);
    gui.add(parameters, 'height', 100, boundingBox.height).step(10).onFinishChange(reset);
    gui.add(parameters, 'radius', 100, boundingBox.height).step(10).onFinishChange(reset);
    gui.add(parameters, 'emptyDirections').onFinishChange(reset);
    gui.add(parameters, 'strokeWidth', 5, 50).step(1).onFinishChange(reset);
    gui.addColor(parameters, 'strokeColor').onFinishChange(reset);
  },
  render: ({ canvas, boundingBox }) => {
    const { size, type, width, height, radius, emptyDirections, strokeWidth, strokeColor } = parameters;

    let grid;
    let top;
    let left;

    if (type === 'circle') {
      grid = buildCircleGrid(radius, size);
      top = (boundingBox.height - radius * 2) / 2;
      left = (boundingBox.width - radius * 2) / 2;
    } else {
      grid = buildSquareGrid(width, height, size);
      top = (boundingBox.height - height) / 2;
      left = (boundingBox.width - width) / 2;
    }

    grid.forEach((node) => {
      const dy = randomDirection(!emptyDirections);
      const dx = randomDirection(!emptyDirections);

      if (!dy && !dx) return;

      canvas
        .line(0, 0, dx * size, dy * size)
        .move(left + node.x, top + node.y)
        .stroke({ color: strokeColor, width: strokeWidth, linecap: 'round' });
    });
  },
  options: {
    clear: true,
  },
}).then((start) => start());
