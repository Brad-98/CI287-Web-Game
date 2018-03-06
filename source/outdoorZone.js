var player;
var enemy_elf;
var controls;

var world = {
    map: null,
    groundLayer: null
}; // end of world

function buildWorld(game, world) {
    // Initialise the tilemap
    world.map = game.add.tilemap('groundLevel');
    world.map.addTilesetImage('roguelikeSheet_transparent', 'tileSheet');
    // set up the tilemap layers
    world.groundLayer = world.map.createLayer('groundLayer');
} //buildWorld()   

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/player.png',64,65,77);
        this.game.load.spritesheet('enemy_elf', '../assets/enemy_elf.png',64,69,65);
        this.game.load.image('tileSheet', '../assets/roguelikeSheet_transparent.png');
        this.game.load.tilemap('groundLevel','../assets/test.json', null, Phaser.Tilemap.TILED_JSON);
        
        enemy_elf = function (index, game, x, y) {
            this.enemy_elf = game.add.sprite(x,y,"enemy_elf");
            this.enemy_elf.anchor.setTo(0.5,0.5);
            this.enemy_elf.name = index.toString;
            game.physics.enable(this.enemy_elf,Phaser.Physics.ARCADE);     
};
    },  
    
    create : function()
    {
        buildWorld(game, world);
        //Player Code
        
        this.player = game.add.sprite(400,150,"player");
 
        this.player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],8, false);
        
        this.player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],8, false);
        
        this.player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],12, false);
        
        this.player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],12, false);
        
        this.player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.player);
        
       
        
        
        //Enemy Elf Code
        
        new enemy_elf(0,game,100,100);
        new enemy_elf(0,game,200,100);
    
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
        
        if(controls.up.isDown)
        {
            this.player.animations.play('walkUp');
            this.player.y -=2;
        }
        
        else if(controls.left.isDown)
        {
            this.player.animations.play('walkLeft');
            this.player.x -=2;
        }
        
        else if(controls.down.isDown)
        {
            this.player.animations.play('walkDown');
            this.player.y +=2;
        }
        
        else if(controls.right.isDown)
        {
            this.player.animations.play('walkRight');
            this.player.x +=2;
        }
    },
};