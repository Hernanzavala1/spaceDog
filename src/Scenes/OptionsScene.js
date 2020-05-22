import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
    this.esc;
  }

  preload() {
    //this.load.image('optionsbg', 'assets/ui/Help.png');
  }

  create () {
    this.add.image(400, 300, 'optionsbg'); 

    this.esc = this.input.keyboard.addKey('ESC');
  }

  update () {
    if (this.esc.isDown) {
      this.scene.switch('Title');
      this.esc.isDown = false;
    }
  }
};
