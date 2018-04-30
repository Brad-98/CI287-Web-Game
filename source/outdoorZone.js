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
var fireArrowUp = 0;
var fireArrowLeft = 0;
var fireArrowDown = 0;
var fireArrowRight = 0;
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
var heartOutline;
var explosionAnimation;

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
    //world_outdoorZone.layer_walls.debug = true; 
}   

var outdoorZone =
{
    preload : function()
    {
        this.game.load.spritesheet('player', '../assets/playerCharacter.png',64, 64, 80);
        this.game.load.spritesheet('enemy_elf', '../assets/enemyCharacter.png',64, 65, 117);
        this.game.load.spritesheet('coin', '../assets/coins.png', 16, 16, 3);
        this.game.load.spritesheet('fireball', '../assets/fireball.png', 64, 64, 63);
        this.game.load.spritesheet('fireballExplosion', '../assets/fireballExplosion.png', 128, 128);
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
        this.game.load.audio('coin_sound', '../assets/music/sound_coin.wav'); 
        this.game.load.audio('playerHit_sound', '../assets/music/sound_playerHit.mp3');
        this.game.load.audio('playerDead_sound', '../assets/music/sound_playerDead.mp3');
        this.game.load.audio('enemyHit_sound', '../assets/music/sound_enemyHit.wav');

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
        sound_objects.coin_sound = this.game.add.audio('coin_sound');
        sound_objects.playerHit_sound = this.game.add.audio('playerHit_sound');
        sound_objects.playerDead_sound = this.game.add.audio('playerDead_sound');
        sound_objects.enemyHit_sound = this.game.add.audio('enemyHit_sound');
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
        
        coins = this.game.add.group();
        this.createCoins();
        
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
        
        explosionAnimation = this.game.add.group();
        explosionAnimation.createMultiple(5, 'fireballExplosion');
        explosionAnimation.forEach(this.addExplosionToEnemies, this);
        
        arrows = this.game.add.group();
        arrows.enableBody = true;
        this.game.physics.arcade.enable(arrows);
        arrows.createMultiple(100, 'arrow');
        arrows.setAll('anchor.x', 0.5);
        arrows.setAll('anchor.y', 1);
        arrows.setAll('outOfBoundsKill', true);
        arrows.setAll('checkWorldBounds', true);
        
        //Player Code
        player = this.game.add.sprite(3390, 360, 'player');
 
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
        upgrade_priceHeartExtra = this.game.add.text(1250 , 56 ,'7', {font: '18px Arial', fill: '#ffffff'});
        upgrade_priceHeartExtra.fixedToCamera = true;
        var coin_imageUpgradeExtra;
        coin_imageUpgradeExtra = this.game.add.sprite(1225, 56, 'coin');
        coin_imageUpgradeExtra.scale.setTo(1.2, 1.2);
        coin_imageUpgradeExtra.fixedToCamera = true;
        
        var heart_upgradeRevive;
        heart_upgradeRevive = this.game.add.button(1182, 100, 'heart_upgradeRevive', this.heartsRevive, this);
        heart_upgradeRevive.fixedToCamera = true;
        var upgrade_priceHeartRevive;
        upgrade_priceHeartRevive = this.game.add.text(1250 , 106 ,'10', {font: '18px Arial', fill: '#ffffff'});
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
        this.game.physics.arcade.collide(player, arrows, this.arrowHitsPlayer);
        this.game.physics.arcade.collide(player, world_outdoorZone.layer_walls);
        this.game.physics.arcade.collide(player, coins, this.collectCoin);
        this.game.physics.arcade.collide(player, this.towerSprite, this.gotoTowerLevel);
        this.game.physics.arcade.collide(fireballs, enemy_elf_down, this.fireballHitEnemyDown);
        this.game.physics.arcade.collide(fireballs, enemy_elf_up, this.fireballHitEnemyUp);
        this.game.physics.arcade.collide(fireballs, enemy_elf_left, this.fireballHitEnemyLeft);
        this.game.physics.arcade.collide(fireballs, enemy_elf_right, this.fireballHitEnemyRight);

        if(player_lives.countLiving() < 1)
        {
            game.time.events.add(3000, this.respawnPlayer, this.player);
        }

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
        
        if(player.x <= enemy_left.x + 5 && player.x >= enemy_left.x - 500 && player.y <= enemy_left.y + 100 && player.y >= enemy_left.y - 100)
           {
               enemy_elf_left.callAll('play', null, 'fireLeft');
               elfTween_left.pause();
               enemy_elf_left.forEach(this.shootArrowLeft, enemy_elf_left);
           }
        
        else
           {
               enemy_elf_left.callAll('play', null, 'walkLeft');
               elfTween_left.resume();
           }
        if(player.y <= enemy_down.y + 500 && player.y >= enemy_down.y - 5 && player.x <= enemy_down.x + 100 && player.x >= enemy_down.x - 100)
           {
               enemy_elf_down.callAll('play', null, 'fireDown');
               elfTween_down.pause(enemy_elf_down);
               //enemy_elf_down.callAll(this.shootArrow());
               //this.shootArrowDown(this);
               enemy_elf_down.forEach(this.shootArrowDown, enemy_elf_down);
           }
        
        else
           {
               enemy_elf_down.callAll('play', null, 'walkDown');
               elfTween_down.resume();
           }

        if(player.x <= enemy_right.x + 500 && player.x >= enemy_right.x - 5 && player.y <= enemy_right.y + 100 && player.y >= enemy_right.y - 100)
           {
               enemy_elf_right.callAll('play', null, 'fireRight');
               elfTween_right.pause();
               enemy_elf_right.forEach(this.shootArrowRight, enemy_elf_right);
           }
        
        else
           {
               enemy_elf_right.callAll('play', null, 'walkRight');
               elfTween_right.resume();
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
    
    createCoins : function()
    {
        coins.enableBody = true;
        this.game.physics.arcade.enable(coins);
        for (var x = 1; x < 3; x++)
        {
            coin = coins.create(2900 + (x + 50), 300, 'coin');
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
    },
    
    createEnemiesLeft : function()
    {
         enemy_elf_left.enableBody = true;
         enemy_left = enemy_elf_left.create(3500 , 400, 'enemy_elf');
         enemy_left.anchor.setTo(0.5, 0.5);
         enemy_left.body.setSize(8, 13, 28, 26);
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
        
        //for (var x = 1; x < 2; x++)
        //{
            enemy_down = enemy_elf_down.create(3400, 400, 'enemy_elf');     
            enemy_down.anchor.setTo(0.5,0.5);
            enemy_down.body.setSize(8, 13, 28, 26);
            enemy_down.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
            enemy_down.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
            enemy_elf_down.callAll('play',null,'walkDown');
            
        //};
        
        //enemy_elf_down.x = 0;
        //enemy_elf_down.y = 0;
            elfTween_down = game.add.tween(enemy_down).to({
                y:enemy_down.y + 100
            }, 2000, 'Linear', true, 0, 100, true);   
    },
    
    createEnemiesRight : function()
    {
         enemy_elf_right.enableBody = true;
         enemy_right = enemy_elf_right.create(3300 , 500, 'enemy_elf');
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
    
    addExplosionToEnemies : function(enemy_elf)
    {
        enemy_elf.animations.add('fireballExplosion');
    },
    
    fireballHitEnemyUp : function (fireball, enemy_up)
    {
        sound_objects.enemyHit_sound.play();
        fireball.kill();
        enemy_up.kill();
    },
    
    fireballHitEnemyDown : function (fireball, enemy_down)
    {
        sound_objects.enemyHit_sound.play();
        fireball.kill();
        enemy_down.kill();
        
        var explosion = explosionAnimation.getFirstExists(false);
        explosion.reset(enemy_down.body.x - 55, enemy_down.body.y - 47);
        explosion.play('fireballExplosion', 20, false, true);
    },

    fireballHitEnemyLeft : function (fireball, enemy_left)
    {
        sound_objects.enemyHit_sound.play();
        fireball.kill();
        enemy_left.kill();
        
        var explosion = explosionAnimation.getFirstExists(false);
        explosion.reset(enemy_left.body.x - 55, enemy_left.body.y - 47);
        explosion.play('fireballExplosion', 20, false, true);
    },

    fireballHitEnemyRight : function (fireball, enemy_right)
    {
        sound_objects.enemyHit_sound.play();
        fireball.kill();
        enemy_right.kill();
        
        var explosion = explosionAnimation.getFirstExists(false);
        explosion.reset(enemy_right.body.x - 55, enemy_right.body.y - 47);
        explosion.play('fireballExplosion', 20, false, true);
        
        
    },
    
    shootArrowLeft : function(enemy_left)
    {
        if(this.game.time.now > fireArrowLeft)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_left.alive)
            {
                arrow.reset(enemy_left.x, enemy_left.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowLeft = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowDown : function(enemy_down)
    {
        if(this.game.time.now > fireArrowDown)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_down.alive)
            {
                arrow.reset(enemy_down.x, enemy_down.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowDown = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowRight : function(enemy_right)
    {
        if(this.game.time.now > fireArrowRight)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_right.alive)
            {
                arrow.reset(enemy_right.x, enemy_right.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowRight = this.game.time.now + 2000;
            }
       } 
    },
    
    arrowHitsPlayer : function(player, arrow)
    {
        arrow.kill();
        sound_objects.playerHit_sound.play();
        
        this.player_live = player_lives.getFirstAlive();
        
        if(this.player_live)
        {
            this.player_live.kill();
        }
        
        if(player_lives.countLiving() < 1)
        {
            sound_objects.playerDead_sound.play();
            player.animations.play('death');
            arrows.kill();
            controls.up.enabled=false;
            controls.left.enabled=false;
            controls.down.enabled=false;
            controls.right.enabled=false;
            game.add.tween(player).to( { alpha: 0 }, 2500, Phaser.Easing.Linear.None, true); 
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
        if(player_lives.countLiving() > 2 && coinScore >= 10)
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
        
        if(player_lives.countLiving() > 3 && coinScore >= 10)
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
        sound_objects.levelMusic.stop();
        game.state.restart();
    },
    
    gotoTowerLevel : function(player, towerSprite)
    {
        sound_objects.levelMusic.stop();
        game.state.start('tower_level');
    }, 
};
