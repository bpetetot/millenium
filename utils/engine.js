import * as dat from '/node_modules/dat.gui/build/dat.gui.module.js';

let canvas;

function getCanvas() {
  return new Promise((resolve) => {
    if (canvas) resolve(canvas);

    SVG.on(document, 'DOMContentLoaded', () => {
      canvas = SVG('root').size(300, 300);

      resolve(canvas);
    });
  });
}

export async function createEngine({ init, render, options = { clear: false } } = {}) {
  const gui = new dat.GUI();
  const canvas = await getCanvas();
  const boundingBox = canvas.node.getBoundingClientRect();

  let isRunning = true;

  if (init) {
    init({
      gui,
      canvas,
      boundingBox,
      isRunning,
      reset: loop,
    });
  }

  // start / stop button
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', () => {
      isRunning = !isRunning;
      if (isRunning) {
        window.requestAnimationFrame(loop);
      }
    });
  }

  // export button
  const exportButton = document.getElementById('export-button');
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      console.log(canvas.svg());
    });
  }

  // reset button
  const resetButton = document.getElementById('reset-button');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      loop();
    });
  }

  function loop() {
    if (!canvas) return;

    if (options.clear) canvas.clear();

    const shouldRun = render({
      gui,
      canvas,
      boundingBox,
      isRunning,
    });

    if (shouldRun && isRunning) {
      window.requestAnimationFrame(loop);
    }
  }

  return () => window.requestAnimationFrame(loop);
}
