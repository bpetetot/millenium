export default class Node {
  constructor(x, y, i, j) {
    this._x = x;
    this._y = y;
    this._i = i;
    this._j = j;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x) {
    this._x = x;
  }

  set y(y) {
    this._y = y;
  }
}
