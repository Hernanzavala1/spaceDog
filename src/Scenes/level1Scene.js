import 'phaser';
import config from '../Config/config';
import Timer from '../Objects/Timer';

export default class Level1Scene extends Phaser.Scene {

    constructor() {
        super('Level1');
        this.platforms;
        this.player;
        this.aliens = [];
        this.geysers = [];
        this.cursors;
        this.cursors2;
        this.shift;
        this.stars;
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
        this.duck = false;
        this.crawl = false;
        this.jump = false;
        this.jumpCount = 0;
        this.invincible = false;
        this.bark = 0;
    }

    preload() {
        // // load images
        // this.load.image('sky', 'assets/sky.png');
        // this.load.image('ground', 'assets/platform.png');
        // this.load.image('star', 'assets/star.png');
        // this.load.image('bomb', 'assets/bomb.png');
        // this.load.spritesheet('spaceDog', 'assets/spritesheets/Dog.png', { frameWidth: 128, frameHeight: 96 });
        // this.load.spritesheet('spaceDogCrawl', 'assets/spritesheets/DogCrawl.png', { frameWidth: 128, frameHeight: 64 });
        // this.load.spritesheet('alien', 'assets/spritesheets/Alien.png', { frameWidth: 128, frameHeight: 96 });
        // this.load.image('wave', '../../assets/wave.jpg');
        // this.load.image('blue', 'assets/blue.jpg');
        // this.load.image('space', 'assets/space.jpg');
        // this.load.image('bubble', 'assets/bubble.png');
        // this.load.spritesheet('geyser', 'assets/spritesheets/Geyser.png', { frameWidth: 128, frameHeight: 128 });
        // this.load.spritesheet('portal', 'assets/spritesheets/Portal.png', { frameWidth: 128, frameHeight: 128 });
        // this.load.audio('bark', 'assets/bark.mp3');
        
    }

    create() {
        this.sound.add('bark');

        this.globals_setup(1);

        this.add_keys();
        this.background = this.add.tileSprite(0, 0, 800, 600, 'Level1Background');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.score_setup();

        this.physics.world.bounds.width = 10000;
        this.physics.world.bounds.height = 1000;

        // BASE
        this.create_platforms();
        this.create_player();
        // this.create_geysers();
        // this.create_aliens();
        this.create_portal();
        // this.create_asteroids();

        this.setup_collisions();

        // Camera-World-Bounds
        // (x origin, y origin, width, height)
        this.cameras.main.setBounds(0, 0, 10000, 800);
        this.cameras.main.startFollow(this.player);
        // Background scrolls 1/3 to camera
        this.background.tilePositionX = this.cameras.main.scrollX * .3;

        // Listener for Arrow Key Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
        // Listen for Key press input - only esc key
        
        // Listen for Key press input - handles everything else
        //this.input.keyboard.on('keydown', this.otherKey, this);

        this.input.keyboard.on('keydown-' + "DOWN", () => this.changePlayer());
        this.input.keyboard.on('keydown-' + "S", () => this.changePlayer());
        this.input.keyboard.on('keyup-' + "DOWN", () => this.changePlayer());
        this.input.keyboard.on('keyup-' + "S", () => this.changePlayer());

        this.timer = new Timer(this, 400, 0, 5, 4000);

        this.scene.launch("Pause");
        this.scene.pause("Pause");
        this.scene.launch("Retry");
        this.scene.pause("Retry");
        this.scene.launch("Win");
        this.scene.pause("Win");
        this.scene.launch("Story");
        this.scene.bringToTop(this);
        this.do_story();
    }

    do_story(){
        this.scene.pause();
        this.scene.bringToTop(this.scene.get('Story'));
    }

    globals_setup(num){
        this.level_num = num;
        this.sys.game.globals.currentLevel = this;
        this.sys.game.globals.currentLevelString = "Level"+this.level_num;
        
    }

