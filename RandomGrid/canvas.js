let canvas;

export function getCanvas() {
  return new Promise((resolve) => {
    if (canvas) resolve(canvas);

    SVG.on(document, 'DOMContentLoaded', () => {
      canvas = SVG()
        .addTo('body')
        .size(300, 300);

      resolve(canvas);
    });
  });
}
