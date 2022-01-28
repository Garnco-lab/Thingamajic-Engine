export default class EventManager {
  mouseHeldDown = false;

  constructor(canvas, context, camera, player, cursor) {
    this.canvas = canvas;
    this.context = context;
    this.camera = camera;
    this.player = player;
    this.cursor = cursor;
  }

  // player controls updating, should really be a controller

  onKeyPress = (e) => {
    switch (e.key.toUpperCase()) {
      case "B":
        break;
    }
  };

  onMouseDown = (e) => {
    this.mouseHeldDown = true;
    // this.cursor.isDrawing = true;
    // console.log("yes");
  };

  onMouseUp = (e) => {
    this.mouseHeldDown = false;
    this.cursor.isDrawing = false;
    // console.log("no");
  };

  onKeyDown = (e) => {
    // this.playerMoving = true;

    switch (e.key.toUpperCase()) {
      // case 'W':
      //   this.player.isUp = true;
      //   break;
      case "S":
        this.player.isDown = true;
        break;
      case "A":
        this.player.isLeft = true;
        break;
      case "D":
        this.player.isRight = true;
        break;
      case "SHIFT":
        // maybe the player could smoothly move into shift mode rather than
        // stop immediately
        this.player.dx = 0;

        this.player.stopPlayerMoving = true;
        this.player.killLoops = true;
        break;
    }
  };

  onKeyUp = (e) => {
    switch (e.key.toUpperCase()) {
      case "S":
        this.player.isDown = false;
        break;
      case "A":
        this.player.isLeft = false;
        break;
      case "D":
        this.player.isRight = false;
        break;
      case "SHIFT":
        this.player.stopPlayerMoving = false;
        this.player.loadShiftHud = true;
        this.player.killLoops = false;

        break;
    }
  };
}
