var world_towerLevel = 
{
    map: null,
    layer_ground: null,
    layer_walls: null,
    layer_doors: null
};

function buildWorld_towerLevel (game, world) 
{
    // Tilemap
    world_towerLevel.map = this.game.add.tilemap('map');
    world_towerLevel.map.addTilesetImage('TileA3-byLunarea','tileSheet');
    
    // Tilemap layers
    world_towerLevel.layer_ground = world_towerLevel.map.createLayer('layer_Ground');
    world_towerLevel.layer_walls = world_towerLevel.map.createLayer('layer_Walls');
    world_towerLevel.layer_doors = world_towerLevel.map.createLayer('layer_Doors');
    world_towerLevel.layer_ground.resizeWorld();
}

var tower_level =
{
    preload : function()
    {
        this.game.load.tilemap('map','../assets/tilesets/towerLevel..json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileSheet', '../assets/tilesets/TileA3-byLunarea.png');
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