    score_setup(){
        this.sys.game.globals.score = 0;
        this.scoreText = this.add.text(0, 16, 'Level ' + this.level_num + ' Score: ' + this.sys.game.globals.score, { fontSize: '16px', fill: '#CCC' });
        this.scoreText.setScrollFactor(0);
    }

    create_asteroids(){
        //Timer for asteroids
        this.timedEvent = this.time.addEvent({
            delay: 5000,
            callback: this.spawnAsteroid,
            callbackScope: this,
            repeat: 999999,
            startAt: 1
        });
    }

    create_platforms(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(3069/2, 750+25, 'ground').setScale((3069/400), (50/32)).refreshBody();
        this.platforms.create(1610+857/2, 570+(180/2), 'ground').setScale((857/400), (180/32)).refreshBody();
        this.platforms.create(2404, 304, 'ground').setScale(1.65, 1.25).refreshBody();
        this.platforms.create(2067, 277, 'ground').setScale(0.035, 0.4375).refreshBody();
        this.platforms.create(4395.5, 775, 'ground').setScale(4.5925, 1.5625).refreshBody();
        this.platforms.create(4252, 183, 'ground').setScale(0.75, 1.25).refreshBody();
        this.platforms.create(4713.5, 470, 'ground').setScale(1.0025, 1.25).refreshBody();
        this.platforms.create(7719, 775, 'ground').setScale(8.93, 1.5625).refreshBody();
        this.platforms.create(6606.5, 400, 'ground').setScale(0.3675, 1.25).refreshBody();
        this.platforms.create(7176, 705, 'ground').setScale(2.25, 2.8125).refreshBody();
        this.platforms.create(7280, 249, 'ground').setScale(1.5, 1.25).refreshBody();
        this.platforms.create(9055, 705, 'ground').setScale(2.25, 2.8125).refreshBody();
    }

    create_aliens(){
        //setup aliens
        // this.aliens.push(this.physics.add.sprite(500, 450, 'alien'));
    }

    create_player(){
        this.player = this.physics.add.sprite(9100, 450, 'spaceDog');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //animation creation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 0, end: 3 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'disapear',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 20, end: 23 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'crawl',
            frames: this.anims.generateFrameNumbers('spaceDogCrawl'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'duck',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: 0,
            nextAnim: "crawl"
        });
        
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 20, end: 23 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'damage',
            frames: this.anims.generateFrameNumbers('spaceDog', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

    }

    create_geysers(){

        this.anims.create({
            key: 'geysers',
            frames: this.anims.generateFrameNumbers('geyser'),
            frameRate: 8,
            repeat: -1
        });

        //setup geyers
        this.geysers.push(this.physics.add.sprite(3000, 200, 'geyser'));

    }

    create_portal(){

        this.anims.create({
            key: 'Portal',
            frames: this.anims.generateFrameNumbers('portal'),
            frameRate: 8,
            repeat: -1
        });

        this.portal = this.physics.add.sprite(9343, 660, 'portal');
        this.portal.anims.play('Portal');
    }

