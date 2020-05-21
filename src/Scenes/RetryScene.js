import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class RetryScene extends Phaser.Scene {
  constructor () {
    super('Retry');
    this.escP;
  }

  preload() {
    this.load.image('retry', 'assets/ui/RetryButton/RetryButton.png');
    this.load.image('retryh', 'assets/ui/RetryButton/RetryButton_Hovered.png');
    this.load.image('resume', 'assets/ui/ResumeButton/ResumeButton.png');
    this.load.image('resumeh', 'assets/ui/ResumeButton/ResumeButton_Hovered.png');
  }

  create () {
    this.escP = this.input.keyboard.addKey("ESC",true,false);
    this.retry = new Button(this, 400, config.height/2, 'retry', 'retryh', '', '', false,true);
    this.retry.setScrollFactor(0);
    this.createPauseScreen();
  }

  update () {
    var msg = this.sys.game.globals.deathMsg;
    var font_size = 1000/msg.length;
    this.txt_pause.setFontSize(font_size);
    this.txt_pause.setText(msg);
  }

  createPauseScreen() {
    console.log('Create Pause Screen');
    this.veil = this.add.graphics({ x: 0, y: 0 });
    // this.veil.fillStyle('#6d206e', 0.75);
    // Trouble making veil purple
    this.veil.fillStyle('#6d206e', 0.5);
    this.veil.fillRect(0, 0, config.width, config.height);
    // this.veil.setDepth(5);
    this.veil.setScrollFactor(0);

    // this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
    // this.txt_pause = new Text(this, 400, 200, 'Pause', 'title');
    var msg = this.sys.game.globals.deathMsg;
    var font_size = 1000/msg.length;
    font_size = `${font_size}px`
    this.txt_pause = this.add.text(this.currentX + 400, 200, msg, {fontSize: font_size, fill: '#CCC'});
    this.txt_pause.setOrigin(.5);
    this.txt_pause.setScrollFactor(0);

    // this.txt_pause.setDepth(5);
    // this.txt_pause.setScrollFactor(0);
    }
};
