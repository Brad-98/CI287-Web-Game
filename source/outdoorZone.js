var player;
var enemy_elf;
var controls;

var world = 
{
    map: null,
    dirt_layer: null
}; // end of world

function buildWorld(game, world) 
{
    // Initialise the tilemap
    world.map = game.add.tilemap('NewMap.');
    world.map.addTilesetImage('roguelikeSheet_transparent', 'tileSheet');
    // set up the tilemap layers
    world.groundLayer = world.map.createLayer('dirt_layer');
}   

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/player.png',64,65,77);
        this.game.load.spritesheet('enemy_elf', '../assets/enemy_elf.png',64,69,77);
        this.game.load.image('tileSheet', '../assets/roguelikeSheet_transparent.png');
        this.game.load.tilemap('NewMap.','../assets/NewMap..json', null, Phaser.Tilemap.TILED_JSON);

        enemy_elf = function (index, game, x, y) 
        {
            this.enemy_elf = game.add.sprite(x,y,"enemy_elf");
            this.enemy_elf.anchor.setTo(0.5,0.5);
            this.enemy_elf.name = index.toString;
            this.enemy_elf.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],9, true);
            this.enemy_elf.animations.play('walkUp');
            game.physics.enable(this.enemy_elf,Phaser.Physics.ARCADE);     
        };
    },  
    
    create : function()
    {
        buildWorld(game, world);
        this.game.world.setBounds(0,0,3840,2160);
        //Player Code
        
        player = this.game.add.sprite(400,150,"player");
 
        player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],8, false);
        
        player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],8, false);
        
        player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],12, false);
        
        player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],12, false);
        
        player.anchor.setTo(0.5,0.5);
        //this.game.physics.arcade.enable(this.player);
        //this.game.physics.p2.enable(this.player);
        
        new enemy_elf(0,game,100,100);
        new enemy_elf(0,game,200,100);
    
        controls = 
        {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };
        this.game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);
    },
    
    update : function()
    { 
        
        if(controls.up.isDown && controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.y -=1.8;
            player.x -=1.8;
        }
       
        else if(controls.up.isDown && controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.y -=1.8;
            player.x +=1.8;
        }
        
        else if (controls.up.isDown)
        {
            player.animations.play('walkUp');
            player.y -=2;
        }
        
        else if(controls.down.isDown && controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.y +=1.8;
            player.x -=1.8;
        }
        
        else if(controls.down.isDown && controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.y +=1.8;
            player.x +=1.8;
        }
        
        else if(controls.down.isDown)
        {
            player.animations.play('walkDown');
            player.y +=2;
            this.game.camera.y +=4;
        }
        
        else if(controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.x -=2;
        }
        
        else if(controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.x +=2;
        }
    },
};