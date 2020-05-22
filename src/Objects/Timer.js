import 'phaser';

export default class Timer extends Phaser.GameObjects.Container {
  constructor(scene,x,y,bubbles,time) {
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
    s1.setScale(2);
    
    this.width = s1.displayWidth;
    this.height = s1.displayHeight;

    s1.destroy(true);

    for (var i=bubbles-1; i>=0; i--){
        var sprite = this.scene.add.sprite(x-this.width-10, (y+i)*(this.height+5)+10, this.sprite); // TODO: Change where bubbles lay
        sprite.setScale(2);
        sprite.setOrigin(0.0,0.0);  //TODO: Change where bubbles lay
        sprite.setScrollFactor(0);
        this.bubbles.push(sprite);
        this.add(sprite);
    }


    this.scene.add.existing(this);

    this.restart();
  }

  pop() {

    this.cancel_events(false);

    var sprite = this.bubbles[this.bubbles.length - this.bubblesLeft];
    sprite.setActive(false).setVisible(false);

    this.bubblesLeft--;
    if (this.bubblesLeft==0){
        this.expired = true;
        console.log("Game over!");
    }
    else { //make the next bubble event
      this.events.push(this.clock.addEvent({
        delay:this.time,
        callback: this.pop,
        callbackScope: this,
        args: []
      }));
    }

  }

  restart(){


    this.cancel_events(true);
    
    //make the first bubble
    this.events.push(this.clock.addEvent({
        delay:this.time,
        callback: this.pop,
        callbackScope: this,
        args: []
    }));

  }

  cancel_events(reset){
    if (reset) this.bubblesLeft = this.bubbles.length;
    for (var i = 0; i<this.bubbles.length; i++){
      if (reset) this.bubbles[i].setActive(false).setVisible(true);
      var event = this.events.pop();
      if (event) event.remove();
    }
  }
}