import 'phaser';


export default class Level2Scene extends Phaser.Scene {
    
  constructor () {
    super('Level1');
    this.platforms;
    this.player;
    this.cursors;
    this.background;
    this.diamonds;
    this.ground;
    this.enemy;
  }

  preload () {
    // load images
    this.load.image('background', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('diamond', 'assets/diamond.png');
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

  }

  create () {
   this.background=  this.add.tileSprite(0, 0, 800, 600, 'background');
   this.background.setOrigin(0,0);
   this.background.setScrollFactor(0);
   
 

    //this.setCollideWorldBounds(true, 1920, 1920);
    this.scoreText = this.add.text(16, 16, 'Level 1', { fontSize: '32px', fill: '#000' });
    this.platforms = this.physics.add.staticGroup();
   ///  300, 750
    this.platforms.create(0,  900, 'ground').setScale(4).refreshBody();
    this.platforms.create(600, 570, 'ground');
    this.platforms.create(50, 389, 'ground');
    this.platforms.create(750, 300, 'ground');
    //this.platforms.setCollideWorldBounds(true);
 

    this.player = this.physics.add.sprite(100, 450, 'woof');
    this.createEnemy();
    this.player.body.bounce.y =.2;
    this.player.setCollideWorldBounds(false);
    this.player.body.gravity.y = 800;
    this.cameras.main.startFollow(this.player);

   
    
    this.diamonds = this.physics.add.group({
        key: 'diamond',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.diamonds.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    
     
    this.physics.add.collider(this.player, this.platforms);
  
    this.physics.add.collider(this.diamonds, this.platforms);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('woof', { start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });


 ;

   

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('woof', { start: 2, end: 3}),
        frameRate: 10,
        repeat: -1
    });

   
}

   
   createEnemy (){
    this.enemy = this.physics.add.sprite(100, 550, 'dude');
    this.physics.add.collider(this.enemy, this.platforms);



    this.anims.create({
        key: 'dudeRight',
        frames: this.anims.generateFrameNumbers('dude', {  start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    }); 

    this.enemy.anims.play("dudeRight", true);
    this.enemy.setVelocityX(100);
    //this.enemy.setCollideWorldBounds(true);
    //this.setCollideWorldBounds(true);

   }
   
   updateEnemy(){
    if(this.enemy.xSpeed>0 && this.enemy.x>this.platforms.x+this.platforms.width/2 || this.enemy.xSpeed<0 && this.enemy.x<this.platforms.x-this.platforms.width/2){
        this.enemy.xSpeed*=-1;
    }	
   }

  update(){
     this.background.tilePositionX= this.cameras.main.scrollX * .3;
     this.updateEnemy();
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
        this.player.setVelocityY(-300);
    }



  }



 render() {

    this.debug.cameraInfo(this.camera, 32, 32);
    this.debug.spriteCoords(this.player, 32, 500);

}

};
