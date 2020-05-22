import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class WinScene extends Phaser.Scene {
  constructor () {
    super('Win');
  }

  preload() {
    // this.load.image('levelm', 'assets/ui/MainMenuButton/MainMenuButton.png');
    // this.load.image('levelmh', 'assets/ui/MainMenuButton/MainMenuButton_Hovered.png');
  }

  create () {
    this.level_select = new Button(this, 400, config.height/2 + 100, 'levelm', 'levelmh', '','Title');
    this.level_select.setScrollFactor(0);
    this.createPauseScreen();
  }

  update () {
    var msg = this.sys.game.globals.score;
    msg =  "You Won!\nScore: "+msg;
    var font_size = 1000/msg.length;
    this.txt_pause.setFontSize(font_size);
    this.txt_pause.setText(msg);
  }

  createPauseScreen() {
    console.log('Create Pause Screen');
    this.veil = this.add.graphics({ x: 0, y: 0 });
    // this.veil.fillStyle('#6d206e', 0.75);
    // Trouble making veil purple
    this.veil.fillStyle('0x6d206e', 0.3);
    this.veil.fillRect(0, 0, config.width, config.height);
    // this.veil.setDepth(5);
    this.veil.setScrollFactor(0);

    // this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
    // this.txt_pause = new Text(this, 400, 200, 'Pause', 'title');
    var msg = this.sys.game.globals.score;
    var font_size = 1000/msg.length;
    font_size = `${font_size}px`
    this.txt_pause = this.add.text(400, 200, msg, {fontSize: font_size, fill: '#CCC'});
    this.txt_pause.setOrigin(.5);
    this.txt_pause.setScrollFactor(0);

    // this.txt_pause.setDepth(5);
    // this.txt_pause.setScrollFactor(0);
    }
};
