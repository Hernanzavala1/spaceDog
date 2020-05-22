import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import PauseScene from './Scenes/PauseScene';
import WinScene from './Scenes/WinScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import RetryScene from './Scenes/RetryScene';
import StoryScene from './Scenes/StoryScene';
import Model from './Model';
import LevelScene from './Scenes/LevelScene';
import Level1Scene from './Scenes/Level1Scene';
import Level2Scene from './Scenes/Level2Scene';
import Level3Scene from './Scenes/Level3Scene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null, currentLevel: null, currentLevelString: "", deathMsg:"", score:0};
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Pause', PauseScene);
    this.scene.add('Retry', RetryScene);
    this.scene.add('Win', WinScene);
    this.scene.add('Story', StoryScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Level', LevelScene);
    this.scene.add('Level1', Level1Scene);
    this.scene.add('Level2', Level2Scene);
    this.scene.add('Level3', Level3Scene );
    // this.scene.start('Boot');
    this.scene.start('Level2');
  }
}

window.game = new Game();