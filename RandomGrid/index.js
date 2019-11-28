import { getCanvas } from './canvas.js';

console.log('Random grid');

async function main() {
  const canvas = await getCanvas();
  canvas
    .rect(100, 100)
    .attr({ fill: '#fff', stroke: '#000' });
}

main();
