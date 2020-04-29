import 'phaser';

export default class Level2Scene extends Phaser.Scene {
  constructor () {
    super('Level1');
    this.platforms;
    this.player;
  }

  preload () {
    // load images
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('diamond', 'assets/diamond.png');
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 });
  }

  create () {
    this.add.image(400, 300, 'sky');
    this.scoreText = this.add.text(16, 16, 'Level 1', { fontSize: '32px', fill: '#000' });
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 450, 'ground');
    this.platforms.create(50, 200, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'woof');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(800)
    
  



    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('woof', { start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

   

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('woof', { start: 2, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    
    diamonds = this.physics.add.group();
    diamonds.enableBody = true
   





}

   
   

  update(){
   
  }
};
