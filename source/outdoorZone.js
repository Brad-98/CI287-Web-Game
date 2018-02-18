var player;
var enemy_elf;
var enemy_elf2;
var enemy_elf3;
var enemy_elf4;
var controls;

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/player.png',64,65,77);
        this.game.load.spritesheet('enemy_elf', '../assets/enemy_elf.png',64,69,66);
    },  
    
    create : function()
    {
        //Player Code
        
        this.player = game.add.sprite(400,150,"player");
 
        this.player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],8, false);
        
        this.player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],8, false);
        
        this.player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],12, false);
        
        this.player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],12, false);
        
        this.player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.player);
        
        //Enemy Elf Code
        
        this.enemy_elf = game.add.sprite(100,180,"enemy_elf");
        
        this.enemy_elf.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],12, true);
        
        this.enemy_elf.animations.add('walkDown', [18,19,20,21,22,23,24,25,26],12, true);
        
        this.enemy_elf.animations.add('walkLeft', [27,28,29,30,31,32,33,34,35],12, true);
        
        this.enemy_elf.animations.add('walkRight', [9,10,11,12,13,14,15,16,17],12, true);
        
        
        
        
        this.enemy_elf2 = game.add.sprite(160,180,"enemy_elf");
        this.enemy_elf2.animations.add('walkDown', [18,19,20,21,22,23,24,25,26],12, true);
        this.enemy_elf3 = game.add.sprite(220,180,"enemy_elf");
        this.enemy_elf3.animations.add('walkLeft', [27,28,29,30,31,32,33,34,35],12, true);
        this.enemy_elf4 = game.add.sprite(280,180,"enemy_elf");
        this.enemy_elf4.animations.add('walkRight', [9,10,11,12,13,14,15,16,17],12, true);
    
        //Player Movement controls
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
        this.enemy_elf.animations.play('walkUp');
        this.enemy_elf2.animations.play('walkDown');
        this.enemy_elf3.animations.play('walkLeft');
        this.enemy_elf4.animations.play('walkRight');
        
        if(controls.up.isDown)
        {
            this.player.animations.play('walkUp');
            this.player.y -=2;
        }
        
        if(controls.left.isDown)
        {
            this.player.animations.play('walkLeft');
            this.player.x -=2;
        }
        
        if(controls.down.isDown)
        {
            this.player.animations.play('walkDown');
            this.player.y +=2;
        }
        
        if(controls.right.isDown)
        {
            this.player.animations.play('walkRight');
            this.player.x +=2;
        }
    },
};