var player;
var player_lives;
var player_livesText;
var upgrade_text;
var enemy_elf_up;
var enemy_elf_left;
var enemy_elf_down;
var enemy_elf_right;
var enemy_up;
var enemy_left;
var enemy_down;
var enemy_right;
var elfTween_up;
var elfTween_left;
var elfTween_down;
var elfTween_right;
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
var arrow;
var arrows;
var fireArrow = 0;
var fireArrowTrap = 0;
var merchant;
var merchant2;
var merchant3;
var merchant4;
var merchant5;
var merchant6;
var merchant7;
var merchant8;
var merchant9;
var merchant10;
var merchant11;
var arrowTrap;
var heartOutline;


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
    world_outdoorZone.map.addTilesetImage('tileset_outdoorZone', 'tileSheet');
    world_outdoorZone.map.addTilesetImage('farming_fishing', 'fish&farming');
    world_outdoorZone.map.addTilesetImage('plants', 'plants');
    world_outdoorZone.map.addTilesetImage('stonePath', 'stonePath');
    
    // Tilemap layers
    world_outdoorZone.layer_ground = world_outdoorZone.map.createLayer('layer_Ground');
    world_outdoorZone.layer_walls = world_outdoorZone.map.createLayer('layer_Walls');
    world_outdoorZone.layer_tower = world_outdoorZone.map.createLayer('layer_Tower');
    world_outdoorZone.layer_ground.resizeWorld();
    world_outdoorZone.map.setCollision(13, true, world_outdoorZone.layer_walls);
    world_outdoorZone.map.setCollisionBetween(57, 60, true, world_outdoorZone.layer_walls);
    world_outdoorZone.map.setCollisionBetween(66, 68, true, world_outdoorZone.layer_walls);
    world_outdoorZone.map.setCollisionBetween(75, 78, true, world_outdoorZone.layer_walls);
    world_outdoorZone.map.setCollisionBetween(93, 96, true, world_outdoorZone.layer_walls);
    world_outdoorZone.map.setCollisionBetween(102, 105, true, world_outdoorZone.layer_walls);
    //world_outdoorZone.map.setTileIndexCallback([5, 16], this.gotoTowerLevel, this ,world_outdoorZone.layer_tower);
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
        this.game.load.spritesheet('player', '../assets/playerCharacter.png',64, 64, 80);
        this.game.load.spritesheet('enemy_elf', '../assets/enemyCharacter.png',64, 65, 117);
        this.game.load.spritesheet('coin', '../assets/coins.png', 16, 16, 3);
        this.game.load.spritesheet('fireball', '../assets/fireball.png', 64, 64, 63);
        this.game.load.image('merchant', '../assets/merchant.png');
        this.game.load.image('merchantBack', '../assets/merchant2.png');
        this.game.load.image('merchantDead', '../assets/merchantDead.png');
        this.game.load.image('heart', '../assets/player_heart.png');
        this.game.load.image('heart_upgradeRevive', '../assets/player_heartUpgradeRevive.png');
        this.game.load.image('heart_upgradeExtra', '../assets/player_heartUpgradeExtra.png');
        this.game.load.image('heart_outline', '../assets/player_heartOutline.png');
        this.game.load.image('arrow', '../assets/arrow.png');
        this.game.load.image('arrowTrap', '../assets/tilesets/arrow_trap.png');
        
        this.game.load.tilemap('map','../assets/tilesets/outdoorZone..json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileSheet', '../assets/tilesets/tileset_outdoor.png');
        this.game.load.image('fish&farming', '../assets/tilesets/farming_fishing.png');
        this.game.load.image('plants', '../assets/tilesets/plants.png');
        this.game.load.image('stonePath', '../assets/tilesets/stonePath.png');
        
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
        
        this.towerSprite = this.game.add.sprite(3300, 35, 'towerSprite');
        this.game.physics.enable(this.towerSprite);
        this.towerSprite.scale.setTo(2, 2);
        this.towerSprite.body.setSize(20, 4, 38, 126);
        
        merchant = this.game.add.sprite(1400, 1172, 'merchant');
        var helpText = this.game.add.text(1413, 1150, "Help!", {font: '13px Arial', fill: '#ffffff'});
        merchant2 = this.game.add.sprite(1410, 1737, 'merchantBack');
        merchant3 = this.game.add.sprite(1820, 1860, 'merchant');
        var saveMeText = this.game.add.text(1812, 1840, "Save us Please!", {font: '13px Arial', fill: '#ffffff'});
        merchant4 = this.game.add.sprite(850, 1780, 'merchant');
        var helpTowerText = this.game.add.text(825, 1755, "The Tower Is North East", {font: '13px Arial', fill: '#ffffff'});
        merchant5 = this.game.add.sprite(2237, 1110, 'merchantBack');
        merchant6 = this.game.add.sprite(330, 1200, 'merchant');
        merchant7 = this.game.add.sprite(3144, 367, 'merchantDead');
        merchant8 = this.game.add.sprite(3080, 680, 'merchantDead');
        merchant9 = this.game.add.sprite(2790, 576, 'merchantDead');
        merchant10 = this.game.add.sprite(3675, 900, 'merchantDead');
        merchant11 = this.game.add.sprite(2430, 640, 'merchant');
        var guardText = this.game.add.text(2400, 620, "Watch Out Guards Ahead", {font: '13px Arial', fill: '#ffffff'});
        
        arrowTrap = this.game.add.sprite(3000, 50, 'arrowTrap');
        
        coins = this.game.add.group();
        this.createCoins();
        
        enemy_elf_up = this.game.add.group();
        this.createEnemiesUp();
        
        enemy_elf_left = this.game.add.group();
        this.createEnemiesLeft();
        
        enemy_elf_down = this.game.add.group();
        this.createEnemiesDown();
        
        enemy_elf_right = this.game.add.group();
        this.createEnemiesRight();
        
        fireballs = this.game.add.group();
        fireballs.enableBody = true;
        this.game.physics.arcade.enable(fireballs);
        fireballs.createMultiple(20, 'fireball');
        fireballs.setAll('anchor.x', 0.5);
        fireballs.setAll('anchor.y', 1);
        fireballs.setAll('outOfBoundsKill', true);
        fireballs.setAll('checkWorldBounds', true);
        
        arrows = this.game.add.group();
        arrows.enableBody = true;
        this.game.physics.arcade.enable(arrows);
        arrows.createMultiple(100, 'arrow');
        arrows.setAll('anchor.x', 0.5);
        arrows.setAll('anchor.y', 1);
        arrows.setAll('outOfBoundsKill', true);
        arrows.setAll('checkWorldBounds', true);
        
        //Player Code
        //player = this.game.add.sprite(1770, 2050, 'player');
        player = this.game.add.sprite(3090, 300, 'player')
 
        player.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, false);
        
        player.animations.add('walkDown', [18, 19, 20, 21, 22, 23, 24, 25, 26], 8, false);
        
        player.animations.add('walkLeft', [9, 10, 11, 12, 13, 14, 15, 16, 17], 12, false);
        
        player.animations.add('walkRight', [27, 28, 29, 30, 31, 32, 33, 34, 35], 12, false);
        
        player.animations.add('attackUp', [36, 37, 38, 39, 40, 41, 36], 10, false);
        
        player.animations.add('attackDown', [54, 55, 56, 57, 58, 59, 54], 10, false);
        
        player.animations.add('attackLeft', [45, 46, 47, 48, 49, 50, 45], 10, false);
        
        player.animations.add('attackRight', [63, 64, 65, 66, 67, 68, 63], 10, false);
        
        player.animations.add('death', [72, 73, 74 , 75, 76, 77], 7, false);
        
        player.anchor.setTo(0.5, 0.5);
        
        this.game.physics.enable(player);
        player.body.setSize(28, 48, 18, 8);
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
        coin_image.scale.setTo(1.3, 1.3);
        coin_image.fixedToCamera = true;
        
        player_lives = this.game.add.group();
        player_livesText = this.game.add.text(10 ,15 ,'Lives : ', {font: '30px Arial', fill: '#ffffff'});
        player_livesText.fixedToCamera = true;
        //Spawn player hearts
        for (var i = 0; i < 3; i++) 
        {
            var heart = player_lives.create(118 + (35 * i), 35, 'heart');
            heart.anchor.setTo(0.5, 0.5);
            heart.fixedToCamera = true;
            heartOutline = this.game.add.sprite(118 + (35 * i), 35, 'heart_outline');
            heartOutline.anchor.setTo(0.5, 0.5);
            heartOutline.fixedToCamera = true;
        }
        
        upgrade_text = this.game.add.text(1180 , 15 ,'Upgrades', {font: '20px Arial', fill: '#ffffff'});
        upgrade_text.fixedToCamera = true;
        
        var heart_upgradeExtra;
        heart_upgradeExtra = this.game.add.button(1182, 50, 'heart_upgradeExtra', this.extraHeart, this);
        heart_upgradeExtra.fixedToCamera = true;
        var upgrade_priceHeartExtra;
        upgrade_priceHeartExtra = this.game.add.text(1250 , 56 ,'10', {font: '18px Arial', fill: '#ffffff'});
        upgrade_priceHeartExtra.fixedToCamera = true;
        var coin_imageUpgradeExtra;
        coin_imageUpgradeExtra = this.game.add.sprite(1225, 56, 'coin');
        coin_imageUpgradeExtra.scale.setTo(1.2, 1.2);
        coin_imageUpgradeExtra.fixedToCamera = true;
        
        var heart_upgradeRevive;
        heart_upgradeRevive = this.game.add.button(1182, 100, 'heart_upgradeRevive', this.heartsRevive, this);
        heart_upgradeRevive.fixedToCamera = true;
        var upgrade_priceHeartRevive;
        upgrade_priceHeartRevive = this.game.add.text(1250 , 106 ,'15', {font: '18px Arial', fill: '#ffffff'});
        upgrade_priceHeartRevive.fixedToCamera = true;
        var coin_imageUpgradeRevive;
        coin_imageUpgradeRevive = this.game.add.sprite(1225, 106, 'coin');
        coin_imageUpgradeRevive.scale.setTo(1.2, 1.2);
        coin_imageUpgradeRevive.fixedToCamera = true;
        
        var objective_text = this.game.add.text(10 , 150 ,'Main Objective:\nLocate the Tower', {font: '20px Arial', fill: '#ffffff'});
        objective_text.fixedToCamera = true;
        
        this.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON,0.1, 0.1);
    },
    
    update : function()
    {  
        if(player.alive)
        {
            this.arrowTrapShoot();
            this.game.physics.arcade.collide(player, arrows, this.arrowHitsPlayer);
            this.game.physics.arcade.collide(player, world_outdoorZone.layer_walls);
            this.game.physics.arcade.collide(player, coins, this.collectCoin);
            this.game.physics.arcade.collide(player, this.towerSprite, this.gotoTowerLevel);
            this.game.physics.arcade.collide(fireballs, enemy_elf_down, this.fireballHitEnemyDown);
            this.game.physics.arcade.collide(fireballs, enemy_elf_up, this.fireballHitEnemyUp);
            this.game.physics.arcade.collide(fireballs, enemy_elf_left, this.fireballHitEnemyLeft);
            this.game.physics.arcade.collide(fireballs, enemy_elf_right, this.fireballHitEnemyRight);
            //this.game.physics.arcade.collide(player,enemy1.enemy, this.respawnPlayer);
            
            player.body.velocity.set(0);

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
            
            if(player.y <= enemy_up.y + 500 && player.x <= enemy_up.x + 10)
               {
                   enemy_elf_up.callAll('play', null, 'fireUp');
                   elfTween_up.pause();
               }
            else
               {
                   enemy_elf_up.callAll('play', null, 'walkUp');
                   elfTween_up.resume();
               }
            
            if(player.x <= enemy_left.x + 500 && player.y <= enemy_left.y + 10)
               {
                   enemy_elf_left.callAll('play', null, 'fireLeft');
                   elfTween_left.pause();
               }
            else
               {
                   enemy_elf_left.callAll('play', null, 'walkLeft');
                   elfTween_left.resume();
               }
            
            if(player.y <= enemy_down.y + 500 && player.x <= enemy_down.x + 10)
               {
                   enemy_elf_down.callAll('play', null, 'fireDown');
                   elfTween_down.pause(enemy_elf_down);
                   //enemy_elf_down.callAll(this.shootArrow());
                   this.shootArrow(this);
                   enemy_elf_down.forEach(this.shootArrow, enemy_elf_down);
               }
            else
               {
                   enemy_elf_down.callAll('play', null, 'walkDown');
                   elfTween_down.resume();
               }
            
            if(player.x <= enemy_right.x + 500 && player.y <= enemy_right.y + 10)
               {
                   enemy_elf_right.callAll('play', null, 'fireRight');
                   elfTween_right.pause();
               }
            else
               {
                   enemy_elf_right.callAll('play', null, 'walkRight');
                   elfTween_right.resume();
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
                this.fireball.body.velocity.y = -260;
                this.fireball.body.velocity.x = -260;
                this.fireball.animations.add('fireUpLeft', [8, 9, 10, 11, 12, 13, 14, 15],30,true);
                this.fireball.animations.play('fireUpLeft');
                fireball_castTime = this.game.time.now + 1000; 
            }
            
            else if(this.fireball && facingUp && facingRight)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x + 20, player.y + 32);
                this.fireball.body.velocity.y = -260;
                this.fireball.body.velocity.x = +260;
                this.fireball.animations.add('fireUpRight', [24, 25, 26, 27, 28, 29, 30, 31],30,true);
                this.fireball.animations.play('fireUpRight');
                fireball_castTime = this.game.time.now + 1000; 
            }
           
            else if(this.fireball && facingDown && facingLeft)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x - 20, player.y + 32);
                this.fireball.body.velocity.y = +260;
                this.fireball.body.velocity.x = -260;
                this.fireball.animations.add('fireDownLeft', [56, 57, 58, 59, 60, 61, 62, 63],30,true);
                this.fireball.animations.play('fireDownLeft');
                fireball_castTime = this.game.time.now + 1000; 
            }
           
            else if(this.fireball && facingDown && facingRight)   
            {
                sound_objects.fireball_sound.play();
                this.fireball.reset(player.x + 20, player.y + 32);
                this.fireball.body.velocity.y = +260;
                this.fireball.body.velocity.x = +260;
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
            coin.animations.add('spin', [0, 1, 2, 3], 8, true);
            coin.animations.play('spin');
            coin.anchor.setTo(0.5, 0.5);
        }
            
        for (var x = 1; x < 3; x++)
        {
            coin = coins.create(50 * x, 150, 'coin');
            coin.animations.add('spin', [0, 1, 2, 3], 8,true);
            coin.animations.play('spin');
            coin.anchor.setTo(0.5, 0.5);
        }
        
        for (var x = 0; x < 30; x++)
        {
            coin = coins.create(2600, 150, 'coin');
            coin.animations.add('spin', [0, 1, 2, 3], 8,true);
            coin.animations.play('spin');
            coin.anchor.setTo(0.5, 0.5);
        }
    },
    
    createEnemiesUp : function()
    {
         enemy_elf_up.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_up);
         enemy_up = enemy_elf_up.create(150 , 150, 'enemy_elf');
         enemy_up.anchor.setTo(0.5, 0.5);
         enemy_up.body.setSize(8, 13, 28, 26);
            //this.enemy.name = index.toString;
         enemy_up.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
         enemy_up.animations.add('fireUp', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 9, true);
        
         enemy_up.animations.play('walkUp');
              
            
        elfTween_up = game.add.tween(enemy_up).to({
                y:enemy_up.y - 100
            }, 2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesLeft : function()
    {
         enemy_elf_left.enableBody = true;
         enemy_left = enemy_elf_left.create(100 , 100, 'enemy_elf');
         enemy_left.anchor.setTo(0.5, 0.5);
         enemy_left.body.setSize(8, 13, 28, 26);
            //this.enemy.name = index.toString;
         enemy_left.animations.add('walkLeft', [13, 14, 15, 16, 17, 18, 19, 20], 9, true);
         enemy_left.animations.add('fireLeft', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 9, true);

         enemy_left.animations.play('walkLeft');
         game.physics.arcade.enable(enemy_left,Phaser.Physics.ARCADE);     
            
        elfTween_left = game.add.tween(enemy_left).to({
                x:enemy_left.x-100
            },2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesDown : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        //enemy_down = enemy_elf_down.create(50 , 50, 'enemy_elf');
        
        for (var x = 1; x < 3; x++)
        {
            enemy_down = enemy_elf_down.create(50 * x, 150, 'enemy_elf');     
            enemy_down.anchor.setTo(0.5,0.5);
            enemy_down.body.setSize(8, 13, 28, 26);
            enemy_down.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
            enemy_down.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
            enemy_elf_down.callAll('play',null,'walkDown');
            
        };
        
        //enemy_elf_down.x = 0;
        //enemy_elf_down.y = 0;
            elfTween_down = game.add.tween(enemy_elf_down).to({
                y:enemy_elf_down.y + 100
            }, 2000, 'Linear', true, 0, 100, true);
            
    },
    
    createEnemiesRight : function()
    {
         enemy_elf_right.enableBody = true;
         enemy_right = enemy_elf_right.create(200 , 200, 'enemy_elf');
         enemy_right.anchor.setTo(0.5, 0.5);
         enemy_right.body.setSize(8, 13, 28, 26);
            //this.enemy.name = index.toString;
         enemy_right.animations.add('walkRight', [37, 38, 39, 40, 41, 42, 43, 44], 9, true);
         enemy_right.animations.add('fireRight', [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95], 9, true);
        
         enemy_right.animations.play('walkRight');
         game.physics.arcade.enable(enemy_right,Phaser.Physics.ARCADE);     
            
        elfTween_right = game.add.tween(enemy_right).to({
                x:enemy_right.x + 100
            }, 2000, 'Linear', true, 0, 100, true);
    },
    
    fireballHitEnemyUp : function (fireball, enemy_up)
    {
        fireball.kill();
        enemy_up.kill();
    },
    
    fireballHitEnemyDown : function (fireball, enemy_down)
    {
        fireball.kill();
        enemy_down.kill();
    },

    fireballHitEnemyLeft : function (fireball, enemy_left)
    {
        fireball.kill();
        enemy_left.kill();
    },

    fireballHitEnemyRight : function (fireball, enemy_right)
    {
        fireball.kill();
        enemy_right.kill();
    },
    
    shootArrow : function(enemy_down)
    {
        if(this.game.time.now > fireArrow)
        {
          arrow = arrows.getFirstExists(false);
           if (arrow && enemy_down.alive)
            {
                arrow.reset(enemy_down.x, enemy_down.y);
                arrow.angle = 180;
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrow = this.game.time.now + 2000;
            }
       } 
    },
    
    arrowTrapShoot : function()
    {
        if(this.game.time.now > fireArrowTrap)
        {
          arrow = arrows.getFirstExists(false);
           if (arrow)
            {
                arrow.reset(arrowTrap.x, arrowTrap.y);
                arrow.angle = 90;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                arrow.body.velocity.x = -100;
                fireArrowTrap = this.game.time.now + 2000;
            }
       } 
    },
    
    arrowHitsPlayer : function(player, arrow)
    {
        arrow.kill();
        
        this.player_live = player_lives.getFirstAlive();
        
        if(this.player_live)
        {
            this.player_live.kill();
        }
        
        if(player_lives.countLiving() < 1)
        {
            player.animations.play('death');
        } 
    },
      
    collectCoin : function(player,coin)
    {
        coin.kill();
        coinScore += 1;
        coinScoreText.text = coinScoreString + coinScore;
    },
    
    extraHeart : function()
    {
        if(player_lives.length == 3 && coinScore >= 10)
        {
            coinScore -= 10;
            coinScoreText.text = coinScoreString + coinScore;
            this.heart = player_lives.create(118 + (35 * 3), 35, 'heart');
            this.heart.anchor.setTo(0.5, 0.5);
            this.heart.fixedToCamera = true;
            heartOutline = this.game.add.sprite(118 + (35 * 3), 35, 'heart_outline');
            heartOutline.anchor.setTo(0.5, 0.5);
            heartOutline.fixedToCamera = true;
        }
        
        if(player_lives.length == 4 && coinScore >= 10)
        {
            coinScore -= 10;
            coinScoreText.text = coinScoreString + coinScore;
            this.heart = player_lives.create(118 + (35 * 4), 35, 'heart');
            this.heart.anchor.setTo(0.5, 0.5);
            this.heart.fixedToCamera = true;
            heartOutline = this.game.add.sprite(118 + (35 * 4), 35, 'heart_outline');
            heartOutline.anchor.setTo(0.5, 0.5);
            heartOutline.fixedToCamera = true;
        }
    },
    
    heartsRevive : function()
    {
        if(player_lives.countLiving() < 5 && coinScore >= 15)
        {
            coinScore -= 15;
            coinScoreText.text = coinScoreString + coinScore;
            player_lives.callAll('revive');        
        }
    },
    
    respawnPlayer : function()
    {
        player.reset(300, 300);
    },
    
    gotoTowerLevel : function(player, towerSprite)
    {
        game.state.start('tower_level');
    }, 
};
