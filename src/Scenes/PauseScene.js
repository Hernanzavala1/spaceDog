import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class PauseScene extends Phaser.Scene {
  constructor () {
    super('Pause');
    this.escP;
  }

  preload() {
    this.load.image('retryp', 'assets/ui/RetryButton/RetryButton.png');
    this.load.image('retryph', 'assets/ui/RetryButton/RetryButton_Hovered.png');
    this.load.image('resumep', 'assets/ui/ResumeButton/ResumeButton.png');
    this.load.image('resumeph', 'assets/ui/ResumeButton/ResumeButton_Hovered.png');
    this.load.image('levelp', 'assets/ui/MainMenuButton/MainMenuButton.png');
    this.load.image('levelph', 'assets/ui/MainMenuButton/MainMenuButton_Hovered.png');
  }

  create () {
    this.escP = this.input.keyboard.addKey("ESC",true,false);
    this.retry = new Button(this, 400, config.height/2 + 100, 'retryp', 'retryph', '', '', false,true);
    this.resume = new Button(this, 400, config.height/2, 'resumep', 'resumeph', '', '',true);
    this.level_select = new Button(this, 400, config.height/2 + 200, 'levelp', 'levelph', '','Title');
    this.retry.setScrollFactor(0);
    this.resume.setScrollFactor(0);
    this.level_select.setScrollFactor(0);
    this.createPauseScreen();
  }

  update () {
    // if (this.escP.isDown) {
    //   if (this.sys.game.globals.currentLevel){
    //     this.scene.resume(this.sys.game.globals.currentLevel);
    //     this.scene.bringToTop(this.sys.game.globals.currentLevel);
    //     this.scene.pause();
    //   }
    //   else this.scene.switch('Title');
    // }
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
    this.txt_pause = this.add.text(400, 200, 'Pause', {fontSize: '56px', fill: '#CCC'});
    this.txt_pause.setOrigin(.5);
    this.txt_pause.setScrollFactor(0);

    // this.txt_pause.setDepth(5);
    // this.txt_pause.setScrollFactor(0);
    }
};
