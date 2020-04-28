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
    this.load.image('sky', 'assets/sky.png');
  }

  create () {
<<<<<<< HEAD
    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');
    // lEVELs
    this.levelsButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Levels', 'Levels');
    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');
=======
    //temp background image
    this.add.image(400, 300, 'sky');

    // Start
    this.gameButton = new Button(this, config.width-100, config.height/2, 'blueButton1', 'blueButton2', 'Play', 'Level');

    // Controls
    this.optionsButton = new Button(this, config.width-100, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Help
    this.creditsButton = new Button(this, config.width-100, config.height/2 + 200, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    //Space Dog on the left
>>>>>>> 9f4a32c972e422c830e66971e17f3e246ce5ab37

    //Space Dog on Top

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
