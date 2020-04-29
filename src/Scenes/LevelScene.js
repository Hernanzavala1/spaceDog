import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super('Level');
  }
  
    preload () {
        // load images
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }
        );
    }

    create () {
        this.add.image(400, 300, 'sky');
        // this.text = this.scene.addtext(config.width/2, config.height-300, "Select Level", { fontFamily: 'Georgia', fontSize: '32px', fill: '#ec186c'});
        // this.add(this.text);
        this.selectLeveltext = this.add.text(400, 150, 'Select Level', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '40px', fill: '#ec186c'});
        this.selectLeveltext.setOrigin(.5, 0);
        
        this.level1 = new Button(this, 400, config.height/2, 'blueButton1', 'blueButton2', 'level 1', 'Level1');
        this.level2 = new Button(this, 400, config.height/2 + 50, 'blueButton1', 'blueButton2', 'Level 2', 'Level2');
        this.level3 = new Button(this, 400, config.height/2 + 50, 'blueButton1', 'blueButton2', 'Level 3', 'Level3');
    }

};
