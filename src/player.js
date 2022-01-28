import TileMap from "./tilemap.js";

export default class Player {

  // builds the player


  // #### MOVEMENT VARIABLES START ####
  // the velocity/implied direction
  dx = 0;
  dy = 0;

  // the direction you chose using the arrow keys
  isUp = false;
  isDown = false;
  isLeft = false;
  isRight = false;

  static ACCELERATION = 1;

  // 0.5 originally
  static DECELERATION = 1;

  // 3 originally
  static MAX_SPEED = 7;
  //#### MOVEMENT VARIABLES END ####


  // #### SHIFT MENU LOGIC START ####
  // this detects if the player is on the floor or not
  isTouchingFloor = false;


  // a check to load the shift menu
  loadShiftHud = false;
  // stops the player moving
  stopPlayerMoving = false;

  // kind of tricky but the tileCheckers are based on loops and this
  // stops them running and then reads information to see
  // if it's a solid / empty tile underneath, should probably be moved to game
  // but that's the main problem with OOP in general
  // you're always playing a kind of variable movement game with abstraction
  killLoops = false;

  // the player inventory, which can only hold 3 at a time, this stores
  // block id's and not the real objects, although it could
  blockInventoryArray = [];
  // #### SHIFT MENU LOGIC END ####




  // #### PLAYER VISUALS START ####
  static WIDTH = 50;
  static HEIGHT = 50;

  shiftMenuImage = new Image();
  playerImage = new Image();

  // #### PLAYER VISUALS END ####


  constructor (x, y, camera) {
    // Defaults to the top-left coordinates (0,0) in the map
    // if nothing is selected

    this.x = x || 0; // x is left/right (negative x = left, positive x = right)
    this.y = y || 0; // y is up/down (negative y = up, positive x = down)

    this.camera = camera; // main player camera

    // the player images have to be loaded in separately
    // might as well do it here... you could probably skip this step in a real
    // engine
    this.playerImage.src = "sprites/player/playerRobot.bmp";
    this.shiftMenuImage.src = "sprites/shiftMenu/shiftMenu.bmp";

  }


  // this is the main update method in the player object/class, it's very
  // important and responsible for updating every method you pick here
  update (map) {

    if(this.stopPlayerMoving === false) {
      this.accelerate();
    }

    this.collide(map);

    this.x += this.dx;
    this.y += this.dy;
  }


  // this adds or subtracts smooth acceleration to the player object
  // allowing you to move
  accelerate () {

    // up subtracts from y
    if (this.isUp) {
      this.dy -= Player.ACCELERATION;

      if (this.dy < -Player.MAX_SPEED) {
        this.dy = -Player.MAX_SPEED;
      }
    } else if (this.dy < 0) {
      this.dy += Player.DECELERATION;

      if (this.dy > 0) {
        this.dy = 0;
      }
    }

    if (this.isDown) {
      this.dy += Player.ACCELERATION;

      if (this.dy > Player.MAX_SPEED) {
        this.dy = Player.MAX_SPEED;
      }
    } else if (this.dy > 0) {
      this.dy -= Player.DECELERATION;

      if (this.dy < 0) {
        this.dy = 0;
      }
    }

    if (this.isLeft) {
      this.dx -= Player.ACCELERATION;

      if (this.dx < -Player.MAX_SPEED) {
        this.dx = -Player.MAX_SPEED;
      }
    } else if (this.dx < 0) {
      this.dx += Player.DECELERATION;

      if (this.dx > 0) {
        this.dx = 0;
      }
    }

    if (this.isRight) {
      this.dx += Player.ACCELERATION;

      if (this.dx > Player.MAX_SPEED) {
        this.dx = Player.MAX_SPEED;
      }
    } else if (this.dx > 0) {
      this.dx -= Player.DECELERATION;

      if (this.dx < 0) {
        this.dx = 0;
      }
    }
  }


  // this part isn't my code, I don't really understand aspects of it yet
  // I have to rewrite it
  collide (map) {
    if (this.dx !== 0) {
      let minRow = map.scaleRow(this.y);
      let maxRow = map.scaleRow(this.y + Player.HEIGHT);
      let minColumn = 0;
      let maxColumn = 0;

      if (this.dx < 0) {
        minColumn = map.scaleColumn(this.x + this.dx);
        maxColumn = map.scaleColumn(this.x);
      } else {
        minColumn = map.scaleColumn(this.x + Player.WIDTH);
        maxColumn = map.scaleColumn(this.x + Player.WIDTH + this.dx);
      }

      loop:
        for (let row = minRow; row <= maxRow; row++) {
          for (let column = minColumn; column <= maxColumn; column++) {
            if (map.isColliding(column, row)) {
              this.x = this.dx < 0
                ? (column + 1) * TileMap.TILE_WIDTH
                : column * TileMap.TILE_WIDTH - Player.WIDTH - 1;

              this.dx = 0;

              break loop
            }
          }
        }
    }

    if (this.dy !== 0) {
      let minColumn = map.scaleColumn(this.x);
      let maxColumn = map.scaleColumn(this.x + Player.WIDTH);
      let minRow = 0;
      let maxRow = 0;

      if (this.dy < 0) {
        minRow = map.scaleRow(this.y + this.dy);
        maxRow = map.scaleRow(this.y);
      } else {
        minRow = map.scaleRow(this.y + Player.HEIGHT);
        maxRow = map.scaleRow(this.y + Player.HEIGHT + this.dy);
      }

      loop:
        for (let row = minRow; row <= maxRow; row++) {
          for (let column = minColumn; column <= maxColumn; column++) {
            if (map.isColliding(column, row)) {
              this.y = this.dy < 0
                ? (row + 1) * TileMap.TILE_HEIGHT
                : row * TileMap.TILE_HEIGHT - Player.HEIGHT - 1
              this.isTouchingFloor = true;
              // console.log(this.isTouchingFloor);
              this.dy = 0.0;

              break loop
            }
          }
        }
    }
  }


  // this draws the shift block menu, it's just easier to keep it in a separate
  // method so there could maybe be associated logic to it in the future
  renderShiftHud(context) {
    context.drawImage(this.shiftMenuImage, this.x - this.camera.x,
      this.y - 90 - this.camera.y);
  }


  // this is responsible for rendering everything related to this onto
  // the screen
  render (context) {

    context.drawImage(this.playerImage, this.x - this.camera.x,
      this.y - this.camera.y);
    if(this.loadShiftHud === true) {
      this.renderShiftHud(context);
    }

  }
}