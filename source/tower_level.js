var world_towerLevel = 
{
    map: null,
    layer_ground: null,
    layer_spikeWalls: null
};

function buildWorld_towerLevel (game, world) 
{
    // Tilemap
    world_towerLevel.map = this.game.add.tilemap('map');
    world_towerLevel.map.addTilesetImage('TileA3-byLunarea','tileSheet');
    world_towerLevel.map.addTilesetImage('spikeWall1','tileSpikeWall1');
    world_towerLevel.map.addTilesetImage('spikeWall2','tileSpikeWall2');
    world_towerLevel.map.addTilesetImage('spikeWall3','tileSpikeWall3');
    world_towerLevel.map.addTilesetImage('spikeWall4','tileSpikeWall4');
    
    // Tilemap layers
    world_towerLevel.layer_ground = world_towerLevel.map.createLayer('layer_ground');
    world_towerLevel.layer_spikeWalls = world_towerLevel.map.createLayer('layer_spikeWalls');
    world_towerLevel.layer_ground.resizeWorld();
}

var tower_level =
{
    preload : function()
    {
        this.game.load.tilemap('map','../assets/tilesets/towerLevel..json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileSheet', '../assets/tilesets/TileA3-byLunarea.png');
        this.game.load.image('tileSpikeWall1', '../assets/tilesets/spikeWall1.png');
        this.game.load.image('tileSpikeWall2', '../assets/tilesets/spikeWall2.png');
        this.game.load.image('tileSpikeWall3', '../assets/tilesets/spikeWall3.png');
        this.game.load.image('tileSpikeWall4', '../assets/tilesets/spikeWall4.png');
    },  
    
    create : function()
    {
        buildWorld_towerLevel(game, world_towerLevel);
    },
    
    update : function()
    {
        //Update stuff
    },
};