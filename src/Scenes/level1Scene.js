import 'phaser';
import config from '../Config/config';
import Timer from '../Objects/Timer';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1');
        this.platforms;
        this.player;
        this.alien;
        this.cursors;
        this.spacebar;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.bombs;
        this.background;
        this.timedEvent;
        this.timer;
        this.finished = false;
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
        this.load.spritesheet('spaceDog', 'assets/spritesheets/Dog.png', { frameWidth: 128, frameHeight: 96 });
        this.load.spritesheet('alien', 'assets/spritesheets/Alien.png', { frameWidth: 128, frameHeight: 96 });
        this.load.image('wave', '../../assets/wave.jpg');
        this.load.image('blue', 'assets/blue.jpg');
        this.load.image('space', 'assets/space.jpg');
        this.load.image('bubble', 'assets/bubble.png');
        this.load.spritesheet('geyser', 'assets/spritesheets/Geyser.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('portal', 'assets/spritesheets/Portal.png', { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        // this.add.image(400, 300, 'sky');
        // this.background = this.add.tileSprite(400, 300, config.width, config.height, 'blue');
        // this.background.setOrigin(0, 0);
        // this.background.setScrollFactor(0);
        this.background = this.add.tileSprite(0, 0, 800, 600, 'space');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.scoreText = this.add.text(16, 16, 'Level 1', { fontSize: '32px', fill: '#000' });
        this.platforms = this.physics.add.staticGroup();

        // BASE
        // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(400, 616, 'ground').setScale(3).refreshBody();
        this.platforms.create(1200, 290, 'ground').setScale(1).refreshBody();
        this.platforms.create(1800, 370, 'ground').setScale(1).refreshBody();

        this.platforms.create(1200, 568, 'ground').setScale(3).refreshBody();
        this.platforms.create(1600, 532, 'ground').setScale(3).refreshBody();

        this.platforms.create(3100, 568, 'ground').setScale(3).refreshBody();
        this.platforms.create(3100, 370, 'ground').setScale(1).refreshBody();//1 
        this.platforms.create(3600, 260, 'ground').setScale(1).refreshBody();// 3
        this.platforms.create(3000, 200, 'ground').setScale(1).refreshBody();// 2

        this.platforms.create(4100, 525, 'ground').setScale(3).refreshBody();
        this.platforms.create(5000, 390, 'ground').setScale(1).refreshBody();
        this.platforms.create(5900, 525, 'ground').setScale(2, 3).refreshBody();
        this.platforms.create(6700, 450, 'ground').setScale(3).refreshBody();

        // this.platforms.create(800, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(950, 220, 'ground');

        this.player = this.physics.add.sprite(100, 0, 'spaceDog');
        this.player.setBounce(0.2);
        this.physics.world.bounds.width = 10000;
        this.physics.world.bounds.height = 700;
        this.player.setCollideWorldBounds(true);

        this.alien = this.physics.add.sprite(500, 450, 'alien');
        this.alien.setBounce(0.2);
        this.alien.setCollideWorldBounds(true);
        this.alienAnims();
        this.alien.anims.play('AlienWalk', true);
        this.alien.setVelocityX(100);
        // this.player.body.onWorldBounds = true;
        // To simulate less greavity
        // this.player.body.setGravityY(300);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.alien, this.platforms);
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dying',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 20, end: 23 }),
            frameRate: 10,
            repeat: 0
        });


        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


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
        // // Listen for Key press input - handles everything else
        this.input.keyboard.on('keydown', this.otherKey, this);
        this.spacebar = this.input.keyboard.addKey("SPACE");
        
        //Timer for asteroids
        this.timedEvent = this.time.addEvent({
            delay: 2500,
            callback: this.spawnAsteroid,
            callbackScope: this,
            repeat: 999999,
            startAt: 1
        });

        this.anims.create({
            key: 'geysers',
            frames: this.anims.generateFrameNumbers('geyser'),
            frameRate: 8,
            repeat: -1
        });

        this.timer = new Timer(this, 0, 0, 5, 4000);
        this.geyser = this.physics.add.sprite(3000, 200, 'geyser');
        this.geyser.anims.play('geysers');


        this.anims.create({
            key: 'Portal',
            frames: this.anims.generateFrameNumbers('portal'),
            frameRate: 8,
            repeat: -1
        });

        this.portal = this.physics.add.sprite(6000, 400, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.anims.play('Portal');
        this.physics.add.overlap(this.player, this.portal, function () {
            if (!this.finished) {
                this.player.anims.play('dying');
                setTimeout(() => {
                    var won = this.add.text(6000, 200, 'You Won!', { fontSize: '56px', fill: '#6d206e' });
                    won.setOrigin(.5);
                    this.physics.pause();
                }, 100);


            }
            this.finished = true;
        }.bind(this));


        // this.physics.add.overlap(this.player, this.portal, portalReached.bind(this));
        this.physics.add.collider(this.geyser, this.platforms);
        this.physics.add.overlap(this.player, this.geyser, function () {
            this.timer.restart();
        }.bind(this));


    }


    alienAnims() {
        this.anims.create({
            key: 'AlienWalk',
            frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
    }

    onEvent() {
        // console.log("onevent");
        // console.log(this.cameras.main.worldView.x);
        // console.log(this.cameras.main.worldView.x + 800);
    }


    callAsteroid() {
        console.log("time went off")
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
        var run = false;
        if (!this.finished) {
            if (this.spacebar.isDown) {
                run = true;
            }
            if (this.spacebar.isUp) {
                run = false;
            }
            if (this.cursors.left.isDown) {
                if (run) this.player.setVelocityX(-400);
                else this.player.setVelocityX(-200);
                if (!this.player.flipX) {
                    this.player.flipX = true;
                }
                this.player.anims.play('walk', true);
            }
            else if (this.cursors.right.isDown) {
                if (run) this.player.setVelocityX(400);
                else this.player.setVelocityX(200);
                if (this.player.flipX) {
                    this.player.flipX = false;
                }
                this.player.anims.play('walk', true);
            }
            else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
            this.currentX = this.cameras.main.worldView.x;
            if (this.dead) {
                this.triggerGameOver();
                this.scene.pause();
                return;
            }
        }
        else {

        }
    }
    escOnly(event) {
        let code = event.keyCode;
        if (code == 27 && this.gamePaused == false) {
            console.log("ESC + game not paused");
            // console.log("game paused? " + this.gamePaused);
            //Have to check if game over or not 
            console.log(this.currentX);
            this.createPauseScreen();
            this.togglePauseScreen(true);
            this.startPause();
        }else if(code == 27 && this.gamePaused == true){
            console.log("ESC + game paused");
            this.togglePauseScreen(false);
            this.endPause();
        }
    }
    // Start Pause - Player stop moving, Sprite stop moving, Sprites stop spawning
    startPause(){
        console.log('Start Pause');
        // this.scene.pause();
        this.physics.pause();
        this.timedEvent.paused = true;
    }
    // End Pause - Player moving, Sprite moving, Sprites spawning
    endPause(){
        console.log('End Pause');
        // this.scene.resume();
        this.physics.resume();
        this.timedEvent.paused = false;
    }
    createPauseScreen() {
        console.log('Create Pause Screen');
        this.veil = this.add.graphics({ x: 0, y: 0 });
        // this.veil.fillStyle('#6d206e', 0.75);
        // Trouble making veil purple
        this.veil.fillStyle('#6d206e', 0.5);
        this.veil.fillRect(0, 0, config.width, config.height);
        // this.veil.setDepth(5);
        this.veil.setScrollFactor(0);

        // this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
        // this.txt_pause = new Text(this, 400, 200, 'Pause', 'title');
        this.txt_pause = this.add.text(this.currentX + 400, 200, 'Pause', {fontSize: '56px', fill: '#6d206e'});
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

    spawnAsteroid() {
        console.log('Spawn Asteroid');
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
            console.log('Set death');
            this.dead = true;
        }
    }
    createGameOverScreen() {
        console.log('Create Game Over');
        this.veil = this.add.graphics({ x: 0, y: 0 });
        // this.veil.fillStyle('#6d206e', 0.75);
        this.veil.fillRect(0, 0, config.width, config.height);
        // Trouble making veil purple
        this.veil.fillStyle('6d206e', 0.5);
        // this.veil.setDepth(5);
        this.veil.setScrollFactor(0);

        // this.scoreText = this.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000' });
        // this.txt_pause = new Text(this, 400, 200, 'Pause', 'title');
        this.txt_pause = this.add.text(this.currentX + 400, 200, 'You Died!', {fontSize: '56px', fill: '#6d206e'});
        this.txt_pause.setOrigin(.5);

        // this.txt_pause.setDepth(5);
        // this.txt_pause.setScrollFactor(0);
    }
    triggerGameOver() {
        console.log('Trigger Game Over');
        this.createGameOverScreen();
        this.physics.pause();
        this.timedEvent.paused = true;
    }


};