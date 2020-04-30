import 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
    this.esc;
  }

  preload() {
    this.load.image('controlbg', 'assets/ui/Controls.png');
  }

  create () {
    this.add.image(400, 300, 'controlbg'); 

    this.esc = this.input.keyboard.addKey('ESC');
  }

  update () {
    if (this.esc.isDown) {
      this.scene.switch('Title');
      this.esc.isDown = false;
    }
  }
};