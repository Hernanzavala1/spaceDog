import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class WinScene extends Phaser.Scene {
  constructor () {
    super('Story');
    this.l1 = "Level 1 story";
    this.l2 = "Level 2 story";
    this.l3 = "Level 3 story";
    this.l4 = "Level 4 story";
    this.l5 = "Level 5 story";
    this.l6 = "Level 6 story";
  }

  preload() {

  }

  create () {
    this.spacebar = this.input.keyboard.addKey("SPACE");
    this.createPauseScreen();
  }

  update () {
    if (this.spacebar.isDown && this.scene.isPaused(this.sys.game.globals.currentLevelString)){
      this.scene.resume(this.sys.game.globals.currentLevel);
      this.scene.bringToTop(this.sys.game.globals.currentLevel);
    }
    if (this.sys.game.globals.currentLevelString=="Level1") this.update_text(this.l1);
    if (this.sys.game.globals.currentLevelString=="Level2") this.update_text(this.l2);
    if (this.sys.game.globals.currentLevelString=="Level3") this.update_text(this.l3);
    if (this.sys.game.globals.currentLevelString=="Level4") this.update_text(this.l4);
    if (this.sys.game.globals.currentLevelString=="Level5") this.update_text(this.l5);
    if (this.sys.game.globals.currentLevelString=="Level6") this.update_text(this.l6);

  }

  update_text(msg){
    console.log(msg);
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
    var msg = this.l1;
    var font_size = 1000/msg.length;
    font_size = `${font_size}px`
    this.txt_pause = this.add.text(400, 100, msg, {fontSize: font_size, fill: '#CCC'});
    this.txt_pause.setOrigin(.5);
    this.txt_pause.setScrollFactor(0);

    this.press_space = this.add.text(400, 550, "(Press Space to Continue)", {fontSize: 16, fill: '#CCC'});
    this.press_space.setOrigin(.5);
    this.press_space.setScrollFactor(0);

    // this.txt_pause.setDepth(5);
    // this.txt_pause.setScrollFactor(0);
    }
};