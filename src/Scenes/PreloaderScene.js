import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    // add logo image
    this.add.image(400, 300, 'logo');

    var x_bar = 470;
    var y_bar = 500;

    var x_text = 610;
    var y_text = 560;


    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(x_bar, y_bar, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: x_text,
      y: y_text,
      text: 'Loading:',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: x_text+70,
      y: y_text,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: x_text,
      y: y_text+25,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(x_bar, y_bar, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/EarthsWish.mp3']);

    //for actual gameplay
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('spaceDog', 'assets/spritesheets/Dog.png', { frameWidth: 128, frameHeight: 96 });
    this.load.spritesheet('spaceDogCrawl', 'assets/spritesheets/DogCrawl.png', { frameWidth: 128, frameHeight: 64 });
    this.load.spritesheet('alien', 'assets/spritesheets/Alien.png', { frameWidth: 128, frameHeight: 96 });
    this.load.image('wave', '../../assets/wave.jpg');
    this.load.image('blue', 'assets/blue.jpg');
    this.load.image('space', 'assets/space.jpg');
    this.load.image('bubble', 'assets/bubble.png');
    this.load.spritesheet('geyser', 'assets/spritesheets/Geyser.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('portal', 'assets/spritesheets/Portal.png', { frameWidth: 128, frameHeight: 128 });
    this.load.audio('bark', 'assets/bark.mp3');

    //for controls scene
    this.load.image('controlbg', 'assets/ui/Controls.png');

    //for level select scene
    this.load.image('levelselect', 'assets/ui/LevelSelect.png');
    this.load.image('level1', 'assets/ui/Level1Button/Level1Button.png');
    this.load.image('level1 h', 'assets/ui/Level1Button/Level1Button_Hovered.png');
    this.load.image('level2', 'assets/ui/Level2Button/Level2Button.png');
    this.load.image('level2 h', 'assets/ui/Level2Button/Level2Button_Hovered.png');

    //for help scene
    this.load.image('optionsbg', 'assets/ui/Help.png');

    //for pause scene
    this.load.image('retryp', 'assets/ui/RetryButton/RetryButton.png');
    this.load.image('retryph', 'assets/ui/RetryButton/RetryButton_Hovered.png');
    this.load.image('resumep', 'assets/ui/ResumeButton/ResumeButton.png');
    this.load.image('resumeph', 'assets/ui/ResumeButton/ResumeButton_Hovered.png');
    this.load.image('levelp', 'assets/ui/MainMenuButton/MainMenuButton.png');
    this.load.image('levelph', 'assets/ui/MainMenuButton/MainMenuButton_Hovered.png');

    //for retry scene
    this.load.image('retry', 'assets/ui/RetryButton/RetryButton.png');
    this.load.image('retryh', 'assets/ui/RetryButton/RetryButton_Hovered.png');
    this.load.image('resume', 'assets/ui/ResumeButton/ResumeButton.png');
    this.load.image('resumeh', 'assets/ui/ResumeButton/ResumeButton_Hovered.png');
    this.load.image('level', 'assets/ui/MainMenuButton/MainMenuButton.png');
    this.load.image('levelh', 'assets/ui/MainMenuButton/MainMenuButton_Hovered.png');

    //for story scene

    //for title scene
    this.load.image('mainmenu', 'assets/ui/MainMenu.png');
    this.load.image('start', 'assets/ui/StartButton/StartButton.png');
    this.load.image('start_hover', 'assets/ui/StartButton/StartButton_Hovered.png');
    this.load.image('controls', 'assets/ui/ControlButton/ControlButton.png');
    this.load.image('controls_hover', 'assets/ui/ControlButton/ControlButton_Hovered.png');
    this.load.image('help', 'assets/ui/HelpButton/HelpButton.png');
    this.load.image('help_hover', 'assets/ui/HelpButton/HelpButton_Hovered.png');

    //for win scene
    this.load.image('levelm', 'assets/ui/MainMenuButton/MainMenuButton.png');
    this.load.image('levelmh', 'assets/ui/MainMenuButton/MainMenuButton_Hovered.png');


  }

  ready () {
    if (this.sys.game.globals.currentLevelString!=""){
      this.scene.start(this.sys.game.globals.currentLevelString);
    }
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