    setup_collisions(){

        //setup collision between portal and platforms
        this.physics.add.collider(this.portal, this.platforms);

        //setup collision between player and portal
        this.physics.add.overlap(this.player, this.portal, function () {
            if (!this.finished) {
                this.physics.pause();
                this.player.anims.play('disapear');
                setTimeout(() => {
                    this.physics.resume();
                    this.scene.pause();
                    this.scene.resume("Win");
                    this.scene.bringToTop(this.scene.get('Win'));
                }, 1000);


            }
            this.finished = true;
        }.bind(this));

        //player and platform collisions
        this.physics.add.collider(this.player, this.platforms, function(){
            this.jump_collide();
        }.bind(this));

        //geyser collisions

        for (var i=0; i<this.geysers.length; i++){
            var geyser = this.geysers[i];
            console.log(geyser);
            geyser.anims.play('geysers'); //play animation
            this.physics.add.collider(geyser, this.platforms); //collision with platforms
            this.physics.add.overlap(this.player, geyser, function () { //collision with player
                this.jump_collide();
                this.timer.restart();
            }.bind(this));
        }

        //alien collisions

        for (var i=0; i<this.aliens.length; i++){
            var alien = this.aliens[i];
            this.physics.add.collider(alien, this.platforms);
            alien.setBounce(0.2);
            alien.setCollideWorldBounds(true);
            this.alienAnims();
            alien.anims.play('AlienWalk', true);
            alien.setVelocityX(100);
            var playerAlienCollider = this.physics.add.collider(this.player, alien, function () { //collision with player
                this.jump_collide();
                if (this.bark==3){ //bark is in kill state
                    alien.play("AlienDying");
                    playerAlienCollider.destroy();
                    setTimeout(() => {
                        alien.destroy();
                        this.sys.game.globals.score+=100;
                    }, 1000);
                }
                else if (this.invincible==false){
                    alien.setBounce(0.0);
                    this.invincible = true;
                    this.timer.pop();
                    //this.player.anims.play('damage');
                    console.log("Hit alien number: "+i);
                    var time = 166;
                    for (var i=0; i<6; i+=2){
                        setTimeout(()=>{
                            this.player.setAlpha(0.5);
                        },i*time);
                        setTimeout(()=>{
                            this.player.setAlpha(1);
                        },(i+1)*time);
                    }
                    setTimeout(() =>{ this.invincible=false; this.player.setAlpha(1);}, time*6);
                }
            }.bind(this));
        }
    }

    changePlayer() {
        if (!this.duck && !this.crawl) {
            this.duck = true;
            this.player.play('duck', true);
            setTimeout(() => {
                if (this.duck) {
                    this.player.setTexture('spaceDogCrawl');
                    this.player.setSize(128, 64);
                    this.player.setY(this.player.y + 12);
                    this.player.anims.play('crawl', true);
                    this.duck = false;
                    this.crawl = true;
                }
            }, 400);
        }
        else if (this.crawl || this.duck) {
            var temp = this.crawl;
            this.crawl = false;
            this.duck = false;
            if (temp) {
                this.player.setTexture('spaceDog');
                this.player.setSize(128, 96); 
                this.player.play('walk', true);
                this.player.setY(this.player.y - 14);
            }
        }
    }


    alienAnims() {
        this.anims.create({
            key: 'AlienWalk',
            frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'AlienDying',
            frames: this.anims.generateFrameNumbers('alien', { start: 8, end: 12 }),
            frameRate: 10,
            repeat: 0
        });
    }

    onEvent() {
        // console.log("onevent");
        // console.log(this.cameras.main.worldView.x);
        // console.log(this.cameras.main.worldView.x + 800);
    }
    escOnly() {
        if (this.gamePaused == false) {
            this.gamePaused = true;
            console.log("ESC + game not paused");
            // console.log("game paused? " + this.gamePaused);
            //Have to check if game over or not 
            this.do_pause();
        }
        else console.log("ESC + game paused");

    }
    // Start Pause - Player stop moving, Sprite stop moving, Sprites stop spawning
    do_pause(){
        console.log('Start Pause');
        //this.physics.pause();
        this.scene.pause();
        this.scene.resume("Pause");
        this.scene.bringToTop(this.scene.get('Pause'));
    }
    
