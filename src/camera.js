// this is the main camera object that follows the player
// you can think of it similar to a go pro / selfie stick,
// with the numbers being the invisible line

export default class Camera {
  constructor(x, y) {
    // || 0 means that's the default position if you don't put in anything while
    // spawning it into the game world
    this.x = x || 0;
    this.y = y || 0;
  }

  focus(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
}
