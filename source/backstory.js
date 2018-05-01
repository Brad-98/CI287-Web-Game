var scrollBackground

var backstory = 
{
    preload : function()
    {
        this.game.load.image('scrollBackground', '../assets/scrollBackground.jpg');
        this.game.load.image('continueButton', '../assets/continueButton.png');
    },  
    
    create : function()
    {
        scrollBackground = this.game.add.sprite(0, -150, 'scrollBackground');
        scrollBackground.scale.setTo(0.8, 0.8);
       
        this.game.add.text(210, 20, 'Dear Wizard, \n\nThe village is writing to you because a dark evil has invaded the \ntower of the land. \n\nYour the only one with enough power to overthrow this evil. \n\nThe village and the land lie in your hands now. \n\n\n\nRegards,\nThe Village', { font: '30px Arial', fill: '#000000' });
        
        this.add.button(500, 600, 'continueButton', this.gotoOutdoorZone, this);
    },
    
    gotoOutdoorZone : function()
    {
        this.state.start('outdoorZone');
    }
};