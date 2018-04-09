var player;
var player_lives;
var player_livesText;
var upgrade_text;
var enemy_elf;
var enemy;
var elfTween;
//var enemy1;
var controls;
var coins;
var coin;
var coinScore = 0;
var coinScoreString = '';
var coinScoreText;
var facingUp = true;
var facingLeft = false;
var facingDown = false;
var facingRight = false;
var sound_objects = {};
var fireballs;
var fireball_castTime = 0;

var world_outdoorZone = 
{
    map: null,
    layer_ground: null,
    layer_walls: null,
    layer_tower: null
};

function buildWorld_outdoorZone (game, world) 
{
    // Tilemap
    world_outdoorZone.map = this.game.add.tilemap('map');
    world_outdoorZone.map.addTilesetImage('tileset_outdoorZone','tileSheet');
    world_outdoorZone.map.addTilesetImage('farming_fishing','fish&farming');
    world_outdoorZone.map.addTilesetImage('plants','plants');
    
    // Tilemap layers
    world_outdoorZone.layer_ground = world_outdoorZone.map.createLayer('layer_Ground');
    world_outdoorZone.layer_walls = world_outdoorZone.map.createLayer('layer_Walls');
    world_outdoorZone.layer_tower = world_outdoorZone.map.createLayer('layer_Tower');
    world_outdoorZone.layer_ground.resizeWorld();
    //world_outdoorZone.map.setCollisionBetween(5, 7, true, world_outdoorZone.layer_tower);
    //world_outdoorZone.map.setCollisionBetween(14, 16, true, world_outdoorZone.layer_tower);
    world_outdoorZone.map.setTileIndexCallback([5, 16], this.gotoTowerLevel, this ,world_outdoorZone.layer_tower);
    //world_outdoorZone.layer_walls.debug = true;
    
}   

