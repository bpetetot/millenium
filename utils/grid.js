import Node from './node.js';

export function buildSquareGrid(width, height, size) {
  const horizontalDotX = Math.round(width / size);
  const horizontalDotY = Math.round(height / size);

  const grid = [];

  for (var i = 0; i < horizontalDotX; i++) {
    for (var j = 0; j < horizontalDotY; j++) {
      grid.push(new Node(i * size, j * size, i, j));
    }
  }

  return grid;
}

export function buildCircleGrid(radius, size) {
  const nodesCount = Math.round((radius * 2) / size);

  const grid = [];

  for (var i = 0; i < nodesCount; i++) {
    for (var j = 0; j < nodesCount; j++) {
      let dx = radius - i * size;
      let dy = radius - j * size;
      let ds = dx * dx + dy * dy;
      if (ds <= radius * radius) {
        grid.push(new Node(i * size, j * size, i, j));
      }
    }
  }

  return grid;
}

export function getGridBBox(width, height, size) {
  return {
    left: 0,
    top: 0,
    right: width,
    bottom: height,
  };
}
