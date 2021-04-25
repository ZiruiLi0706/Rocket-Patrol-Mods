class Ink extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, dusk){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.isFiring = false;
        this.dusk = dusk;
        
    }
update(){

    if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
        this.isFiring = true;
        //this.sfxDusk.play(); 
        this.alpha=1;
        }
    if(this.isFiring) {
        this.y -= this.movementSpeed;
        if(this.y <borderUISize*3){
            this.y = game.config.height-borderUISize-borderPadding - 40;
            this.isFiring = false;
            this.alpha = 0;
        }
    } else {
        
        if(keyLEFT.isDown){
            this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown){
            this.x += this.movementSpeed;
        }
        
        // fire button
       

        this.x = Phaser.Math.Clamp(
            this.x, borderUISize + borderPadding, 
            game.config.width-borderUISize-borderPadding)
    }
    
   
}
reset(){
    this.y = game.config.height-borderUISize-borderPadding - 40;
    this.isFiring = false;
}

}