    otherKey(event){
        // console.log("other event");
        // console.log(event.keyCode)
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
    createGameOverScreen(msg) {
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
        var font_size = 1000/msg.length
        font_size = `${font_size}px`
        this.txt_pause = this.add.text(this.currentX + 400, 200, msg, {fontSize: font_size, fill: '#CCC'});
        this.txt_pause.setOrigin(.5);

        // this.txt_pause.setDepth(5);
        // this.txt_pause.setScrollFactor(0);
    }
    triggerGameOver(msg) {
        console.log('Trigger Game Over');
        this.sys.game.globals.deathMsg = msg;
        console.log(this.sys.game.globals.deathMsg);
        this.scene.pause();
        this.scene.resume("Retry");
        this.scene.bringToTop(this.scene.get('Retry'));
    }


    callAsteroid() {
        console.log("time went off")
    }

    // collectStar (player, star){
    //     star.disableBody(true, true);
    // }

    updateScore() {
    
        this.scoreText.setText("Level "+this.level_num+" Score: "+this.sys.game.globals.score);
    
    }

    add_keys(){
        this.shift = this.input.keyboard.addKey("SHIFT");
        this.spacebar = this.input.keyboard.addKey("SPACE");
        this.esc = this.input.keyboard.addKey("ESC",true,false);
    }

    jump_collide(){
        setTimeout(() => {
            this.jumpLock = !this.jumpLock;
        }, 80);
        if (!this.jumpLock){
            this.jump = false;
            this.jumpLock = true;
        } 

    }


    update() {
        this.updateScore();
        var run = false;
        if (!this.finished) {

            if (this.esc.isDown && this.gamePaused==false){
                this.escOnly();
            }
            this.esc.isDown = false;
            this.gamePaused = false;
            if (this.shift.isDown) {
                run = true;
            }

            if (this.shift.isUp) {
                run = false;
            }   

            if (this.spacebar.isDown){
                if (this.bark==0){
                    this.bark = 3;
                    console.log("Bark!");
                    this.sound.play('bark');
                    setTimeout(()=>{
                        console.log("End bark");
                        this.bark--; //bark will kill
                        setTimeout(()=>{
                            console.log("Bark cooldown over");
                            this.bark--; //bark is now cooling down
                        },500); //make this time to wait until you can bark again (cooldown)
                    },270); //make this length of bark animation
                }
            }

            if (this.spacebar.isUp){
                if (this.bark==1) this.bark--; //set it so bark can be used again
            }

            if ((this.cursors.up.isDown || this.cursors2.up.isDown)&& !this.crawl && !this.jump) {
                this.player.play('jump', true);
                this.jump = true;
            }

            
            if (this.cursors.left.isDown || this.cursors2.left.isDown) {
                if (!this.player.flipX) {
                    this.player.flipX = true;
                }
                if (!this.duck) {
                    if (run) this.player.setVelocityX(-600);
                    else this.player.setVelocityX(-200);
                
                    if (!this.jump) {
                        if (this.crawl) this.player.anims.play('crawl', true);
                        else if (run) this.player.anims.play('run', true);
                        else this.player.anims.play('walk', true);
                    }
                }
            }
            else if (this.cursors.right.isDown || this.cursors2.right.isDown) {
                if (this.player.flipX) {
                    this.player.flipX = false;
                }

                if (!this.duck) {
                    if (run) this.player.setVelocityX(600);
                    else this.player.setVelocityX(200);
                

                    if (!this.jump) {
                        if (this.crawl) this.player.anims.play('crawl', true);
                        else if (run) this.player.anims.play('run', true);
                        else this.player.anims.play('walk', true);
                    }
                }
            }
            else {
                this.player.setVelocityX(0);

                if (!this.jump && !this.crawl) this.player.play("walk");

                if (!this.duck) this.player.anims.pause();
            }
        }

            if ((this.cursors.up.isDown || this.cursors2.up.isDown )&& this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
            this.currentX = this.cameras.main.worldView.x;
            if (this.dead) {
                this.triggerGameOver("You got hit by a meteor, ouch!");
                this.scene.pause();
                return;
            }
            if (this.timer.expired){
                this.triggerGameOver("You ran out of air!");
                this.scene.pause();
                return;
            }

            if (this.player.y > 700){
                this.triggerGameOver("You fell to your death :(");
                this.scene.pause();
                return;
            }

        }
    };