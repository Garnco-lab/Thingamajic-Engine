// this is my custom tile block, that can detect if the player is in the scene
// holds a special "id" tag for information, and is used during the shift
// command to make sure that it's always in a position that's aligned

export default class TileBlock {

  // this is a special id name given by the entity manager
  id=undefined;

  changeColor = false;

  solid = true;

  static WIDTH = 64;
  static HEIGHT = 64;
  static ACCELERATION = 1;
  static DECELERATION = 0.5;
  static MAX_SPEED = 7;

  constructor(x, y, canvas) {
    this.x = x || 0;
    this.y = y || 0;
    this.canvas = canvas;
  }



  // might be a risky implementation not sure
  detectObjectsOverThisTile(playerTileCheck, x, y) {
    if (
      this.x < x + 20 &&
      this.x + 64 > x &&
      this.y < y + 20 &&
      this.y + 64 > y && playerTileCheck.playerLeft === true) {
      this.changeColor = true;
      playerTileCheck.idOfTileUnderThisObject = this.id;
      playerTileCheck.playerLeft = false
    }
    else {
      this.changeColor = false;
      playerTileCheck.playerLeft = true;
    }



  }


  render (context, camera) {
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    if(this.changeColor === false) {
      context.fillStyle = 'yellow';
    }
    else if (this.changeColor === true) {
      context.fillStyle = 'red';
    }

    context.beginPath();


    context.rect(this.x - camera.x, this.y - camera.y, TileBlock.WIDTH,
      TileBlock.HEIGHT);

    context.fill();
    context.stroke();

  }
}