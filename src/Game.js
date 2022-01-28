// THIS IS THE MAIN SCRIPT FOR THE GAME
// EVERYTHING ELSE LOADS AND PLAYS INTO THIS, IT'S WHERE THE MAGIC HAPPENS
import EventManager from "./eventManager.js";
import Camera from "./camera.js";
import TileMap from "./tilemap.js";
import Player from "./player.js";
import TileChecker from "./tileChecker.js";
import PlayerTileCheck from "./playerTileCheck.js";

export default class Game {
  // main game class

  // "static" is a variable type that means it wont ever change
  // while that's pretty useful on top of that in javascript it means it wont
  // be a global variable accessible from everywhere, which is awesome

  // sets the canvas width and height
  static CANVAS_WIDTH = 1280;
  static CANVAS_HEIGHT = 720;

  // this is the constructor that allows you to load in and reference other
  // objects, set default variables, kind of hard to explain but it's
  // sort of like a template that sets up this object before it really
  // starts to work
  // in this case it's literally taking in the entire game API
  // you'll see this a lot
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  // this is the START or begin play command that quickly loads everything
  // and puts it onto the scene
  start() {
    // on begin play

    // you'll see the term "this" a lot, it's a variable you can literally put
    // onto the object itself, it's not just for the constructor although that's
    // ideally where you want it
    // it's kind of like adding a save slot or shelf onto your object
    // specifically, while still global it's nice to have a name you have you to
    // associate it with (referenced in other scripts as
    // Game.canvas.width, Game.fps etc.)

    this.canvas.width = Game.CANVAS_WIDTH;
    this.canvas.height = Game.CANVAS_HEIGHT;

    this.fps = 60;

    this.start = Date.now();

    this.frameDuration = 1000 / this.fps;

    this.lag = 0;

    // this.context.translate shifts the screen over, super complex and dumb,
    // wont be done in
    // a real engine, you could just use their camera which probably
    // does something
    // similar behind the scenes

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

    this.camera = new Camera(0, 0);
    this.map = new TileMap(21, 21, this.canvas);
    this.player = new Player(652, 650, this.camera); //  76,75 for the player

    this.playerTileCheck = new PlayerTileCheck(
      this.player,
      this.canvas,
      this.context,
      this.camera
    );

    this.map.generate();
    this.map.generateBackgroundGrass();
    this.map.generateCoinLayer(this.context, this.camera);

    this.map.setTile(10, 10, TileMap.TILE_GRASS);

    this.tileCheckerTop = new TileChecker(
      0,
      -64,
      this.map,
      this.context,
      this.camera,
      this.player,
      "up",
      this.playerTileCheck
    );
    this.tileCheckerBottom = new TileChecker(
      0,
      64,
      this.map,
      this.context,
      this.camera,
      this.player,
      "down",
      this.playerTileCheck
    );

    this.tileCheckerRight = new TileChecker(
      64,
      0,
      this.map,
      this.context,
      this.camera,
      this.player,
      "right",
      this.playerTileCheck
    );
    this.tileCheckerLeft = new TileChecker(
      -64,
      0,
      this.map,
      this.context,
      this.camera,
      this.player,
      "left",
      this.playerTileCheck
    );
    this.eventManager = new EventManager(
      this.canvas,
      this.context,
      this.camera,
      this.player,
      this.playerTileCheck
    );

    addEventListener("keydown", this.eventManager.onKeyDown);
    addEventListener("keyup", this.eventManager.onKeyUp);

    requestAnimationFrame(this.loop);
  }

  update() {
    this.player.update(this.map);
    this.camera.focus(this.player.x, this.player.y);
    this.playerTileCheck.update(this.player);

    console.log(
      " Up:",
      this.playerTileCheck.rememberUp,
      " Down:",
      this.playerTileCheck.rememberDown,
      " Left:",
      this.playerTileCheck.rememberLeft,
      " Right:",
      this.playerTileCheck.rememberRight
    );
  }

  render(lagOffset) {
    this.map.renderBackground(this.context);
    // render background grass checkerboard tiles
    this.map.renderBackgroundGrassLayer(this.context, this.camera, this.player);
    this.map.renderWallLayer(this.context, this.camera);

    this.map.checkTilesLayer(
      this.playerTileCheck,
      this.playerTileCheck.x,
      this.playerTileCheck.y
    );

    this.map.renderVisualLayer(this.context, this.camera);

    this.player.render(this.context, this.camera);
    this.playerTileCheck.render(this.context);

    this.tileCheckerTop.update();
    this.tileCheckerBottom.update();
    this.tileCheckerRight.update();
    this.tileCheckerLeft.update();
  }

  loop = () => {
    requestAnimationFrame(this.loop);

    this.player.isDown = true;
    let current = Date.now();
    let elapsed = current - this.start;
    this.start = current;

    this.lag += elapsed;

    while (this.lag >= this.frameDuration) {
      this.update();

      this.render();

      this.lag -= this.frameDuration;
    }

    let lagOffset = this.lag / this.frameDuration;
  };
}
