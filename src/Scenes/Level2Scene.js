import 'phaser';
import config from '../Config/config';
import Timer from '../Objects/Timer';

export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super('Level2');
        this.platforms;
        this.player;
        this.cursors;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.bombs;
        this.background;
        this.timedEvent;
        this.dead = false;
        this.veil;
        this.txt_pause;
        this.currentX;
        this.gamePaused = false;
    }

    preload() {
        // load images
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('wave', '../../assets/wave.jpg');
        this.load.image('blue', 'assets/blue.jpg');
        this.load.image('space', 'assets/space.jpg');
    }

    create() {
        // this.add.image(400, 300, 'sky');
        // this.background = this.add.tileSprite(400, 300, config.width, config.height, 'blue');
        // this.background.setOrigin(0, 0);
        // this.background.setScrollFactor(0);
        this.background = this.add.tileSprite(0, 0, 800, 600, 'space');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
        this.platforms = this.physics.add.staticGroup();

        // BASE
        // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(400, 616, 'ground').setScale(3).refreshBody();
        this.platforms.create(1200, 568, 'ground').setScale(3).refreshBody();
        this.platforms.create(1600, 532, 'ground').setScale(3).refreshBody();

        this.platforms.create(3100, 568, 'ground').setScale(3).refreshBody();

        // this.platforms.create(800, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(950, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.physics.world.bounds.width = 10000; // MUST BE THE SAME AS Camera-World-Bounds
        this.physics.world.bounds.height = 700;
        this.player.setCollideWorldBounds(true);
        // this.player.body.onWorldBounds = true;
        // To simulate less greavity
        // this.player.body.setGravityY(300);

        this.physics.add.collider(this.player, this.platforms);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // No stars, asteroids
        // var stars = this.physics.add.group({
        //     key: 'star',
        //     setXY: { x: 10, y: -10}
        // });

        // this.physics.add.collider(stars, this.platforms);
        // this.physics.add.overlap(player, stars, collectStar, null, this);

        // this.bombs = this.physics.add.group();
        // this.physics.add.collider(this.bombs, this.platforms);
        // this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        // Camera-World-Bounds
        // (x origin, y origin, width, height)
        this.cameras.main.setBounds(0, 0, 10000, 600);
        this.cameras.main.startFollow(this.player);
        // Background scrolls 1/3 to camera
        this.background.tilePositionX = this.cameras.main.scrollX * .3;

        // Listener for Arrow Key Input
        this.cursors = this.input.keyboard.createCursorKeys();
        // Listen for Key press input - only esc key
        this.input.keyboard.on('keyup', this.escOnly, this);
        // Listen for Key press input - handles everything else
        this.input.keyboard.on('keydown', this.otherKey, this);

        //Timer for asteroids
        var timedEvent = this.time.addEvent({
            delay: 2500,
            callback: this.spawnAsteroid,
            callbackScope: this,
            repeat: 999999,
            startAt: 1
        });

        
    }

    escOnly(event) {
        let code = event.keyCode;
        if (code == 27 && this.gamePaused == false) {
            // console.log("pause trigger");
            // console.log("game paused? " + this.gamePaused);
            //Have to check if game over or not 
            console.log(this.currentX);
            this.createPauseScreen();
            this.togglePauseScreen(true);
            this.gamePaused = true;
            this.startPause();

        }else if(code == 27 && this.gamePaused == true){
            this.togglePauseScreen(false);
            this.gamePaused = false;
            this.endPause();
        }
    }
    // Start Pause - Player stop moving, Sprite stop moving, Sprites stop spawning
    startPause(){
        this.physics.pause();
    }
    // End Pause - Player moving, Sprite moving, Sprites spawning
    endPause(){
        this.physics.resume();
    }
    otherKey(event){
        // console.log("other event");
        // console.log(event.keyCode)
    }

    spawnAsteroid() {
        // console.log("spawnAsteroid");
        // console.log(this.cameras.main.worldView.x);
        // console.log(this.cameras.main.worldView.x + 800);
        var temp = Phaser.Math.Between(this.cameras.main.worldView.x + 100, this.cameras.main.worldView.x + 800);
        // console.log("asteroid: " + temp);
        var stars = this.physics.add.group({
            key: 'star',
            setXY: { x: temp, y: -10 }
        });
        this.physics.add.overlap(this.player, stars, this.setDeath, null, this);
    }

    setDeath() {
        if (!this.dead) {
            this.dead = true;
            console.log("died")
        }
    }

    callAsteroid() {
        // console.log("time went off")
    }

    // collectStar (player, star){
    //     star.disableBody(true, true);
    // }

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        this.isDead();
        if (this.dead) {
            this.triggerGameOver;
            return;
        }
        this.currentX = this.cameras.main.worldView.x;
        console.log(this.currentX);
    }

    isDead() {
        if (this.dead) {

        }
    }
    createPauseScreen() {
        this.veil = this.add.graphics({ x: 0, y: 0 });
        // this.veil.fillStyle('#6d206e', 0.75);
        this.veil.fillStyle('#000000', 0.75);
        this.veil.fillRect(0, 0, config.width, config.height);
        // this.veil.setDepth(5);
        this.veil.setScrollFactor(0);

        // this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
        // this.txt_pause = new Text(this, 400, 200, 'Pause', 'title');
        this.txt_pause = this.add.text(this.currentX + 400, 200, 'Pause', {fontSize: '56px', fill: '#000000'});
        this.txt_pause.setOrigin(.5);

        // this.txt_pause.setDepth(5);
        // this.txt_pause.setScrollFactor(0);
    }
    togglePauseScreen(is_visible) {
        console.log('Paused');
        this.veil.setVisible(is_visible);
        this.txt_pause.setVisible(is_visible);
        this.gamePaused = is_visible;
    }
    clickPause(){
        
    }
};
