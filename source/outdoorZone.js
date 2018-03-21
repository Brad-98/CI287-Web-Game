var player;
var enemy_elf;
var controls;
var coin;
var coinScore = 0;
var coinScoreString = '';
var coinScoreText;
var facingUp = true;
var facingLeft = false;
var facingDown = false;
var facingRight = false;

var world = 
{
    map: null,
    layer: null
}; // end of world

function buildWorld(game, world) 
{
    // Initialise the tilemap
    world.map = this.game.add.tilemap('map', 32, 32);
    world.map.addTilesetImage('tileSheet');
    // set up the tilemap layers
    world.layer = world.map.createLayer(0);
    //world.map.setCollision(7, world.layer);
    world.layer.resizeWorld();
}   

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/player.png',64,65.75,77);
        this.game.load.spritesheet('enemy_elf', '../assets/enemy_elf.png',64,69,77);
        this.game.load.image('coin', '../assets/Coin.png');
        
        this.game.load.image('tileSheet', '../assets/tilesets/tileset_outdoor.png');
        this.game.load.tilemap('map','../assets/tilesets/outdoorZone..csv');

        enemy_elf = function (index, game, x, y) 
        {
            this.enemy_elf = game.add.sprite(x ,y , "enemy_elf");
            this.enemy_elf.anchor.setTo(0.5,0.5);
            this.enemy_elf.name = index.toString;
            this.enemy_elf.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],9, true);
            this.enemy_elf.animations.play('walkUp');
            game.physics.arcade.enable(enemy_elf);     
        };
        
        coin = function (index, game, x, y) 
        {
            this.coin = game.add.sprite(x, y , "coin");
            this.coin.anchor.setTo(0.5,0.5);
            this.coin.name = index.toString;
            game.physics.arcade.enable(coin);     
        };
    },  
    
    create : function()
    {
        buildWorld(game, world);
        
        //7 is the tile in the grass tileset, call the function just to move the player posistion
        world.map.setTileIndexCallback(7, this.resetplayer, this);
        
        //Player Code
        player = this.game.add.sprite(2000,150,"player");
 
        player.animations.add('walkUp', [36,37,38,39,40,41,42,43,44],8, false);
        
        player.animations.add('walkDown', [54,55,56,57,58,59,60,61,62],8, false);
        
        player.animations.add('walkLeft', [45,46,47,48,49,50,51,52,53],12, false);
        
        player.animations.add('walkRight', [63,64,65,66,67,68,69,70,71],12, false);
        
        player.animations.add('attackUp', [0,1,2,3,4,5,6,7,0],10, false);
        
        player.animations.add('attackDown', [18,19,20,21,22,23,24,25,18],10, false);
        
        player.animations.add('attackLeft', [9,10,11,12,13,14,15,16,9],10, false);
        
        player.animations.add('attackRight', [27,28,29,30,31,32,33,34,27],10, false);
        
        player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(player);
        
        new enemy_elf(0,this.game,100,100);
        new enemy_elf(0,this.game,200,100);
        
        new coin(0,this.game,100,500);
        new coin(0,this.game,400,400);
    
        controls = 
        {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };
        
        coinScoreString = 'Coins : ';
        coinScoreText = this.game.add.text(300, 300, coinScoreString + coinScore, {font: '40px Arial', fill: '#ffffff'});
        
        this.game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);
    },
    
    update : function()
    {  
        this.game.physics.arcade.collide(player, world.layer);
        
        if(controls.up.isDown && controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.y -=1.8;
            player.x -=1.8;
            
            facingUp = false;
            facingLeft = true;
            facingDown = false;
            facingRight = false;
        }
       
        else if(controls.up.isDown && controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.y -=1.8;
            player.x +=1.8;
            
            facingUp = false;
            facingLeft = false;
            facingDown = false;
            facingRight = true;
        }
        
        
        else if(controls.down.isDown && controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.y +=1.8;
            player.x -=1.8;
            
            facingUp = false;
            facingLeft = true;
            facingDown = false;
            facingRight = false;
            
        }
        
        else if(controls.down.isDown && controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.y +=1.8;
            player.x +=1.8;
            
            facingUp = false;
            facingLeft = false;
            facingDown = false;
            facingRight = true;
            
        }
        
        else if (controls.up.isDown)
        {
            player.animations.play('walkUp');
            player.y -=2;
            
            facingUp = true;
            facingLeft = false;
            facingDown = false;
            facingRight = false;
        }
        
        else if(controls.down.isDown)
        {
            player.animations.play('walkDown');
            player.y +=2;
            
            facingUp = false;
            facingLeft = false;
            facingDown = true;
            facingRight = false;
        }
        
        else if(controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.x -=2;
            
            facingUp = false;
            facingLeft = true;
            facingDown = false;
            facingRight = false;
        }
        
        else if(controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.x +=2;
            
            facingUp = false;
            facingLeft = false;
            facingDown = false;
            facingRight = true;
        }
        
        else if(this.game.input.activePointer.isDown)
        {
            if(facingUp)
            {
                player.animations.play('attackUp');
            }
            else if(facingLeft)
            {
                player.animations.play('attackLeft');
            }
            else if(facingDown)
            {
                player.animations.play('attackDown');
            }
            else if(facingRight)
            {
                player.animations.play('attackRight');
            }
            
        }
        
        //else
       // {
        //   player.animations.stop();    
        //}  
         
    },
    
    resetplayer : function ()
    {
        player.reset(2000, 150);
    },
};