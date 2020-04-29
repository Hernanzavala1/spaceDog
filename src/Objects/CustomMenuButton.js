import 'phaser';

export default class CustomMenuButton extends Phaser.GameObjects.Container {
  constructor() {
    super(scene);

    // this.button.on('pointerdown', function () {
    //   this.scene.scene.start(targetScene);
    // }.bind(this));

    // this.button.on('pointerover', function () {
    //   this.button.setTexture(key2);
    //   this.text.setStyle({fill: '#ec186c'});
    // }.bind(this));

    // this.button.on('pointerout', function () {
    //   this.button.setTexture(key1);
    //   this.text.setStyle({fill: '#6d206e'});
    // }.bind(this));

    // this.scene.add.existing(this);
  }

  preload(){

  }

  create(){
    console.log("custom button")
  }
}