// these are the green blocks that detect to see if a tile is underneath it
// this will instead detect if the block is solid in the future

export default class TileChecker {
  tileCheckerImage = new Image();
  alternateTileCheckerImage = new Image();
  constructor(
    x,
    y,
    tileMap,
    context,
    camera,
    player,
    direction,
    playerTileCheck
  ) {
    this.player = player;
    this.originalX = x;
    this.originalY = y;
    this.x = this.player.x + this.originalX;
    this.y = this.player.y + this.originalY;
    this.tileMap = tileMap;
    this.tileCheckerImage.src = "sprites/shiftMenu/tileChecker.bmp";
    this.alternateTileCheckerImage.src =
      "sprites/player/playerTileCheckImage.bmp";
    this.context = context;
    this.camera = camera;
    this.playerTileCheck = playerTileCheck;

    this.arrayNum = undefined;

    this.left = true;
    this.right = true;
    this.up = true;
    this.down = true;

    this.direction = direction;
  }

  Check(z, r, array) {
    this.x = this.player.x + this.originalX;
    this.y = this.player.y + this.originalY;
    if (this.player.killLoops === false) {
      for (let q = 0; q < array.length + 1; q++) {
        if (array[q] !== undefined || null) {
          if (
            array[q].x < this.x + 20 &&
            array[q].x + 64 > this.x &&
            array[q].y < this.y + 20 &&
            array[q].y + 64 > this.y
          ) {
            this.arrayNum = q;
            this.context.drawImage(
              this.tileCheckerImage,
              this.x - this.camera.x,
              this.y - this.camera.y
            );

            switch (this.direction) {
              case "up":
                this.up = true;
                break;
              case "down":
                this.down = true;
                break;
              case "left":
                this.left = true;
                break;
              case "right":
                this.right = true;
                break;
            }
          } else {
            switch (this.direction) {
              case "up":
                this.up = false;
                break;
              case "down":
                this.down = false;
                break;
              case "left":
                this.left = false;
                break;
              case "right":
                this.right = false;
                break;
            }
          }
        }
      }
    } else if (this.player.killLoops === true) {
      if (
        array[this.arrayNum].x < this.x + 20 &&
        array[this.arrayNum].x + 64 > this.x &&
        array[this.arrayNum].y < this.y + 20 &&
        array[this.arrayNum].y + 64 > this.y &&
        this.arrayNum !== undefined
      ) {
        switch (this.direction) {
          case "up":
            this.up = true;
            this.playerTileCheck.rememberUp = true;
            break;
          case "down":
            this.down = true;
            this.playerTileCheck.rememberDown = true;
            break;
          case "left":
            this.left = true;
            this.playerTileCheck.rememberLeft = true;
            break;
          case "right":
            this.right = true;
            this.playerTileCheck.rememberRight = true;
            break;
        }
        this.context.drawImage(
          this.tileCheckerImage,
          this.x - this.camera.x,
          this.y - this.camera.y
        );
      } else {
        switch (this.direction) {
          case "up":
            this.up = false;
            this.playerTileCheck.rememberUp = false;
            break;
          case "down":
            this.down = false;
            this.playerTileCheck.rememberDown = false;
            break;
          case "left":
            this.left = false;
            this.playerTileCheck.rememberLeft = false;
            break;
          case "right":
            this.right = false;
            this.playerTileCheck.rememberRight = false;
            break;
        }
        this.context.drawImage(
          this.alternateTileCheckerImage,
          this.x - this.camera.x,
          this.y - this.camera.y
        );
      }
    }
  }

  update() {
    // this.x += this.x
    this.Check(this.x, this.y, this.tileMap.money);
  }
}
