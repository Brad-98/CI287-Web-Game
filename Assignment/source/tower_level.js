var enemy_elf_up;
var enemy_up;
var enemy_up1;
var enemy_up2;
var enemy_up3;
var enemy_up4;
var enemy_elf_left;
var enemy_left;
var enemy_left1;
var enemy_left2;
var enemy_left3;
var enemy_left4;
var enemy_elf_down;
var enemy_down;
var enemy_down1;
var enemy_down2;
var enemy_down3;
var enemy_down4;
var enemy_down5;
var enemy_elf_right;
var enemy_right;
var enemy_right1;
var enemy_right2;
var enemy_right3;
var silverKey;
var goldKey;
var fireArrowUp = 0;
var fireArrowLeft = 0;
var fireArrowDown = 0;
var fireArrowRight = 0;
var fireArrowTrap = 0;
var fireArrowTrap1 = 0;
var fireArrowTrap2 = 0;
var fireArrowTrap3 = 0;
var fireArrowTrap4 = 0;
var fireArrowTrap5 = 0;
var fireArrowTrap6 = 0;
var fireArrowTrap7 = 0;
var arrowTrap;
var arrowTrap1;
var arrowTrap2;
var arrowTrap3;
var arrowTrap4;
var arrowTrap5;
var arrowTrap6;
var arrowTrap7;
var objective_text;
var objective_text2;
var villageSavedScore = 0;
var villageSavedString = '';
var villageSavedStringNumber = ' / 8';
var villageSavedText;
var villager;
var villager1;
var villager2;
var villager3;
var villager4;
var villager5;
var villager6;
var villager7;
var end;

var world_towerLevel = 
{
    map: null,
    layer_ground: null,
    layer_walls: null,
    layer_doors: null,
    layer_doors2: null,
    layer_villagerDead: null
};

function buildWorld_towerLevel (game, world) 
{
    // Tilemap
    world_towerLevel.map = this.game.add.tilemap('map');
    world_towerLevel.map.addTilesetImage('TileA3-byLunarea','tileSheet');
    world_towerLevel.map.addTilesetImage('merchantDead','villagerDead');
    
    // Tilemap layers
    world_towerLevel.layer_ground = world_towerLevel.map.createLayer('layer_Ground');
    world_towerLevel.layer_walls = world_towerLevel.map.createLayer('layer_Walls');
    world_towerLevel.layer_doors = world_towerLevel.map.createLayer('layer_Doors');
    world_towerLevel.layer_doors2 = world_towerLevel.map.createLayer('layer_Doors2');
    world_towerLevel.layer_villagerDead = world_towerLevel.map.createLayer('layer_VillagerDead');
    world_towerLevel.layer_ground.resizeWorld();
    world_towerLevel.map.setCollision(21, true, world_towerLevel.layer_walls);
    world_towerLevel.map.setCollision(17, true, world_towerLevel.layer_doors);
    world_towerLevel.map.setCollision(23, true, world_towerLevel.layer_doors2);
}

