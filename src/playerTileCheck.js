class PlayerTileCheck { // THIS IS THE MAIN OBJECT THAT DETECTS IF THE PLAYER
  // IS ON A TILE OR NOT

  idOfTileUnderThisObject = undefined;
  isTileUnderEmpty = false;
  collisionBottom = false;
  collisionTop = false;
  collisionLeft = false;
  collisionRight = false;
  playerLeft = true;
  playerIsOnTile = false;
  playerCheckImage = new Image();

  rememberLeft = false;
  rememberRight = false;
  rememberUp = false;
  rememberDown = false;

  constructor(player, canvas, context, camera , offset) {
    this.offset = offset || 0
    this.x = player.x + 16 + this.offset;
    this.y = player.y + 16;
    this.topY = player.y + 16 - 64;
    this.bottomY = player.y + 16 + 64;
    this.rightX = player.x + 16 + 64;
    this.leftX = player.x + 16 - 64;

    this.secondX = player.x + 64;
    this.camera = camera;

    this.playerCheckImage.src = "sprites/player/playerTileCheckImage.bmp";
  }

  update(player){
    this.x = player.x + 16 + this.offset ;
    this.y = player.y + 16;
    this.topY = player.y + 16 - 64;
    this.bottomY = player.y + 16 + 64;
    this.rightX = player.x + 16 + 64;
    this.leftX = player.x + 16 - 64;

  }

  render(context) {

    context.drawImage(this.playerCheckImage, this.x - this.camera.x,
      this.y - this.camera.y);

  }
}