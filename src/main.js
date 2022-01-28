// THIS LOADS THE GAME ONTO THE PAGE

// this isn't really needed but it loads up the game, I like having it separate

// strict mode makes the browser catch errors early and forces the application
// to stop running rather than having it still going
// it doesn't really work, but it's better than nothing
'use strict'
import Game from "./Game.js";
// the browser has a lot of events it can detect automatically, this isn't
// related to the html5 canvas, rather the "document object model" which
// has been here since the late 80's and early 90s,
// this fires off a function when the page is opened loading the game

// that's what the ()=> means, it's just a funny looking way to do a function
// while making sure it doesn't change added in the last major update to this
// programming language (javascript es6)
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');

  const game = new Game(canvas);
  game.start();
})
