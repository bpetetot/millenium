import Node from "./node.js"

export function randomNumber(n, size = 1, min, max) {
  const newN = n + (Math.floor(Math.random() * 3) - 1) * size;
  if (min !== undefined && newN < min) {
    return n;
  }
  if (max !== undefined && newN > max) {
    return n;
  }
  return newN;
}

export function randomWalk(node, boundingBox, size = 1) {
  const { top, bottom, left, right } = boundingBox;
  const newX = randomNumber(node.x, size, left, right);
  const newY = randomNumber(node.y, size, top, bottom);
  return new Node(newX, newY);
}