//function checkOverlap (spriteA,spriteB){
 //       var boundsA = spriteA.getBounds();
 //       var boundsB = spriteB.getBounds();
        
 //       return Phaser.Rectangle.intersects(boundsA,boundsB);
 //   }

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/playerCharacter.png',64, 64,77);
        this.game.load.spritesheet('enemy_elf', '../assets/enemyCharacter.png',64,65,117);
        this.game.load.spritesheet('coin', '../assets/coins.png',16,16,3);
        this.game.load.spritesheet('fireball', '../assets/fireball.png',64,64,63);
        this.game.load.image('heart', '../assets/player_heart.png');
        this.game.load.image('heart_upgrade', '../assets/player_heartUpgrade.png');
        
        this.game.load.tilemap('map','../assets/tilesets/outdoorZone..json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileSheet', '../assets/tilesets/tileset_outdoor.png');
        this.game.load.image('fish&farming', '../assets/tilesets/farming_fishing.png');
        this.game.load.image('plants', '../assets/tilesets/plants.png');
        
        this.game.load.audio('levelMusic', '../assets/music/music_outdoorZone.mp3'); 
        this.game.load.audio('fireball_sound', '../assets/music/sound_fireball.mp3'); 

        //enemy_elf = function (index, game, x, y) 
        //{
        //    this.enemy= game.add.sprite(x ,y , "enemy_elf");
        //    this.enemy.anchor.setTo(0.5,0.5);
        //    this.enemy.name = index.toString;
         //   this.enemy.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],9, true);
        //    this.enemy.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        //    this.enemy.animations.play('walkDown');
        //    game.physics.arcade.enable(this.enemy,Phaser.Physics.ARCADE);     
            
        //    this.elfTween = game.add.tween(this.enemy).to({
       //         y:this.enemy.y+100
        //    },2000,'Linear',true,0,100,true);
       // };
        
    },  
    
    create : function()
    {
        // Initialise the tilemap
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        buildWorld_outdoorZone(game, world_outdoorZone);
        sound_objects.fireball_sound = this.game.add.audio('fireball_sound');
        sound_objects.levelMusic = this.game.add.audio('levelMusic');
        sound_objects.levelMusic.loopFull();
        
        this.towerSprite = this.game.add.sprite(3300, 30, 'towerSprite');
        this.towerSprite.scale.setTo(2, 2);
        
        
        coins = this.game.add.group();
        this.createCoins();
        
        enemy_elf = this.game.add.group();
        this.createEnemies();
        
        fireballs = this.game.add.group();
        fireballs.enableBody = true;
        this.game.physics.arcade.enable(fireballs);
        fireballs.createMultiple(50, 'fireball');
        fireballs.setAll('anchor.x', 0.5);
        fireballs.setAll('anchor.y', 1);
        fireballs.setAll('outOfBoundsKill', true);
        fireballs.setAll('checkWorldBounds', true);
        
        //Player Code
        //player = this.game.add.sprite(1770,2050,'player');
        player = this.game.add.sprite(300,300,'player')
 
        player.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],8, false);
        
        player.animations.add('walkDown', [18,19,20,21,22,23,24,25,26],8, false);
        
        player.animations.add('walkLeft', [9,10,11,12,13,14,15,16,17],12, false);
        
        player.animations.add('walkRight', [27,28,29,30,31,32,33,34,35],12, false);
        
        player.animations.add('attackUp', [36,37,38,39,40,41,36],10, false);
        
        player.animations.add('attackDown', [54,55,56,57,58,59,54],10, false);
        
        player.animations.add('attackLeft', [45,46,47,48,49,50,45],10, false);
        
        player.animations.add('attackRight', [63,64,65,66,67,68,63],10, false);
        
        player.anchor.setTo(0.5,0.5);
    
        this.game.physics.enable(player);
        
        player.body.collideWorldBounds=true;
        
        //enemy1 = new enemy_elf(0,this.game,100,100);
        //new enemy_elf(0,this.game,200,100);
        //new enemy_elf(0,this.game,300,100);
        //new enemy_elf(0,this.game,400,100);
        
        //coin1 = new coins(0,this.game,200,200);
    
        controls = 
        {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };
        
        coinScoreString = 'Coins    : ';
        coinScoreText = this.game.add.text(10, 80, coinScoreString + coinScore, {font: '30px Arial', fill: '#ffffff'});
        coinScoreText.fixedToCamera = true;
        var coin_image;
        coin_image = this.game.add.sprite(90, 89, 'coin');
        coin_image.scale.setTo(1.3,1.3);
        coin_image.fixedToCamera = true;
        
        player_lives = this.game.add.group();
        player_livesText = this.game.add.text(10 ,15 ,'Health : ', {font: '30px Arial', fill: '#ffffff'});
        player_livesText.fixedToCamera = true;
        
        //Spawn player hearts
        for (var i = 0; i < 3; i++) 
        {
            var heart = player_lives.create(138 + (35 * i), 35, 'heart');
            heart.anchor.setTo(0.5, 0.5);
            heart.fixedToCamera = true;
        }
        
        upgrade_text = this.game.add.text(1180 , 15 ,'Upgrades', {font: '20px Arial', fill: '#ffffff'});
        upgrade_text.fixedToCamera = true;
        var heart_upgrade;
        heart_upgrade = this.game.add.sprite(1182, 50, 'heart_upgrade');
        heart_upgrade.fixedToCamera = true;
        var upgrade_priceHeart;
        upgrade_priceHeart = this.game.add.text(1250 , 56 ,'10', {font: '18px Arial', fill: '#ffffff'});
        upgrade_priceHeart.fixedToCamera = true;
        var coin_imageUpgrade;
        coin_imageUpgrade = this.game.add.sprite(1225, 56, 'coin');
        coin_imageUpgrade.scale.setTo(1.2,1.2);
        coin_imageUpgrade.fixedToCamera = true;
        
        this.game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);
    },
    
    update : function()
    {   
        if(player.alive)
        {
            this.game.physics.arcade.collide(player, world_outdoorZone.layer_tower);
            this.game.physics.arcade.collide(player,coins, this.collectCoin);
            //this.game.physics.arcade.collide(player,enemy1.enemy, this.respawnPlayer);
            
            player.body.velocity.set(0);

            //if(checkOverlap(player,coin1.coin)){
            //    coin1.coin.kill();
             //   coin1.coin.reset(3000,2000);
             //   this.collectCoin();
           // }

            if(controls.up.isDown && controls.left.isDown)
            {
                player.animations.play('walkLeft');
                player.body.velocity.y = -140;
                player.body.velocity.x = -140;

                facingUp = true;
                facingLeft = true;
                facingDown = false;
                facingRight = false;
            }

            else if(controls.up.isDown && controls.right.isDown)
            {
                player.animations.play('walkRight');
                player.body.velocity.y = -140;
                player.body.velocity.x = 140;

                facingUp = true;
                facingLeft = false;
                facingDown = false;
                facingRight = true;
            }

            else if(controls.down.isDown && controls.left.isDown)
            {
                player.animations.play('walkLeft');
                player.body.velocity.y = 140;
                player.body.velocity.x = -140;

                facingUp = false;
                facingLeft = true;
                facingDown = true;
                facingRight = false;

            }

            else if(controls.down.isDown && controls.right.isDown)
            {
                player.animations.play('walkRight');
                player.body.velocity.y = 140;
                player.body.velocity.x = 140;

                facingUp = false;
                facingLeft = false;
                facingDown = true;
                facingRight = true;

            }

            else if (controls.up.isDown)
            {
                player.animations.play('walkUp');
                player.body.velocity.y = -140;

                facingUp = true;
                facingLeft = false;
                facingDown = false;
                facingRight = false;
            }

            else if(controls.down.isDown)
            {
                player.animations.play('walkDown');
                player.body.velocity.y = 140;

                facingUp = false;
                facingLeft = false;
                facingDown = true;
                facingRight = false;
            }

            else if(controls.left.isDown)
            {
                player.animations.play('walkLeft');
                player.body.velocity.x = -140;

                facingUp = false;
                facingLeft = true;
                facingDown = false;
                facingRight = false;
            }

            else if(controls.right.isDown)
            {
                player.animations.play('walkRight');
                player.body.velocity.x = 140;

                facingUp = false;
                facingLeft = false;
                facingDown = false;
                facingRight = true;
            }

            if(this.game.input.activePointer.leftButton.isDown)
            {
                if(facingUp && facingLeft || facingDown && facingLeft || facingLeft)
                {
                    player.animations.play('attackLeft');
                    this.shootFireball();
                }
                else if(facingUp && facingRight || facingDown && facingRight || facingRight)
                {
                    player.animations.play('attackRight');
                    this.shootFireball();
                }
                else if(facingUp)
                {
                    player.animations.play('attackUp');
                    this.shootFireball();
                }
                else if(facingDown)
                {
                    player.animations.play('attackDown');
                    this.shootFireball();
                }
            }
            
            if(player.y <= enemy.y+100)
               {
                   enemy.animations.play('fireDown');
                   elfTween.pause();
               }
            else
               {
                   enemy.animations.play('walkDown');
                   elfTween.resume();
               }
        }
    },
    
    shootFireball : function()
    {
        if(this.game.time.now > fireball_castTime)
        { 
            this.fireball = fireballs.getFirstExists(false);
            
            if(this.fireball && facingUp && facingLeft)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x - 20, player.y + 32);
                this.fireball.body.velocity.y = -300;
                this.fireball.body.velocity.x = -300;
                this.fireball.animations.add('fireUpLeft', [8, 9, 10, 11, 12, 13, 14, 15],30,true);
                this.fireball.animations.play('fireUpLeft');
                fireball_castTime = this.game.time.now + 1000; 
            }
            
            else if(this.fireball && facingUp && facingRight)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x + 20, player.y + 32);
                this.fireball.body.velocity.y = -300;
                this.fireball.body.velocity.x = +300;
                this.fireball.animations.add('fireUpRight', [24, 25, 26, 27, 28, 29, 30, 31],30,true);
                this.fireball.animations.play('fireUpRight');
                fireball_castTime = this.game.time.now + 1000; 
            }
           
            else if(this.fireball && facingDown && facingLeft)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x - 20, player.y + 32);
                this.fireball.body.velocity.y = +300;
                this.fireball.body.velocity.x = -300;
                this.fireball.animations.add('fireDownLeft', [56, 57, 58, 59, 60, 61, 62, 63],30,true);
                this.fireball.animations.play('fireDownLeft');
                fireball_castTime = this.game.time.now + 1000; 
            }
           
            else if(this.fireball && facingDown && facingRight)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x + 20, player.y + 32);
                this.fireball.body.velocity.y = +300;
                this.fireball.body.velocity.x = +300;
                this.fireball.animations.add('fireDownRight', [40, 41, 42, 43, 44, 45, 46, 47],30,true);
                this.fireball.animations.play('fireDownRight');
                fireball_castTime = this.game.time.now + 1000; 
            }
            
            else if(this.fireball && facingUp)
            {
                sound_objects.fireball_sound.play();    
                this.fireball.reset(player.x, player.y);
                this.fireball.body.velocity.y = -300;
                this.fireball.animations.add('fireUp', [16, 17, 18, 19 ,20 ,21 ,22, 23],30,true);
                this.fireball.animations.play('fireUp');
                fireball_castTime = this.game.time.now + 1000;     
            }
           
            else if(this.fireball && facingLeft)
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x - 32, player.y + 32);
                this.fireball.body.velocity.x = -300;
                this.fireball.animations.add('fireLeft', [0, 1, 2, 3, 4, 5, 6, 7],30,true);
                this.fireball.animations.play('fireLeft');
                fireball_castTime = this.game.time.now + 1000;  
            }
            
            else if(this.fireball && facingDown)
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x, player.y + 64);
                this.fireball.body.velocity.y = +300;
                this.fireball.animations.add('fireDown', [48, 49, 50, 51, 52, 53, 54, 55],30,true);
                this.fireball.animations.play('fireDown');
                fireball_castTime = this.game.time.now + 1000;  
            }
            
            else if(this.fireball && facingRight)
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x + 32, player.y + 32);
                this.fireball.body.velocity.x = +300;
                this.fireball.animations.add('fireRight', [32, 33, 34, 35, 36, 37, 38, 39],30,true);
                this.fireball.animations.play('fireRight');
                fireball_castTime = this.game.time.now + 1000;  
            }    
        }
    },
    
    //resetFireball : function (fireball) 
    //{
    //    fireball.kill();
    //},
    
    createCoins : function()
    {
        coins.enableBody = true;
        this.game.physics.arcade.enable(coins);
        for (var x = 1; x < 3; x++)
        {
            coin = coins.create(50 * x, 50, 'coin');
            coin.animations.add('spin', [0,1,2,3],8,true);
            coin.animations.play('spin');
            coin.anchor.setTo(0.5,0.5);
        }
            
        for (var x = 1; x < 3; x++)
        {
            coin = coins.create(50 * x, 150, 'coin');
            coin.animations.add('spin', [0,1,2,3],8,true);
            coin.animations.play('spin');
            coin.anchor.setTo(0.5,0.5);
        }
    },
    
    createEnemies : function()
    {
         enemy_elf.enableBody = true;
         enemy = enemy_elf.create(50 , 50, 'enemy_elf');
         enemy.anchor.setTo(0.5,0.5);
            //this.enemy.name = index.toString;
         enemy.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],9, true);
         enemy.animations.add('walkLeft', [13,14,15,16,17,18,19,20],9, true);
         enemy.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
         enemy.animations.add('walkRight', [37,38,39,40,41,42,43,44],9, true);
         enemy.animations.add('fireUp', [48,49,50,51,52,53,54,55,56,57,58,59],9, true);
         enemy.animations.add('fireLeft', [60,61,62,63,64,65,66,67,68,69,70,71],9, true);
         enemy.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
         enemy.animations.add('fireRight', [84,85,86,87,88,89,90,91,92,93,94,95],9, true);
        
         enemy.animations.play('walkDown');
         game.physics.arcade.enable(enemy,Phaser.Physics.ARCADE);     
            
        elfTween = game.add.tween(enemy).to({
                y:enemy.y+100
            },2000,'Linear',true,0,100,true);
    },
      
    collectCoin : function(player,coin)
    {
        coin.kill();
        coinScore +=1;
        coinScoreText.text = coinScoreString + coinScore;
    },
    
    respawnPlayer : function()
    {
        player.reset(300,300);
    },
    
    gotoTowerLevel : function()
    {
        this.game.state.start('tower_level');
    },         
};
