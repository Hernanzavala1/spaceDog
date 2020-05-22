import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class LevelScene extends Phaser.Scene {
  constructor () {
    super('Level');this.esc;
  }
    preload () {
        // load images
        // this.load.image('levelselect', 'assets/ui/LevelSelect.png');
        // this.load.image('level1', 'assets/ui/Level1Button/Level1Button.png');
        // this.load.image('level1 h', 'assets/ui/Level1Button/Level1Button_Hovered.png');
        // this.load.image('level2', 'assets/ui/Level2Button/Level2Button.png');
        // this.load.image('level2 h', 'assets/ui/Level2Button/Level2Button_Hovered.png');
        // this.load.image('ground', 'assets/platform.png');
        // this.load.image('star', 'assets/star.png');
        // this.load.image('bomb', 'assets/bomb.png');
        
        // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }
        // );
        
        //controls
        this.esc = this.input.keyboard.addKey('ESC');
    }

    create () {
        this.add.image(400, 300, 'levelselect');
        // this.text = this.scene.addtext(config.width/2, config.height-300, "Select Level", { fontFamily: 'Georgia', fontSize: '32px', fill: '#ec186c'});
        // this.add(this.text);
        
        this.level1 = new Button(this, 300, config.height/2, 'level1', 'level1 h', '', 'Level1');
        this.level2 = new Button(this, 300, config.height/2 + 100, 'level2', 'level2 h', '', 'Level2');
        this.level3 = new Button(this, 500, config.height/2, 'level3', 'level3 h', '', 'Level3');
        this.level4 = new Button(this, 500, config.height/2 + 100, 'level3', 'level3 h', '', 'Level4');
    }

    update () {
      if (this.esc.isDown) {
        this.scene.switch('Title');
        this.esc.isDown = false;
      }
    }

};
