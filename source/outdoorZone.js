var outdoorZone =
{

    preload : function()
    {
        //Preload the sprites here
        var player;
        var controls;
        var playerSpeed = 150;
        this.game.load.spritesheet('player', '../assets/player.png',64,65,77);
    
    },  
    
    create : function()
    {
        //Create buttons and text here
        this.player=game.add.sprite(100,150,"player");
        
        this.player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],12, true);
        this.player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],12, true);
        this.player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],12, true);
        this.player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],12, true);
        
        this.player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.player);

        
        controls = {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };
    },
    
    update : function()
    {
        //Update stuff
        if(controls.up.isDown){
            this.player.animations.play('walkUp');
            this.player.y -=2;
        }
        if(controls.left.isDown){
            this.player.animations.play('walkLeft');
            this.player.x -=2;
        }
        if(controls.down.isDown){
            this.player.animations.play('walkDown');
            this.player.y +=2;
        }
        if(controls.right.isDown){
            this.player.animations.play('walkRight');
            this.player.x +=2;
        }
    },
};