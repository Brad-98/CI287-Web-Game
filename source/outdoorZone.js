var player;
var enemy_elf;
var elfTween;
var elfPos;
var controls;
var coins;
var coinScore = 0;
var coinScoreString = '';
var coinScoreText;
var facingUp = true;
var facingLeft = false;
var facingDown = false;
var facingRight = false;

var world_outdoorZone = 
{
    map: null,
    layer_ground: null,
    layer_Tower: null
};

function buildWorld_outdoorZone (game, world) 
{
    // Tilemap
    world_outdoorZone.map = this.game.add.tilemap('map');
    world_outdoorZone.map.addTilesetImage('tileset_outdoorZone','tileSheet');
    
    // Tilemap layers
    world_outdoorZone.layer_ground = world_outdoorZone.map.createLayer('layer_Ground');
    world_outdoorZone.layer_coins = world_outdoorZone.map.createLayer('layer_Tower');
    world_outdoorZone.layer_ground.resizeWorld();
}   

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/playerCharacter.png',64, 64,77);
        this.game.load.spritesheet('enemy_elf', '../assets/enemyCharacter.png',64,64,117);
        this.game.load.spritesheet('coin', '../assets/coins.png',16,16,3);
        
       
        this.game.load.tilemap('map','../assets/tilesets/outdoorZone..json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileSheet', '../assets/tilesets/tileset_outdoor.png');

        enemy_elf = function (index, game, x, y) 
        {
            this.enemy_elf = game.add.sprite(x ,y , "enemy_elf");
            this.enemy_elf.anchor.setTo(0.5,0.5);
            this.enemy_elf.name = index.toString;
            this.enemy_elf.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],9, true);
            this.enemy_elf.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
            this.enemy_elf.animations.play('walkDown');
            game.physics.arcade.enable(enemy_elf);     
            
            elfPos = this.enemy_elf.y;
            
            this.elfTween = game.add.tween(this.enemy_elf).to({
                y:this.enemy_elf.y+100
            },2000,'Linear',true,0,100,true);
            
            if(this.enemy_elf.y+100 > elfPos)
                {
                    this.enemy_elf.animations.play('walkDown');
                }
        };
        
        coins = function (index, game, x, y)
        {
            coins = game.add.sprite(x,y,"coin");
            coins.anchor.setTo(0.5,0.5);
            coins.name = index.toString;
            coins.animations.add('spin', [0,1,2,3],7,true);
            coins.animations.play('spin');
            coins.enableBody = true;
            game.physics.arcade.enable(coins);
        }
    },  
    
    create : function()
    {
        // Initialise the tilemap
        buildWorld_outdoorZone(game, world_outdoorZone);
        
        //world_outdoorZone.map.setTileIndexCallback([0, 100], this.gotoTowerLevel, this ,world_outdoorZone.layer_tower);
        //world_outdoorZone.map.setCollisionBetween(0, 100, true ,world_outdoorZone.layer_tower);
        //world_outdoorZone.map.setTileLocationCallback(2, 0, 1, 1, this.gotoTowerLevel, this, world_outdoorZone.layer_tower);
        //world_outdoorZone.layer_tower.debug = true;
        
        //Player Code
        player = this.game.add.sprite(300,300,"player");
 
        player.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],8, false);
        
        player.animations.add('walkDown', [18,19,20,21,22,23,24,25,26],8, false);
        
        player.animations.add('walkLeft', [9,10,11,12,13,14,15,16,17],12, false);
        
        player.animations.add('walkRight', [27,28,29,30,31,32,33,34,35],12, false);
        
        player.animations.add('attackUp', [36,37,38,39,40,41,36],10, false);
        
        player.animations.add('attackDown', [54,55,56,57,58,59,54],10, false);
        
        player.animations.add('attackLeft', [45,46,47,48,49,50,45],10, false);
        
        player.animations.add('attackRight', [63,64,65,66,67,68,63],10, false);
        
        player.anchor.setTo(0.5,0.5);
       
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
        
        player.body.collideWorldBounds=true;
        
        new enemy_elf(0,this.game,100,100);
        new enemy_elf(0,this.game,200,100);
        new enemy_elf(0,this.game,300,100);
        new enemy_elf(0,this.game,400,100);
        
        new coins(0,this.game,200,200);
    
        controls = 
        {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };
        
        coinScoreString = 'Coins : ';
        coinScoreText = this.game.add.text(30, 30, coinScoreString + coinScore, {font: '40px Arial', fill: '#ffffff'});
        coinScoreText.fixedToCamera = true;
        
        this.game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);
    },
    
    update : function()
    {   
        //this.game.physics.arcade.collide(player, world_outdoorZone.layer_coins); 
        game.physics.arcade.collide(player,coins, this.collectCoin);
        
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
        
        else if(this.game.input.activePointer.leftButton.isDown)
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
      
      collectCoin : function(player,coins)
        {
            coins.kill();
            coinScore +=1;
            coinScoreText.text = "Coins : " + coinScore;
        },
    
    gotoTowerLevel : function()
    {
        this.state.start('tower_level'); 
    },
        
};