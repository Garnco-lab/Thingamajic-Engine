// the original tile object that generated, this will be removed

class Tile {
  constructor (color, index) {
    this.color = color || 'black';
    this.index = index || 0;
  }

  isSolid () {
    return this.index !== 0 // 0 is walkable (grass) and 1 is not (wall)
  }
}