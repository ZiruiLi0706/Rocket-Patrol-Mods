let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR; 

//Add your own (copyright-free) background music to the Play scene.
//Allow the player to control the Rocket after it's fired, character in my case.
//Used new typography on title screen.
//Create a new scrolling tile sprite for the background.
//Create new artwork for all of the in-game assets (rocket, spaceships, explosion).
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi). 
