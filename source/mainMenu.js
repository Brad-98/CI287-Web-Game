var GAMEHEIGHT = 720;
var GAMEWIDTH = 1280;

var towerSprite;

var mainMenu = 
{
    preload : function()
    {
        this.game.load.image('playButton', '../assets/playButton.png');
        this.game.load.image('towerSprite', '../assets/towerSprite.png');
    },  
    
    create : function()
    {
        this.game.add.text(GAMEWIDTH/4.5, GAMEHEIGHT/12, 'Ascend The Tower!', { font: '80px Arial', fill: '#ffffff' });
        this.add.button(GAMEWIDTH/2.7, GAMEHEIGHT/3, 'playButton', this.gotoBackstory, this);
        
        towerSprite = this.game.add.sprite(GAMEWIDTH/1.35, GAMEHEIGHT/4, 'towerSprite');
        towerSprite.scale.setTo(3, 3);
        
        //Enables music some issue with Google Chrome
        if (game.sound.usingWebAudio && game.sound.context.state === 'suspended')
        {
            game.input.onTap.addOnce(game.sound.context.resume, game.sound.context);
        }
    },
    
    gotoBackstory : function()
    {
        this.state.start('backstory');
    }
};