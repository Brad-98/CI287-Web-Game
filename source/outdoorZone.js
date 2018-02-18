var player;
var controls;
<<<<<<< HEAD

=======
>>>>>>> 422661ecce5e9dfb3e111b89c27e8e7ff651ff25
var outdoorZone =
{
    preload : function()
    {
<<<<<<< HEAD
=======
        //Preload the sprites here

>>>>>>> 422661ecce5e9dfb3e111b89c27e8e7ff651ff25
        this.game.load.spritesheet('player', '../assets/player.png',64,65,77);
    },  
    
    create : function()
    {
        this.player = game.add.sprite(100,150,"player");
        
<<<<<<< HEAD
        this.player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],12, true);
        //this.player.sprite.add('walkUpIdle', [1],12, true);
        
        this.player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],12, true);
        //this.player.sprite.add('walkDownIdle', [17],12, true);
        
        this.player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],12, true);
        //this.player.sprite.add('walkLeftIdle', [42],12, true);
        
        this.player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],12, true);
        //this.player.sprite.add('walkRightIdle', [25],12, true);
=======
        this.player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],10, true);
        this.player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],10, true);
        this.player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],10, true);
        this.player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],10, true);
>>>>>>> 422661ecce5e9dfb3e111b89c27e8e7ff651ff25
        
        this.player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.player);

        controls = 
        {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };
    },
    
    update : function()
    {
        if(controls.up.isDown){
            this.player.animations.play('walkUp');
            this.player.y -=2;
        }
<<<<<<< HEAD
        else
        {
           // this.player.sprite('walkUpIdle');
        }
        
        if(controls.left.isDown){
            this.player.animations.play('walkLeft');
            this.player.x -=2;
        }
        else
        {
          //  this.player.sprite('walkLeftIdle');
        }
        
        if(controls.down.isDown){
            this.player.animations.play('walkDown');
            this.player.y +=2;
        }
        else
        {
         //   this.player.sprite('walkDownIdle');
        }
        
        if(controls.right.isDown){
=======
        else if(controls.left.isDown){
            this.player.animations.play('walkLeft');
            this.player.x -=2;
        }
        else if(controls.down.isDown){
            this.player.animations.play('walkDown');
            this.player.y +=2;
        }
        else if(controls.right.isDown){
>>>>>>> 422661ecce5e9dfb3e111b89c27e8e7ff651ff25
            this.player.animations.play('walkRight');
            this.player.x +=2;
        }
        else
        {
         //   this.player.sprite('walkRightIdle');
        }
    },
};