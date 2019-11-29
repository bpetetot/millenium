import { getCanvas } from "./canvas.js";

import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";

export async function createEngine({ init, render, options } = {}) {
  const {  } = options || {};
  const gui = new dat.GUI();
  const canvas = await getCanvas();
  const boundingBox = canvas.node.getBoundingClientRect();

  let isRunning = true;

  init({
    gui,
    canvas,
    boundingBox,
    isRunning,
  });

  // start / stop button
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    isRunning = !isRunning;
    if (isRunning) {
      window.requestAnimationFrame(loop);
    }
  });

  // export button
  const exportButton = document.getElementById("export-button");
  exportButton.addEventListener("click", () => {
    console.log(canvas.svg());
  });

  function loop() {
    if (!canvas) return;

    // canvas.clear();

    render({
      gui,
      canvas,
      boundingBox,
      isRunning,
    });

    if (isRunning) {
      window.requestAnimationFrame(loop);
    }
  }

  return () => window.requestAnimationFrame(loop);
}
