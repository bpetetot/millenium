import Node from "./node.js";

export default class Grid {
  constructor(x, y, size, space) {
    this._size = size;
    this._x = x;
    this._y = y;

    this._grid = new Array(size);
    for (var i = 0; i < size; i++) {
      this._grid[i] = new Array(size);
      for (var j = 0; j < size; j++) {
        this._grid[i][j] = new Node(x + (i * space), y + (j * space));
      }
    }
  }

  toArray() {
    const result = [];
    for (var i = 0; i < this._size; i++) {
      for (var j = 0; j < this._size; j++) {
        result.push(this._grid[i][j]);
      }
    }
    return result;
  }
}
