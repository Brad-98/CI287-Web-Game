var winScreen = 
{
    preload : function()
    {
        this.game.load.audio('winScreen_levelMusic', '../assets/music/music_winScreen.mp3'); 
    },
    
    create : function()
    {
        sound_objects.winScreen_levelMusic = this.game.add.audio('winScreen_levelMusic');
        sound_objects.winScreen_levelMusic.play();
        
        scrollBackground = this.game.add.sprite(0, -150, 'scrollBackground');
        scrollBackground.scale.setTo(0.8, 0.8);
       
        this.game.add.text(210, 20, 'Dear Wizard, \n\nThe village congratulates you, for taking back the tower and\nsaving our villagers.\n\nWe are forever in your debt. \n\n\n\n\n\n\nRegards,\nThe Village', { font: '30px Arial', fill: '#000000' });
        
        this.add.button(500, 600, 'continueButton', this.gotoMainMenu, this);
    },
    
    gotoMainMenu : function()
    {
        this.state.start('mainMenu');
    }
};