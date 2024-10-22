import 'phaser';

export default class Button2 extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    // this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.button = this.scene.add.rectangle(x,y, width, height, '#6d206e').setInteractive();
    this.text = this.scene.add.text(x, y, text, { fontSize: '32px', fill: '#6d206e' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', function () {
      this.scene.scene.start(targetScene);
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