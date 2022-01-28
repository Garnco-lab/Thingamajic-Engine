import Tile from "./tile.js";
import TileBlock from "./tileBlock.js";

export default class TileMap {
  // containers
  backgroundGrassTiles = [];
  tiles = [];
  money = [];

  grassSwitch = false;

  // can create image bank in the future or associate it with the tiles

  // tile collections can eventually be a loaded file
  image_0 = new Image();
  image_1 = new Image();
  image_2 = new Image();

  static TILE_GRASS = new Tile("#00AA00FF", 0);
  static TILE_ALT_GRASS = new Tile("#504050", 1);

  static TILE_WALL = new Tile("#555555FF", 2);

  // street / sidewalk

  static TILE_WIDTH = 64;
  static TILE_HEIGHT = 64;
  static INVERTED_TILE_WIDTH = 1 / TileMap.TILE_WIDTH;
  static INVERTED_TILE_HEIGHT = 1 / TileMap.TILE_HEIGHT;
  checkerLast = false;

  constructor(columns, rows, canvas) {
    this.columns = columns || 1;
    this.rows = rows || 1;
    this.character = new Image();
    // this.character.src = "sprites/sword.png";
    this.mask = new Image();
    // this.mask.src = "sprites/sword_mask.bmp";
    this.canvas = canvas;

    this.image_0.src = "sprites/background/blueBlockBackground.bmp";
    this.image_1.src = "sprites/background/blockBackground.bmp";
    this.image_2.src = "sprites/blocks/box1.bmp";
  }

  generate() {
    // this.character = new Image();
    // Loop between second and second to last rows
    for (let row = 1; row < this.rows - 1; row++) {
      this.tiles[row] = [];

      // Loop between second and second to last columns
      for (let column = 1; column < this.columns - 1; column++) {
        this.tiles[row][column] =
          Math.random() < 0.2
            ? TileMap.TILE_WALL // 20% chance wall
            : TileMap.TILE_GRASS; // 80% chance grass
      }

      // Fill in first and last columns of each row with walls
      // Remember, this only applies to second and second to last rows
      this.tiles[row][0] = TileMap.TILE_WALL;
      this.tiles[row][this.columns - 1] = TileMap.TILE_WALL;
    }

    this.tiles[0] = []; // first row
    this.tiles[this.rows - 1] = []; // last row

    // Fill in each column of the first and last rows with walls
    for (let column = 0; column < this.columns; column++) {
      this.tiles[0][column] = TileMap.TILE_WALL;
      this.tiles[this.rows - 1][column] = TileMap.TILE_WALL;
    }

    // console.log(this.tiles[1][1]);
  }

  generateBackgroundGrass() {
    for (let row = 0; row < this.rows; row++) {
      // this.tiles[row] = [];
      this.backgroundGrassTiles[row] = [];

      // Loop between second and second to last columns
      for (let column = 0; column < this.columns; column++) {
        // convert to switch case
        switch (this.grassSwitch) {
          case false:
            this.backgroundGrassTiles[row][column] = TileMap.TILE_GRASS;
            this.grassSwitch = true;
            break;
          case true:
            this.backgroundGrassTiles[row][column] = TileMap.TILE_ALT_GRASS;
            this.grassSwitch = false;
            break;
          default:
            console.log("loading grass failed");
            break;
        }
      }
    }

    // console.log(this.backgroundGrassTiles);
  }

  setTile(row, column, tile) {
    this.tiles[row][column] = tile;
  }

  scaleColumn(column) {
    return Math.trunc(column * TileMap.INVERTED_TILE_WIDTH); // same as | 0
  }

  scaleRow(row) {
    return Math.trunc(row * TileMap.INVERTED_TILE_HEIGHT); // same as | 0
  }

  isColliding(column, row) {
    return (
      column > -1 &&
      column < this.columns &&
      row > -1 &&
      row < this.rows &&
      this.tiles[row][column].isSolid()
    );
  }

  // ########## RENDER ############
  render(context, camera) {
    // Render each tile in every row/column
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        // grab tile location and check to see what it is
        const tile = this.tiles[row][column];
        // Convert from map to canvas coordinates
        const x = column * TileMap.TILE_WIDTH - camera.x;
        const y = row * TileMap.TILE_HEIGHT - camera.y;

        // takes in style depending on what number tile.color is. will soon be
        // a picture
        context.fillStyle = tile.color;

        // change draw condition based on which tile it is
        // this is for the logic grid wont be used in the future..

        switch (tile.color) {
          case "#00AA00FF":
            context.fillRect(
              x,
              y,
              TileMap.TILE_WIDTH - 1,
              TileMap.TILE_HEIGHT - 1
            );
            break;
          default:
            // context.fillStyle = "#00AA00FF"
            // context.fillRect(x, y, TileMap.TILE_WIDTH - 1,
            // TileMap.TILE_HEIGHT - 1);
            break;
        }
        // Subtracting 1 provides for a visual square grid
      }
    }
  }

  renderBackgroundGrassLayer(context, camera, player) {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const tile = this.backgroundGrassTiles[row][column];

        const x = column * TileMap.TILE_WIDTH - camera.x;
        const y = row * TileMap.TILE_HEIGHT - camera.y;

        switch (tile.index) {
          case 0:
            context.drawImage(this.image_0, x, y, 63, 63);
            break;
          case 1:
            context.drawImage(this.image_1, x, y, 63, 63);
            break;
          default:
            console.log("broken grass rendering");
            break;
        }
      }
    }
  }

  generateCoinLayer(context, camera) {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const tile = this.tiles[row][column];

        const x = column * TileMap.TILE_WIDTH - camera.x;
        const y = row * TileMap.TILE_HEIGHT - camera.y;

        // context.fillStyle = tile.color;

        // let character = new Image();
        // character.src = "sprites/sword.png"

        switch (tile.color) {
          case "#00AA00FF":
            let coin = new TileBlock(x, y, this.canvas);
            coin.id = "tileBlock:_" + this.money.length;
            this.money.push(coin);

            break;
          default:
            break;
        }
        // future render loop
      }
    }
  }

  // thankfully this can just be copied and reused

  renderWallLayer(wallContext, camera) {
    // Render each tile in every row/column
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        // grab tile location and check to see what it is
        const tile = this.tiles[row][column];
        // Convert from map to canvas coordinates
        const x = column * TileMap.TILE_WIDTH - camera.x;
        const y = row * TileMap.TILE_HEIGHT - camera.y;

        // takes in style depending on what number tile.color is. will soon be
        // a picture
        // context.fillStyle = tile.color;

        // change draw condition based on which tile it is
        // this is for the logic grid wont be used in the future..

        if (tile.index === 2) {
          wallContext.drawImage(this.image_2, x, y);
          // wallContext.clearRect(0, 0, wallContext.width, wallContext.height);
        }
        // Subtracting 1 provides for a visual square grid
      }
    }
  }

  renderBackground(context) {
    context.fillStyle = "gray";
    context.fillRect(
      -this.canvas.width / 2,
      -this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height
    );
  }

  renderVisualLayer(context, camera) {
    for (let x = 0; x < this.money.length + 1; x++) {
      if (this.money[x] !== undefined || null) {
        // this.money[x].pickUpCoin(player2, player2.x + 64, player2.y);
        this.money[x].render(context, camera);
      }
    }
  }

  checkTilesLayer(player, x, z) {
    for (let y = 0; y < this.money.length + 1; y++) {
      if (this.money[y] !== undefined || null) {
        this.money[y].detectObjectsOverThisTile(player, x, z);
      }
    }
  }
}
