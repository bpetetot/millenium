let canvas;

const root = document.getElementById('root')

export function getCanvas() {
  return new Promise((resolve) => {
    if (canvas) resolve(canvas);

    SVG.on(document, 'DOMContentLoaded', () => {
      canvas = SVG()
        .addTo(root)
        .size(300, 300);

      resolve(canvas);
    });
  });
}