var tower_level =
{
    preload : function()
    {
        this.game.load.image('goldKey', '../assets/goldKey.png');
        this.game.load.image('silverKey', '../assets/silverKey.png');
        
        this.game.load.audio('keyPickup_sound', '../assets/music/sound_keyPickup.mp3');
        this.game.load.audio('tower_levelMusic', '../assets/music/music_towerLevel.mp3'); 
        
        this.game.load.tilemap('map','../assets/tilesets/towerLevel..json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileSheet', '../assets/tilesets/TileA3-byLunarea.png');
        this.game.load.image('villagerDead', '../assets/merchantDead.png'); 
        this.game.load.image('end', '../assets/end.png'); 
    },  
    
    create : function()
    {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        buildWorld_towerLevel(game, world_towerLevel);
        
        sound_objects.tower_levelMusic = this.game.add.audio('tower_levelMusic');
        sound_objects.tower_levelMusic.loopFull();
        
        sound_objects.keyPickup_sound = this.game.add.audio('keyPickup_sound');
        
        arrowTrap = this.game.add.sprite(3308, 890, 'arrowTrap');
        arrowTrap1 = this.game.add.sprite(3400, 890, 'arrowTrap');
        arrowTrap2 = this.game.add.sprite(3496, 890, 'arrowTrap');
        arrowTrap3 = this.game.add.sprite(3143, 1500, 'arrowTrap');
        arrowTrap4 = this.game.add.sprite(3810, 1398, 'arrowTrap');
        arrowTrap5 = this.game.add.sprite(957, 1401, 'arrowTrap');
        arrowTrap6 = this.game.add.sprite(1284, 423, 'arrowTrap');
        arrowTrap7 = this.game.add.sprite(1284, 519, 'arrowTrap');
        
        end = this.game.add.sprite(3617,0,'end');
        this.game.physics.enable(end);
        end.body.immovable = true;
        
        villagers = this.game.add.group();
        this.createVillagers();
        
        coins = this.game.add.group();
        this.createCoins();
        
        enemy_elf_up = this.game.add.group();
        this.createEnemiesUp();
        this.createEnemiesUp1();
        this.createEnemiesUp2();
        this.createEnemiesUp3();
        this.createEnemiesUp4();
        
        enemy_elf_left = this.game.add.group();
        this.createEnemiesLeft();
        this.createEnemiesLeft1();
        this.createEnemiesLeft2();
        this.createEnemiesLeft3();
        this.createEnemiesLeft4();
        
        enemy_elf_down = this.game.add.group();
        this.createEnemiesDown();
        this.createEnemiesDown1();
        this.createEnemiesDown2();
        this.createEnemiesDown3();
        this.createEnemiesDown4();
        this.createEnemiesDown5();
        
        enemy_elf_right = this.game.add.group();
        this.createEnemiesRight();
        this.createEnemiesRight1();
        this.createEnemiesRight2();
        this.createEnemiesRight3();
        
        fireballs = this.game.add.group();
        fireballs.enableBody = true;
        this.game.physics.arcade.enable(fireballs);
        fireballs.createMultiple(10, 'fireball');
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
        
        player = this.game.add.sprite(1791,2106,'player');
 
        player.animations.add('walkUp', [0,1,2,3,4,5,6,7,8],8, false);
        
        player.animations.add('walkDown', [18,19,20,21,22,23,24,25,26],8, false);
        
        player.animations.add('walkLeft', [9,10,11,12,13,14,15,16,17],12, false);
        
        player.animations.add('walkRight', [27,28,29,30,31,32,33,34,35],12, false);
        
        player.animations.add('attackUp', [36,37,38,39,40,41,36],10, false);
        
        player.animations.add('attackDown', [54,55,56,57,58,59,54],10, false);
        
        player.animations.add('attackLeft', [45,46,47,48,49,50,45],10, false);
        
        player.animations.add('attackRight', [63,64,65,66,67,68,63],10, false);
        
        player.animations.add('death', [72, 73, 74 , 75, 76, 77], 7, false);
        
        player.anchor.setTo(0.5,0.5);
    
        this.game.physics.enable(player);
        
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
        coin_image.scale.setTo(1.3,1.3);
        coin_image.fixedToCamera = true;
        
        goldKey = this.game.add.sprite(3700,1100,'goldKey');
        goldKey.enableBody = true;
        this.game.physics.arcade.enable(goldKey);
        
        silverKey = this.game.add.sprite(615,1650,'silverKey');
        silverKey.enableBody = true;
        this.game.physics.arcade.enable(silverKey);
        
        player_lives = this.game.add.group();
        player_livesText = this.game.add.text(10 ,15 ,'Lives : ', {font: '30px Arial', fill: '#ffffff'});
        player_livesText.fixedToCamera = true;
        
        villageSavedString = 'Villagers Rescued: ';
        villageSavedText = this.game.add.text(10, 145, villageSavedString + villageSavedScore + villageSavedStringNumber, {font: '30px Arial', fill: '#ffffff'});
        villageSavedText.fixedToCamera = true;
        
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
        
        objective_text = this.game.add.text(10 , 200 ,'Main Objective:\nRescue the villagers and escape the tower', {font: '20px Arial', fill: '#ffffff'});
        objective_text2 = this.game.add.text(10 , 270 ,'Find the gold key to unlock the exit', {font: '20px Arial', fill: '#ffffff'});
        objective_text.fixedToCamera = true;
        objective_text2.fixedToCamera = true;
        
        this.game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);
    },
    
    update : function()
    {
        this.game.physics.arcade.collide(player, arrows, this.arrowHitsPlayer);
        this.game.physics.arcade.collide(player, coins, this.collectCoin);
        this.game.physics.arcade.collide(player, villager, this.villagerSaved);
        this.game.physics.arcade.collide(player, villager1, this.villager1Saved);
        this.game.physics.arcade.collide(player, villager2, this.villager2Saved);
        this.game.physics.arcade.collide(player, villager3, this.villager3Saved);
        this.game.physics.arcade.collide(player, villager4, this.villager4Saved);
        this.game.physics.arcade.collide(player, villager5, this.villager5Saved);
        this.game.physics.arcade.collide(player, villager6, this.villager6Saved);
        this.game.physics.arcade.collide(player, villager7, this.villager7Saved);
        this.game.physics.arcade.collide(arrows, world_towerLevel.layer_walls, this.arrowOrFireballHitWall);
        this.game.physics.arcade.collide(arrows, world_towerLevel.layer_doors, this.arrowOrFireballHitWall);
        this.game.physics.arcade.collide(arrows, world_towerLevel.layer_doors2, this.arrowOrFireballHitWall);
        this.game.physics.arcade.collide(fireballs, world_towerLevel.layer_walls, this.arrowOrFireballHitWall);
        this.game.physics.arcade.collide(fireballs, world_towerLevel.layer_doors, this.arrowOrFireballHitWall);
        this.game.physics.arcade.collide(fireballs, world_towerLevel.layer_doors2, this.arrowOrFireballHitWall);
        this.game.physics.arcade.collide(fireballs, enemy_elf_down, this.fireballHitEnemyDown);
        this.game.physics.arcade.collide(fireballs, enemy_elf_up, this.fireballHitEnemyUp);
        this.game.physics.arcade.collide(fireballs, enemy_elf_left, this.fireballHitEnemyLeft);
        this.game.physics.arcade.collide(fireballs, enemy_elf_right, this.fireballHitEnemyRight);
        this.game.physics.arcade.collide(player, world_towerLevel.layer_walls);
        this.game.physics.arcade.collide(player, world_towerLevel.layer_doors);
        this.game.physics.arcade.collide(player, world_towerLevel.layer_doors2);   
        this.game.physics.arcade.collide(player,silverKey, this.collectSilverKey);
        this.game.physics.arcade.collide(player,goldKey, this.collectGoldKey);
        this.game.physics.arcade.collide(player,end, this.ending);
        
        this.arrowTrapShoot();

        if(player_lives.countLiving() < 1)
        {
            game.time.events.add(3000, this.respawnPlayer, this.player);
        }

        player.body.velocity.set(0);

        if(controls.up.isDown && controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.body.velocity.y = -150;
            player.body.velocity.x = -150;

            facingUp = true;
            facingLeft = true;
            facingDown = false;
            facingRight = false;
        }

        else if(controls.up.isDown && controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.body.velocity.y = -150;
            player.body.velocity.x = 150;

            facingUp = true;
            facingLeft = false;
            facingDown = false;
            facingRight = true;
        }

        else if(controls.down.isDown && controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.body.velocity.y = 150;
            player.body.velocity.x = -150;

            facingUp = false;
            facingLeft = true;
            facingDown = true;
            facingRight = false;

        }

        else if(controls.down.isDown && controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.body.velocity.y = 150;
            player.body.velocity.x = 150;

            facingUp = false;
            facingLeft = false;
            facingDown = true;
            facingRight = true;

        }

        else if (controls.up.isDown)
        {
            player.animations.play('walkUp');
            player.body.velocity.y = -160;

            facingUp = true;
            facingLeft = false;
            facingDown = false;
            facingRight = false;
        }

        else if(controls.down.isDown)
        {
            player.animations.play('walkDown');
            player.body.velocity.y = 160;

            facingUp = false;
            facingLeft = false;
            facingDown = true;
            facingRight = false;
        }

        else if(controls.left.isDown)
        {
            player.animations.play('walkLeft');
            player.body.velocity.x = -160;

            facingUp = false;
            facingLeft = true;
            facingDown = false;
            facingRight = false;
        }

        else if(controls.right.isDown)
        {
            player.animations.play('walkRight');
            player.body.velocity.x = 160;

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

        if(player.y <= enemy_up.y + 5 && player.y >= enemy_up.y - 500 && player.x <= enemy_up.x + 100 && player.x >= enemy_up.x - 100)
           {
               enemy_up.animations.play('fireUp');
               elfTween_up.pause();
               this.shootArrowUp();
           }
        else
           {
               enemy_up.animations.play('walkUp');
               elfTween_up.resume();
           }

        if(player.y <= enemy_up1.y + 5 && player.y >= enemy_up1.y - 500 && player.x <= enemy_up1.x + 100 && player.x >= enemy_up1.x - 100)
           {
               enemy_up1.animations.play('fireUp');
               elfTween_up1.pause();
               this.shootArrowUp1();
           }
        else
           {
               enemy_up1.animations.play('walkUp');
               elfTween_up1.resume();
           }

        if(player.y <= enemy_up2.y + 5 && player.y >= enemy_up2.y - 500 && player.x <= enemy_up2.x + 100 && player.x >= enemy_up2.x - 100)
           {
               enemy_up2.animations.play('fireUp');
               elfTween_up2.pause();
               this.shootArrowUp2();
           }
        else
           {
               enemy_up2.animations.play('walkUp');
               elfTween_up2.resume();
           }

        if(player.y <= enemy_up3.y + 5 && player.y >= enemy_up3.y - 500 && player.x <= enemy_up3.x + 100 && player.x >= enemy_up3.x - 100)
           {
               enemy_up3.animations.play('fireUp');
               elfTween_up3.pause();
               this.shootArrowUp3();
           }
        else
           {
               enemy_up3.animations.play('walkUp');
               elfTween_up3.resume();
           }

        if(player.y <= enemy_up4.y + 5 && player.y >= enemy_up4.y - 500 && player.x <= enemy_up4.x + 100 && player.x >= enemy_up4.x - 100)
           {
               enemy_up4.animations.play('fireUp');
               elfTween_up4.pause();
               this.shootArrowUp4();
           }
        else
           {
               enemy_up4.animations.play('walkUp');
               elfTween_up4.resume();
           }

        if(player.x <= enemy_left.x + 5 && player.x >= enemy_left.x - 500 && player.y <= enemy_left.y + 100 && player.y >= enemy_left.y - 100)
           {
               enemy_left.animations.play('fireLeft');
               elfTween_left.pause();
               this.shootArrowLeft();
           }
        else
           {
               enemy_left.animations.play('walkLeft');
               elfTween_left.resume();
           }

        if(player.x <= enemy_left1.x + 5 && player.x >= enemy_left1.x - 500 && player.y <= enemy_left1.y + 100 && player.y >= enemy_left1.y - 100)
           {
               enemy_left1.animations.play('fireLeft');
               elfTween_left1.pause();
               this.shootArrowLeft1();
           }
        else
           {
               enemy_left1.animations.play('walkLeft');
               elfTween_left1.resume();
           }

        if(player.x <= enemy_left2.x + 5 && player.x >= enemy_left2.x - 500 && player.y <= enemy_left2.y + 100 && player.y >= enemy_left2.y - 100)
           {
               enemy_left2.animations.play('fireLeft');
               elfTween_left2.pause();
               this.shootArrowLeft2();
           }
        else
           {
               enemy_left2.animations.play('walkLeft');
               elfTween_left2.resume();
           }

        if(player.x <= enemy_left3.x + 5 && player.x >= enemy_left3.x - 500 && player.y <= enemy_left3.y + 100 && player.y >= enemy_left3.y - 100)
           {
               enemy_left3.animations.play('fireLeft');
               elfTween_left3.pause();
               this.shootArrowLeft3();
           }
        else
           {
               enemy_left3.animations.play('walkLeft');
               elfTween_left3.resume();
           }

        if(player.x <= enemy_left4.x + 5 && player.x >= enemy_left4.x - 500 && player.y <= enemy_left4.y + 100 && player.y >= enemy_left4.y - 100)
           {
               enemy_left4.animations.play('fireLeft');
               elfTween_left4.pause();
               this.shootArrowLeft4();
           }
        else
           {
               enemy_left4.animations.play('walkLeft');
               elfTween_left4.resume();
           }

        if(player.y <= enemy_down.y + 500 && player.y >= enemy_down.y - 5 && player.x <= enemy_down.x + 100 && player.x >= enemy_down.x - 100)
           {
               enemy_down.animations.play('fireDown');
               elfTween_down.pause();
               this.shootArrowDown();
           }
        else
           {
               enemy_down.animations.play('walkDown');
               elfTween_down.resume();
           }

        if(player.y <= enemy_down1.y + 500 && player.y >= enemy_down1.y - 5 && player.x <= enemy_down1.x + 100 && player.x >= enemy_down1.x - 100)
           {
              enemy_down1.animations.play('fireDown');
               elfTween_down1.pause();;
               this.shootArrowDown1();
          }
        else
          {
               enemy_down1.animations.play('walkDown');
               elfTween_down1.resume();
          }

        if(player.y <= enemy_down2.y + 500 && player.y >= enemy_down2.y - 5 && player.x <= enemy_down2.x + 100 && player.x >= enemy_down2.x - 100)
           {
              enemy_down2.animations.play('fireDown');
               elfTween_down2.pause();
               this.shootArrowDown2();
          }
        else
          {
               enemy_down2.animations.play('walkDown');
               elfTween_down2.resume();
          }


        if(player.y <= enemy_down3.y + 500 && player.y >= enemy_down3.y - 5 && player.x <= enemy_down3.x + 100 && player.x >= enemy_down3.x - 100)
           {
              enemy_down3.animations.play('fireDown');
               elfTween_down3.pause();
               this.shootArrowDown3();
          }
        else
          {
               enemy_down3.animations.play('walkDown');
               elfTween_down3.resume();
          }


        if(player.y <= enemy_down4.y + 500 && player.y >= enemy_down4.y - 5 && player.x <= enemy_down4.x + 100 && player.x >= enemy_down4.x - 100)
           {
              enemy_down4.animations.play('fireDown');
               elfTween_down4.pause();
               this.shootArrowDown4();
          }
        else
          {
               enemy_down4.animations.play('walkDown');
               elfTween_down4.resume();
          }


        if(player.y <= enemy_down5.y + 500 && player.y >= enemy_down5.y - 5 && player.x <= enemy_down5.x + 100 && player.x >= enemy_down5.x - 100)
           {
              enemy_down5.animations.play('fireDown');
               elfTween_down5.pause();;
               this.shootArrowDown5();
          }
        else
          {
               enemy_down5.animations.play('walkDown');
               elfTween_down5.resume();
          }

        if(player.x <= enemy_right.x + 500 && player.x >= enemy_right.x - 5 && player.y <= enemy_right.y + 100 && player.y >= enemy_right.y - 100)
           {
               enemy_right.animations.play('fireRight');
               elfTween_right.pause();
               this.shootArrowRight();
           }
        else
           {
               enemy_right.animations.play('walkRight');
               elfTween_right.resume();
           }

        if(player.x <= enemy_right1.x + 500 && player.x >= enemy_right1.x - 5 && player.y <= enemy_right1.y + 100 && player.y >= enemy_right1.y - 100)
           {
               enemy_right1.animations.play('fireRight');
               elfTween_right1.pause();
               this.shootArrowRight1();
           }
        else
           {
               enemy_right1.animations.play('walkRight');
               elfTween_right1.resume();
           }

        if(player.x <= enemy_right2.x + 500 && player.x >= enemy_right2.x - 5 && player.y <= enemy_right2.y + 100 && player.y >= enemy_right2.y - 100)
           {
               enemy_right2.animations.play('fireRight');
               elfTween_right2.pause();
               this.shootArrowRight2();
           }
        else
           {
               enemy_right2.animations.play('walkRight');
               elfTween_right2.resume();
           }

        if(player.x <= enemy_right3.x + 500 && player.x >= enemy_right3.x - 5 && player.y <= enemy_right3.y + 100 && player.y >= enemy_right3.y - 100)
           {
               enemy_right3.animations.play('fireRight');
               elfTween_right3.pause();
               this.shootArrowRight3();
           }
        else
           {
               enemy_right3.animations.play('walkRight');
               elfTween_right3.resume();
           }
},
    enemyDownMove : function (fireball, enemy_right)
    {
        fireball.kill();
        enemy_right.kill();
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
        for (var y = 0; y < 2; y++)
            {
                for (var x = 0; x < 3; x++)
                {
                    coin = coins.create(100 + (50 * x), 1500 + (50 * y), 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
            }  
        
            for (var x = 0; x < 2; x++)
                {
                    coin = coins.create(600 + (50 * x), 1700, 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
        
        for (var y = 0; y < 3; y++)
                {
                    coin = coins.create(3150 , 1900 + (50 * y), 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
        
        for (var x = 0; x < 3; x++)
                {
                    coin = coins.create(1600 + (50 * x), 1150, 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
        
        for (var x = 0; x < 3; x++)
                {
                    coin = coins.create(1600 + (50 * x), 925, 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
        
        for (var x = 0; x < 3; x++)
                {
                    coin = coins.create(700 + (50 * x), 1500, 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
        
        for (var y = 0; y < 3; y++)
                {
                    coin = coins.create(1450 , 275 + (50 * y), 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
        
        for (var y = 0; y < 3; y++)
            {
                for (var x = 0; x < 2; x++)
                {
                    coin = coins.create(3600 + (50 * x), 1050 + (50 * y), 'coin');
                    coin.animations.add('spin', [0,1,2,3],8,true);
                    coin.animations.play('spin');
                    coin.anchor.setTo(0.5,0.5);
                }
            } 
        
    },
    
    createEnemiesUp : function()
    {
         enemy_elf_up.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_up);
         enemy_up = enemy_elf_up.create(1075, 1550, 'enemy_elf');
         enemy_up.anchor.setTo(0.5, 0.5);
         enemy_up.body.setSize(8, 13, 28, 26);
         enemy_up.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
         enemy_up.animations.add('fireUp', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 9, true); 
         enemy_up.animations.play('walkUp');         
         elfTween_up = game.add.tween(enemy_up).to({
                y:enemy_up.y - 100
            }, 2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesUp1 : function()
    {
         enemy_elf_up.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_up);
         enemy_up1 = enemy_elf_up.create(150, 1500, 'enemy_elf');
         enemy_up1.anchor.setTo(0.5, 0.5);
         enemy_up1.body.setSize(8, 13, 28, 26);
         enemy_up1.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
         enemy_up1.animations.add('fireUp', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 9, true);
         enemy_up1.animations.play('walkUp');  
         elfTween_up1 = game.add.tween(enemy_up1).to({
                y:enemy_up1.y - 100
            }, 2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesUp2 : function()
    {
         enemy_elf_up.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_up);
         enemy_up2 = enemy_elf_up.create(1100 , 800, 'enemy_elf');
         enemy_up2.anchor.setTo(0.5, 0.5);
         enemy_up2.body.setSize(8, 13, 28, 26);
         enemy_up2.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
         enemy_up2.animations.add('fireUp', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 9, true);
         enemy_up2.animations.play('walkUp'); 
         elfTween_up2 = game.add.tween(enemy_up2).to({
                y:enemy_up2.y - 100
            }, 2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesUp3 : function()
    {
         enemy_elf_up.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_up);
         enemy_up3 = enemy_elf_up.create(2550 , 600, 'enemy_elf');
         enemy_up3.anchor.setTo(0.5, 0.5);
         enemy_up3.body.setSize(8, 13, 28, 26);
         enemy_up3.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
         enemy_up3.animations.add('fireUp', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 9, true);
         enemy_up3.animations.play('walkUp');  
         elfTween_up3 = game.add.tween(enemy_up3).to({
                y:enemy_up3.y - 100
            }, 2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesUp4 : function()
    {
         enemy_elf_up.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_up);
         enemy_up4 = enemy_elf_up.create(2900 , 600, 'enemy_elf');
         enemy_up4.anchor.setTo(0.5, 0.5);
         enemy_up4.body.setSize(8, 13, 28, 26);
         enemy_up4.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
         enemy_up4.animations.add('fireUp', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 9, true);
         enemy_up4.animations.play('walkUp'); 
         elfTween_up4 = game.add.tween(enemy_up4).to({
                y:enemy_up4.y - 100
            }, 2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesLeft : function()
    {
         enemy_elf_left.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_left);
         enemy_left = enemy_elf_left.create(2500 , 1600, 'enemy_elf');
         enemy_left.anchor.setTo(0.5, 0.5);
         enemy_left.body.setSize(8, 13, 28, 26);
         enemy_left.animations.add('walkLeft', [13, 14, 15, 16, 17, 18, 19, 20], 9, true);
         enemy_left.animations.add('fireLeft', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 9, true);
         enemy_left.animations.play('walkLeft');   
         elfTween_left = game.add.tween(enemy_left).to({
                x:enemy_left.x-100
            },2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesLeft1 : function()
    {
         enemy_elf_left.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_left);
         enemy_left1 = enemy_elf_left.create(500 , 450, 'enemy_elf');
         enemy_left1.anchor.setTo(0.5, 0.5);
         enemy_left1.body.setSize(8, 13, 28, 26);
         enemy_left1.animations.add('walkLeft', [13, 14, 15, 16, 17, 18, 19, 20], 9, true);
         enemy_left1.animations.add('fireLeft', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 9, true);
         enemy_left1.animations.play('walkLeft');       
         elfTween_left1 = game.add.tween(enemy_left1).to({
                x:enemy_left1.x-100
            },2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesLeft2 : function()
    {
         enemy_elf_left.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_left);
         enemy_left2 = enemy_elf_left.create(1600 , 925, 'enemy_elf');
         enemy_left2.anchor.setTo(0.5, 0.5);
         enemy_left2.body.setSize(8, 13, 28, 26);
         enemy_left2.animations.add('walkLeft', [13, 14, 15, 16, 17, 18, 19, 20], 9, true);
         enemy_left2.animations.add('fireLeft', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 9, true);
         enemy_left2.animations.play('walkLeft');      
         elfTween_left2 = game.add.tween(enemy_left2).to({
                x:enemy_left2.x-100
            },2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesLeft3 : function()
    {
         enemy_elf_left.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_left);
         enemy_left3 = enemy_elf_left.create(2300 , 300, 'enemy_elf');
         enemy_left3.anchor.setTo(0.5, 0.5);
         enemy_left3.body.setSize(8, 13, 28, 26);
         enemy_left3.animations.add('walkLeft', [13, 14, 15, 16, 17, 18, 19, 20], 9, true);
         enemy_left3.animations.add('fireLeft', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 9, true);
         enemy_left3.animations.play('walkLeft');      
         elfTween_left3 = game.add.tween(enemy_left3).to({
                x:enemy_left3.x-100
            },2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesLeft4 : function()
    {
         enemy_elf_left.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_left);
         enemy_left4 = enemy_elf_left.create(3500 , 750, 'enemy_elf');
         enemy_left4.anchor.setTo(0.5, 0.5);
         enemy_left4.body.setSize(8, 13, 28, 26);
         enemy_left4.animations.add('walkLeft', [13, 14, 15, 16, 17, 18, 19, 20], 9, true);
         enemy_left4.animations.add('fireLeft', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 9, true);
         enemy_left4.animations.play('walkLeft');      
         elfTween_left4 = game.add.tween(enemy_left4).to({
                x:enemy_left4.x-100
            },2000, 'Linear',true, 0, 100, true);
    },
    
    createEnemiesDown : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        enemy_down = enemy_elf_down.create(3600, 1700, 'enemy_elf'); 
        enemy_down.anchor.setTo(0.5,0.5);
        enemy_down.body.setSize(8, 13, 28, 26);
        enemy_down.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        enemy_down.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
        enemy_down.animations.play('walkDown');
        elfTween_down = game.add.tween(enemy_down).to({
            y:enemy_down.y + 100
        }, 2000, 'Linear', true, 0, 100, true);      
    },
    
    createEnemiesDown1 : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        enemy_down1 = enemy_elf_down.create(2300, 1200, 'enemy_elf'); 
        enemy_down1.anchor.setTo(0.5,0.5);
        enemy_down1.body.setSize(8, 13, 28, 26);
        enemy_down1.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        enemy_down1.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
        enemy_down1.animations.play('walkDown');
        elfTween_down1 = game.add.tween(enemy_down1).to({
            y:enemy_down1.y + 100
        }, 2000, 'Linear', true, 0, 100, true);    
    },
    
    createEnemiesDown2 : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        enemy_down2 = enemy_elf_down.create(435, 1000, 'enemy_elf'); 
        enemy_down2.anchor.setTo(0.5,0.5);
        enemy_down2.body.setSize(8, 13, 28, 26);
        enemy_down2.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        enemy_down2.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
        enemy_down2.animations.play('walkDown');
        elfTween_down2 = game.add.tween(enemy_down2).to({
            y:enemy_down2.y + 100
        }, 2000, 'Linear', true, 0, 100, true);    
    },
    
    createEnemiesDown3 : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        enemy_down3 = enemy_elf_down.create(125, 600, 'enemy_elf'); 
        enemy_down3.anchor.setTo(0.5,0.5);
        enemy_down3.body.setSize(8, 13, 28, 26);
        enemy_down3.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        enemy_down3.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
        enemy_down3.animations.play('walkDown');
        elfTween_down3 = game.add.tween(enemy_down3).to({
            y:enemy_down3.y + 100
        }, 2000, 'Linear', true, 0, 100, true);    
    },
    
    createEnemiesDown4 : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        enemy_down4 = enemy_elf_down.create(2250, 600, 'enemy_elf'); 
        enemy_down4.anchor.setTo(0.5,0.5);
        enemy_down4.body.setSize(8, 13, 28, 26);
        enemy_down4.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        enemy_down4.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
        enemy_down4.animations.play('walkDown');
        elfTween_down4 = game.add.tween(enemy_down4).to({
            y:enemy_down4.y + 100
        }, 2000, 'Linear', true, 0, 100, true);    
    },
    
    createEnemiesDown5 : function()
    {
        enemy_elf_down.enableBody = true;
        this.game.physics.arcade.enable(enemy_elf_down);
        enemy_down5 = enemy_elf_down.create(3675, 200, 'enemy_elf'); 
        enemy_down5.anchor.setTo(0.5,0.5);
        enemy_down5.body.setSize(8, 13, 28, 26);
        enemy_down5.animations.add('walkDown', [24,25,26,27,28,29,30,31,32],9, true);
        enemy_down5.animations.add('fireDown', [72,73,74,75,76,77,78,79,80,81,82,83],9, true);
        enemy_down5.animations.play('walkDown');
        elfTween_down5 = game.add.tween(enemy_down5).to({
            y:enemy_down5.y + 100
        }, 2000, 'Linear', true, 0, 100, true);    
    },

    createEnemiesRight : function()
    {
         enemy_elf_right.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_right);
         enemy_right = enemy_elf_right.create(2600 , 1400, 'enemy_elf');
         enemy_right.anchor.setTo(0.5, 0.5);
         enemy_right.body.setSize(8, 13, 28, 26);
         enemy_right.animations.add('walkRight', [37, 38, 39, 40, 41, 42, 43, 44], 9, true);
         enemy_right.animations.add('fireRight', [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95], 9, true);
         enemy_right.animations.play('walkRight');  
         elfTween_right = game.add.tween(enemy_right).to({
                x:enemy_right.x + 100
            }, 2000, 'Linear', true, 0, 100, true);
    },
    
    createEnemiesRight1 : function()
    {
         enemy_elf_right.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_right);
         enemy_right1 = enemy_elf_right.create(1800 , 1150, 'enemy_elf');
         enemy_right1.anchor.setTo(0.5, 0.5);
         enemy_right1.body.setSize(8, 13, 28, 26);
         enemy_right1.animations.add('walkRight', [37, 38, 39, 40, 41, 42, 43, 44], 9, true);
         enemy_right1.animations.add('fireRight', [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95], 9, true);
         enemy_right1.animations.play('walkRight');    
          elfTween_right1 = game.add.tween(enemy_right1).to({
                x:enemy_right1.x + 100
            }, 2000, 'Linear', true, 0, 100, true);
    },
    
    createEnemiesRight2 : function()
    {
         enemy_elf_right.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_right);
         enemy_right2 = enemy_elf_right.create(125 , 1000, 'enemy_elf');
         enemy_right2.anchor.setTo(0.5, 0.5);
         enemy_right2.body.setSize(8, 13, 28, 26);
         enemy_right2.animations.add('walkRight', [37, 38, 39, 40, 41, 42, 43, 44], 9, true);
         enemy_right2.animations.add('fireRight', [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95], 9, true);
         enemy_right2.animations.play('walkRight');;       
         elfTween_right2 = game.add.tween(enemy_right2).to({
                x:enemy_right2.x + 100
            }, 2000, 'Linear', true, 0, 100, true);
    },
    
    createEnemiesRight3 : function()
    {
         enemy_elf_right.enableBody = true;
         this.game.physics.arcade.enable(enemy_elf_right);
         enemy_right3 = enemy_elf_right.create(1800 , 550, 'enemy_elf');
         enemy_right3.anchor.setTo(0.5, 0.5);
         enemy_right3.body.setSize(8, 13, 28, 26);
         enemy_right3.animations.add('walkRight', [37, 38, 39, 40, 41, 42, 43, 44], 9, true);
         enemy_right3.animations.add('fireRight', [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95], 9, true);
         enemy_right3.animations.play('walkRight');;       
         elfTween_right3 = game.add.tween(enemy_right3).to({
                x:enemy_right3.x + 100
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
        
        var explosion = explosionAnimation.getFirstExists(false);
        explosion.reset(enemy_up.body.x - 55, enemy_up.body.y - 47);
        explosion.play('fireballExplosion', 20, false, true);
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
    
    shootArrowUp : function()
    {
        if(this.game.time.now > fireArrowUp)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_up.alive)
            {
                arrow.reset(enemy_up.x, enemy_up.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowUp = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowUp1 : function()
    {
        if(this.game.time.now > fireArrowUp)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_up1.alive)
            {
                arrow.reset(enemy_up1.x, enemy_up1.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowUp = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowUp2 : function()
    {
        if(this.game.time.now > fireArrowUp)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_up2.alive)
            {
                arrow.reset(enemy_up2.x, enemy_up2.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowUp = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowUp3 : function()
    {
        if(this.game.time.now > fireArrowUp)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_up3.alive)
            {
                arrow.reset(enemy_up3.x, enemy_up3.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowUp = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowUp4 : function()
    {
        if(this.game.time.now > fireArrowUp)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_up4.alive)
            {
                arrow.reset(enemy_up4.x, enemy_up4.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowUp = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowLeft : function()
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
    
    shootArrowLeft1 : function()
    {
        if(this.game.time.now > fireArrowLeft)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_left1.alive)
            {
                arrow.reset(enemy_left1.x, enemy_left1.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowLeft = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowLeft2 : function()
    {
        if(this.game.time.now > fireArrowLeft)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_left2.alive)
            {
                arrow.reset(enemy_left2.x, enemy_left2.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowLeft = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowLeft3 : function()
    {
        if(this.game.time.now > fireArrowLeft)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_left3.alive)
            {
                arrow.reset(enemy_left3.x, enemy_left3.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowLeft = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowLeft4 : function()
    {
        if(this.game.time.now > fireArrowLeft)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_left4.alive)
            {
                arrow.reset(enemy_left4.x, enemy_left4.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowLeft = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowDown : function()
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
    
    shootArrowDown1 : function()
    {
        if(this.game.time.now > fireArrowDown)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_down1.alive)
            {
                arrow.reset(enemy_down1.x, enemy_down1.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowDown = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowDown2 : function()
    {
        if(this.game.time.now > fireArrowDown)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_down2.alive)
            {
                arrow.reset(enemy_down2.x, enemy_down2.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowDown = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowDown3 : function()
    {
        if(this.game.time.now > fireArrowDown)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_down3.alive)
            {
                arrow.reset(enemy_down3.x, enemy_down3.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowDown = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowDown4 : function()
    {
        if(this.game.time.now > fireArrowDown)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_down4.alive)
            {
                arrow.reset(enemy_down4.x, enemy_down4.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowDown = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowDown5 : function()
    {
        if(this.game.time.now > fireArrowDown)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_down5.alive)
            {
                arrow.reset(enemy_down5.x, enemy_down5.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowDown = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowRight : function()
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
    
    shootArrowRight1 : function()
    {
        if(this.game.time.now > fireArrowRight)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_right1.alive)
            {
                arrow.reset(enemy_right1.x, enemy_right1.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowRight = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowRight2 : function()
    {
        if(this.game.time.now > fireArrowRight)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_right2.alive)
            {
                arrow.reset(enemy_right2.x, enemy_right2.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowRight = this.game.time.now + 2000;
            }
       } 
    },
    
    shootArrowRight3 : function()
    {
        if(this.game.time.now > fireArrowRight)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow && enemy_right3.alive)
            {
                arrow.reset(enemy_right3.x, enemy_right3.y);
                arrow.angle = 180;
                arrow.rotation = this.game.physics.arcade.angleBetween(arrow, player);
                game.physics.arcade.moveToObject(arrow,player,200);
                fireArrowRight = this.game.time.now + 2000;
            }
       } 
    },
    
    arrowTrapShoot : function()
    {
        arrowTrap.angle = 270;
        arrowTrap1.angle = 270;
        arrowTrap2.angle = 270;
        arrowTrap3.angle = 270;
        arrowTrap5.angle = 180;
        
        if(this.game.time.now > fireArrowTrap)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap.x + 5, arrowTrap.y + 9);
                arrow.angle = 90;
                arrow.body.velocity.y = +100;
                fireArrowTrap = this.game.time.now + 2000;
            }
       } 
        
        if(this.game.time.now > fireArrowTrap1)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap1.x + 5, arrowTrap1.y + 9);
                arrow.angle = 90;
                arrow.body.velocity.y = +100;
                fireArrowTrap1 = this.game.time.now + 2000;
            }
       }         
        
        if(this.game.time.now > fireArrowTrap2)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap2.x + 5, arrowTrap2.y + 9);
                arrow.angle = 90;
                arrow.body.velocity.y = +100;
                fireArrowTrap2 = this.game.time.now + 2000;
            }
       }
        
        if(this.game.time.now > fireArrowTrap3)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap3.x + 5, arrowTrap3.y + 9);
                arrow.angle = 90;
                arrow.body.velocity.y = +100;
                fireArrowTrap3 = this.game.time.now + 2000;
            }
       }
        
        if(this.game.time.now > fireArrowTrap4)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap4.x - 5, arrowTrap4.y + 5);
                arrow.angle = 180;
                arrow.body.velocity.x = -100;
                fireArrowTrap4 = this.game.time.now + 2000;
            }
       }
        
        if(this.game.time.now > fireArrowTrap5)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap5.x + 10, arrowTrap5.y - 1);
                arrow.angle = 0;
                arrow.body.velocity.x = 100;
                fireArrowTrap5 = this.game.time.now + 1600;
            }
       }
        
        if(this.game.time.now > fireArrowTrap6)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap6.x - 5, arrowTrap6.y + 5);
                arrow.angle = 180;
                arrow.body.velocity.x = -100;
                fireArrowTrap6 = this.game.time.now + 2000;
            }
       }
        
        if(this.game.time.now > fireArrowTrap7)
        {
            arrow = arrows.getFirstExists(false);
            if (arrow)
            {
                arrow.reset(arrowTrap7.x - 5, arrowTrap7.y + 5);
                arrow.angle = 180;
                arrow.body.velocity.x = -100;
                fireArrowTrap7 = this.game.time.now + 2000;
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
    
    arrowOrFireballHitWall : function(arrow, fireball)
    {
        arrow.kill();
    },
     
    collectCoin : function(player,coin)
    {
        sound_objects.coin_sound.play();
        coin.kill();
        coinScore +=1;
        coinScoreText.text = coinScoreString + coinScore;
    },
    
    createVillagers : function()
    {
        villagers.enableBody = true;
        this.game.physics.arcade.enable(villagers);
        
        villager = villagers.create(2993, 249, 'merchant');
        villager.anchor.setTo(0.5,0.5);
        
        villager1 = villagers.create(1263, 470, 'merchant');
        villager1.anchor.setTo(0.5,0.5);
        
        villager2 = villagers.create(240, 1545, 'merchantBack');
        villager2.anchor.setTo(0.5,0.5); 
        
        villager3 = villagers.create(60, 1500, 'merchantBack');
        villager3.anchor.setTo(0.5,0.5); 
        
        villager4 = villagers.create(3000, 2080, 'merchantBack');
        villager4.anchor.setTo(0.5,0.5); 
        
        villager5 = villagers.create(2740, 250, 'merchant');
        villager5.anchor.setTo(0.5,0.5); 
        
        villager6 = villagers.create(3712, 1030, 'merchant');
        villager6.anchor.setTo(0.5,0.5); 
        
        villager7 = villagers.create(3712, 1200, 'merchant');
        villager7.anchor.setTo(0.5,0.5); 
    },
    
    villagerSaved : function()
    {
        villager.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager1Saved : function()
    {
        villager1.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager2Saved : function()
    {
        villager2.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager3Saved : function()
    {
        villager3.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager4Saved : function()
    {
        villager4.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager5Saved : function()
    {
        villager5.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager6Saved : function()
    {
        villager6.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    villager7Saved : function()
    {
        villager7.kill();
        villageSavedScore += 1;
        villageSavedText.text = villageSavedString + villageSavedScore + villageSavedStringNumber;
    },
    
    collectSilverKey : function(player, silverKey)
    {
        sound_objects.keyPickup_sound.play();
        silverKey.kill();
        world_towerLevel.layer_doors.kill();
    },
    
    collectGoldKey : function(player, goldKey)
    {
        sound_objects.keyPickup_sound.play();
        goldKey.kill();
        objective_text2.kill();
        world_towerLevel.layer_doors2.kill();
    },
    
    extraHeart : function()
    {
        if(player_lives.length == 3 && coinScore >= 7)
        {
            sound_objects.fireball_sound.stop();
            sound_objects.upgrade_sound.play();
            coinScore -= 7;
            coinScoreText.text = coinScoreString + coinScore;
            this.heart = player_lives.create(118 + (35 * 3), 35, 'heart');
            this.heart.anchor.setTo(0.5, 0.5);
            this.heart.fixedToCamera = true;
            heartOutline = this.game.add.sprite(118 + (35 * 3), 35, 'heart_outline');
            heartOutline.anchor.setTo(0.5, 0.5);
            heartOutline.fixedToCamera = true;
        }
        
        if(player_lives.length == 4 && coinScore >= 7)
        {
            sound_objects.fireball_sound.stop();
            sound_objects.upgrade_sound.play();
            coinScore -= 7;
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
        if(player_lives.countLiving() < 5 && coinScore >= 10)
        {
            sound_objects.fireball_sound.stop();
            sound_objects.upgrade_sound.play();
            coinScore -= 10;
            coinScoreText.text = coinScoreString + coinScore;
            player_lives.callAll('revive');        
        }
    },
    
    respawnPlayer : function()
    {
        sound_objects.tower_levelMusic.stop();
        coinScore = 0;
        villageSavedScore = 0;
        game.state.restart();
    },
    
    ending : function(player, end)
    {
        if(villageSavedScore == 8)
        {
            sound_objects.tower_levelMusic.stop();
            game.state.start('winScreen');
        }
        
    },
};