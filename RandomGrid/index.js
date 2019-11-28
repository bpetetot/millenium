import { getCanvas } from './canvas.js';

import * as dat from 'https://cdn.pika.dev/dat.gui/^0.7.6';

const rect = {
  width: 100,
  height: 100,
};

const gui = new dat.GUI();
gui.add(rect, 'width', 10, 1000);
gui.add(rect, 'height', 10, 1000);

let canvas;

async function main() {
  canvas = await getCanvas();
  window.requestAnimationFrame(loop);
}

function loop() {
  if (!canvas) return;

  canvas.clear();

  canvas
    .rect(rect.width, rect.height)
    .attr({ fill: '#fff', stroke: '#000', 'stroke-width': '3px' });

  window.requestAnimationFrame(loop);
}

main();
