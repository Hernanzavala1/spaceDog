import 'phaser';
import Level1Scene from '../Scenes/Level1Scene';
import Level2Scene from '../Scenes/Level2Scene';
import Level3Scene from '../Scenes/Level3Scene';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene,resume,restart) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, { fontSize: '32px', fill: '#6d206e' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', function () {
      if (resume) {
        this.scene.scene.resume(this.scene.sys.game.globals.currentLevel);
        this.scene.scene.bringToTop(this.scene.sys.game.globals.currentLevel);
        this.scene.scene.pause();
      }
      else if (restart){
        this.scene.scene.remove(this.scene.sys.game.globals.currentLevelString);
        if (this.scene.sys.game.globals.currentLevelString==="Level1"){
          this.scene.scene.add('Level1', Level1Scene);
          this.scene.scene.start("Level1");
        }
        else if (this.scene.sys.game.globals.currentLevelString==="Level2"){
          this.scene.scene.add('Level2', Level2Scene);
          this.scene.scene.start("Level2");
        }
        else if (this.scene.sys.game.globals.currentLevelString==="Level3"){
          this.scene.scene.add('Level3', Level3Scene);
          this.scene.scene.start("Level3");
        }
      }
      else this.scene.scene.start(targetScene);
    }.bind(this));

    this.button.on('pointerover', function () {
      this.button.setTexture(key2);
      this.text.setStyle({fill: '#ec186c'});
    }.bind(this));

    this.button.on('pointerout', function () {
      this.button.setTexture(key1);
      this.text.setStyle({fill: '#6d206e'});
    }.bind(this));

    this.scene.add.existing(this);
  }
}