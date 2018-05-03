var control = 
{
    create : function()
    {
        scrollBackground = this.game.add.sprite(0, -150, 'scrollBackground');
        scrollBackground.scale.setTo(0.8, 0.8);
       
        this.game.add.text(500, 100, 'Controls', { font: '50px Arial', fill: '#000000' });
        
        this.game.add.text(400, 200, 'W = Walk Up \nA = Walk Left \nS = Walk Down \nD = Walk Right \nLeft Mouse Button = Shoot Fireball', { font: '30px Arial', fill: '#000000' });
        
        this.add.button(500, 600, 'continueButton', this.gotoOutdoorZone, this);
    },
    
    gotoOutdoorZone : function()
    {
        this.state.start('outdoorZone');
    }
};