import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import HomeDog from '../Objects/HomeDog';
import HomeDog2 from '../Objects/HomeDog2';


export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  preload(){
    // this.load.image('mainmenu', 'assets/ui/MainMenu.png');
    // this.load.image('start', 'assets/ui/StartButton/StartButton.png');
    // this.load.image('start_hover', 'assets/ui/StartButton/StartButton_Hovered.png');
    // this.load.image('controls', 'assets/ui/ControlButton/ControlButton.png');
    // this.load.image('controls_hover', 'assets/ui/ControlButton/ControlButton_Hovered.png');
    // this.load.image('help', 'assets/ui/HelpButton/HelpButton.png');
    // this.load.image('help_hover', 'assets/ui/HelpButton/HelpButton_Hovered.png');
  }

  create () {
    //temp background image
    this.add.image(400, 300, 'mainmenu');

    // Start
    this.gameButton = new Button(this, config.width-150, config.height/2, 'start', 'start_hover', '', 'Level');

    // Controls
    this.optionsButton = new Button(this, config.width-150, config.height/2 + 100, 'controls', 'controls_hover', '', 'Credits');

    // Help
    this.creditsButton = new Button(this, config.width-150, config.height/2 + 200, 'help', 'help_hover', '', 'Options');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.2, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};
