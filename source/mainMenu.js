var GAMEHEIGHT = 720;
var GAMEWIDTH = 1280;

var mainMenu = 
{
    preload : function()
    {
        this.game.load.image('playButton', '../assets/playButton.png');
    },  
    
    create : function()
    {
        this.game.add.text(GAMEWIDTH/4.5, GAMEHEIGHT/12, 'Ascend The Tower!', { font: '80px Arial', fill: '#fff' });
        this.add.button(GAMEWIDTH/2.7, GAMEHEIGHT/3, 'playButton', this.gotoOutdoorZone, this);
    },
    
    gotoOutdoorZone : function()
    {
        this.state.start('outdoorZone');
    }
};