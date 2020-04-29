import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import LevelScene from './Scenes/LevelScene';
import Level2Scene from './Scenes/Level2Scene';
import Model from './Model';
import level1Scene from './Scenes/level1Scene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Title', Level2Scene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Level', LevelScene);
    this.scene.add('Level2', Level2Scene);
    this.scene.start('Boot');
  }
}

window.game = new Game();