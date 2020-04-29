import 'phaser';

export default class Level2Scene extends Phaser.Scene {
  constructor () {
    super('Level2');
    this.platforms;
    this.player;
    this.cursors;
    this.stars;
    this.score = 0;
    this.scoreText;
    this.bombs;
  }

  preload () {
    // load images
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create () {
    this.add.image(400, 300, 'sky');
    this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(false);
    this.player.body.setGravityY(300)

    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    // No stars, asteroids
    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 }
    // });
    // stars.children.iterate(function (child) {
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });
    // this.physics.add.collider(stars, platforms);
    // this.physics.add.overlap(player, stars, collectStar, null, this);
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

    // collectStar (player, star){
    //     star.disableBody(true, true);
    // }

    hitBomb (player, bomb){
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play('turn');
    
        gameOver = true;
    }

  update(){
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
    
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
    
        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);
    
        this.player.anims.play('turn');
    }
    
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
  }
};
