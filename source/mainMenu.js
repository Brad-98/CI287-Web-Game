var GAMEHEIGHT = 720;
var GAMEWIDTH = 1280;

var mainMenu = 
{
    preload : function()
    {
        //Preload the sprites here
    },  
    
    create : function()
    {
        //Create buttons and text here
        this.game.add.text(GAMEWIDTH/3.5, GAMEHEIGHT/3, 'Climb The Tower!', { font: '80px Arial', fill: '#fff' });
    },
    
    gotoOutdoorZone : function()
    {
        this.state.start('outdoorZone');
    }
};