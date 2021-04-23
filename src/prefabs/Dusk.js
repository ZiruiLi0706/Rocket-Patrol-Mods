class Dusk extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.isFiring = false;
        
        this.sfxDusk = scene.sound.add('sfx_dusk'); 
    }

    update(){
        
        if(this.isFiring) {
            
            if(this.y <borderUISize*3){
                this.y = game.config.height-borderUISize-borderPadding - 30;
                this.isFiring = false;
            }
        } else {
           
            if(keyLEFT.isDown){
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown){
                this.x += this.movementSpeed;
            }
            
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.isFiring = true;
            } 

            // fire button
            if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxDusk.play();  
            }

            this.x = Phaser.Math.Clamp(
                this.x, borderUISize + borderPadding, 
                game.config.width-borderUISize-borderPadding)
        }
        
       
    }
    reset(){
        this.y = game.config.height-borderUISize-borderPadding - 30;
        this.isFiring = false;
    }
}