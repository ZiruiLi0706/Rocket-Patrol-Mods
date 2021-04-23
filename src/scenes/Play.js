class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('background', 'assets/background.jpeg');
        this.load.image('xi', 'assets/xi.png');
        this.load.image('fire', 'assets/fire.png');
        this.load.image('fish', 'assets/fish_1_20.png')
        // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', 
    {frameWidth: 64, frameHeight: 32, 
        startFrame: 0, endFrame: 9});
        this.load.audio('backgroundmusic', 'assets/bgm.wav');
    }

    create(){
        
        this.sound.play('backgroundmusic');
        //sound.setLoop(loop);

        this.background = this.add.tileSprite(
            0,0,800,600, 'background'
        ).setOrigin(0,0);

        this.p1Dusk = new Dusk(this, game.config.width/2,
            game.config.height - borderUISize - borderPadding-50,
            'xi');

            // add spaceships (x3)
        this.enemy1 = new Enemy(this, game.config.width + borderUISize*6, 
            borderUISize*4, 'fire', 0, 30).setOrigin(0, 0);

        this.enemy2 = new Enemy(this, game.config.width + borderUISize*3, 
            borderUISize*5 + borderPadding*2, 'fire', 0, 20).setOrigin(0,0);

        this.enemy3 = new Enemy(this, game.config.width, 
            borderUISize*6 + borderPadding*4, 'fire', 0, 10).setOrigin(0,0);

        this.enemy4 = new Enemy(this, game.config.width + borderUISize*7, 
            borderUISize*3, 'fire', 0, 40).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(
            0, borderUISize + borderPadding, 
            game.config.width, borderUISize*2, 0xFFFFFF,
            ).setOrigin(0,0);
            // white borders
	this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
	
    this.add.rectangle(0, game.config.height - borderUISize, 
        game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
	
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
	
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, 
        game.config.height, 0x000000).setOrigin(0 ,0);
    
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
    this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
    frameRate: 30
    });

    // initialize score
    this.p1Score = 0;

    // display score
    let scoreConfig = {
    fontFamily: 'Apple Chancery',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, 
    borderUISize + borderPadding*2, this.p1Score, scoreConfig);

    // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(60000, () => {
    this.add.text(game.config.width/2, game.config.height/2, 
        'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 
        'Press (R) to Restart', scoreConfig).setOrigin(0.5);
    this.gameOver = true;
    }, 
    null, this);

}

    update(){
        
         // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        }
        
        this.background.tilePositionX -= 4;

        //this.checkCollision(this.p1Rocket, this.ship1);
        //this.checkCollision(this.p1Rocket, this.ship2);
        //this.checkCollision(this.p1Rocket, this.ship3);

     // check collisions
        if(this.checkCollision(this.p1Dusk, this.enemy3)) {
        this.p1Dusk.reset();
        this.enemyExplode(this.enemy3);   
    }
        if (this.checkCollision(this.p1Dusk, this.enemy2)) {
        this.p1Dusk.reset();
        this.enemyExplode(this.enemy2);
  }
        if (this.checkCollision(this.p1Dusk, this.enemy1)) {
        this.p1Dusk.reset();
        this.enemyExplode(this.enemy1);

        if (this.checkCollision(this.p1Dusk, this.enemy4)) 
            this.p1Dusk.reset();
            this.enemyExplode(this.enemy4);
  }

        if (!this.gameOver) {               
        this.p1Dusk.update();         // update rocket sprite
        this.enemy1.update();           // update spaceships (x3)
        this.enemy2.update();
        this.enemy3.update();
        this.enemy4.update();
        this.sound.update();
}  

    }
    checkCollision(Dusk, Enemy){
        if(Dusk.x + Dusk.width> Enemy.x && 
            Dusk.x < Enemy.x + Enemy.width && 
            Dusk.y + Dusk.height > Enemy.y && 
            Dusk.y < Enemy.y + Enemy.height){
                //ship.alpha = 0;
                //rocket.reset();
                //ship.reset();
                return true;
            
            }else return false;
        }

        
       
        enemyExplode(enemy) {
            // temporarily hide ship
            enemy.alpha = 0;                         
            // create explosion sprite at ship's position
            let boom = this.add.sprite(enemy.x, enemy.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after ani completes
              enemy.reset();                       // reset ship position
              enemy.alpha = 1;                     // make ship visible again
              boom.destroy();                     // remove explosion sprite
            });
            // score add and repaint
            this.p1Score += enemy.points;
            this.scoreLeft.text = this.p1Score;
            
            this.sound.play('sfx_explosion');
          }
    
}