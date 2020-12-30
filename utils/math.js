import Node from './node.js';

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function randomNumber(min, max) {
  const number = Math.random() * (max - min) + min;
  return Math.round(number);
}

export function randomDirection(excludeZero) {
  if (excludeZero) {
    return Math.random() > 0.5 ? 1 : -1;
  }
  return randomNumber(0, 2) - 1;
}

export function randomColor(base, min, max, step = 1) {
  const dc = step * randomDirection();
  return clamp(base + dc, min, max);
}

export function randomWalk(node, boundingBox, size = 1) {
  const { top, bottom, left, right } = boundingBox;
  const dx = size * randomDirection();
  const dy = size * randomDirection();
  const nx = clamp(node.x + dx, left, right);
  const ny = clamp(node.y + dy, top, bottom);
  return new Node(nx, ny);
}
