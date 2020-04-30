import 'phaser';

export default class Timer extends Phaser.GameObjects.Container {
  constructor(scene, x, y,bubbles,time) {
    super(scene,x,y,null);
    this.clock = this.scene.time;
    this.scene = scene;
    this.time = time;
    this.x = x;
    this.y = y;
    this.sprite = "bubble";
    this.prev = 0;
    this.events = [];
    this.bubbles = [];
    this.bubblesLeft = bubbles;
    this.expired = false;

    var s1 = this.scene.add.sprite(x,y, this.sprite);
    
    this.width = s1.displayWidth;
    this.height = s1.displayHeight;

    s1.destroy(true);

    for (var i=0; i<bubbles; i++){
        var sprite = this.scene.add.sprite(x+i*(this.width+5), y, this.sprite);
        sprite.setOrigin(0.0,0.0);
        sprite.setScrollFactor(0);
        this.bubbles.push(sprite);
        this.add(sprite);
    }


    this.scene.add.existing(this);

    this.restart();
  }

  pop(sprite) {
    sprite.setActive(false).setVisible(false);

    this.bubblesLeft--;
    if (this.bubblesLeft==0){
        this.expired = true;
        console.log("Game over!");
    }

  }

  restart(){

    var i; 
    var j = this.events.length;
    for (i = 0; i<j; i++){
        this.bubbles[i].setActive(false).setVisible(true);
        var event = this.events.pop();
        event.remove();
    }

    this.bubblesLeft = this.bubbles.length;

    for (i=0; i<this.bubbles.length; i++){
        this.events.push(this.clock.addEvent({
            delay:this.time*(i+1),
            callback: this.pop,
            callbackScope: this,
            args: [this.bubbles[i]]
        }));
    }

  }
}