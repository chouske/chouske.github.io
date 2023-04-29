class intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('logo', 'logo.png');
    }
    create(){
    
    this.textObject = this.add.text(300, 400,
        `Fruitastic Fun
    Studios`, 
        {
            font: "40px Trebuchet MS",
            color: "#000000",
        } //style
    );
    this.textObject.setWordWrapWidth(1000); 
    this.logo = this.add.image(
        400,//x
        250,//y
        'logo',//imagename
    )
    this.logo.setScale(0.5);
    this.logo.setAlpha(0);
    this.textObject.setAlpha(0);
    this.tweens.add({
        targets: [this.logo, this.textObject], 
        alpha:1,
        duration: 2500,
        ease: 'Linear',
        repeat: 0,
     });
     this.time.delayedCall(3000, () => {
        this.scene.start('middle')
     })
    //create image object 
    // this.imageObject = this.add.image(
    //     400,//x
    //     250,//y
    //     'sectionimage',//imagename
    // )
   // this.imageObject.setScale(0.8) //resize
    // Add tweens

   
   
    
    }
    update(){}
}
class middle extends Phaser.Scene {
    constructor() {
        super('middle');
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio("owl", ["owl.mp3"]);
    }
    create(){
    this.graphics = this.add.graphics();
    this.graphics2 = this.add.graphics();
    this.graphics3 = this.add.graphics();
    this.graphics4 = this.add.graphics();
    this.cameras.main.setBackgroundColor('0x0000FF');
    this.graphics.fillStyle(0x808588, 1);
    this.graphics2.fillStyle(0x808588, 1);
    this.graphics3.fillStyle(0x808588, 1);
    this.graphics.fillTriangle(0, 900, 266, 900, 133, 600);
    this.graphics2.fillTriangle(216, 1200, 582, 1200, 399, 800);
    this.graphics3.fillTriangle(532, 900, 800, 900, 665, 600);
    this.graphics.fillStyle(0xFFFFFF, 1);
    this.graphics2.fillStyle(0xFFFFFF, 1);
    this.graphics3.fillStyle(0xFFFFFF, 1);
    this.graphics.fillTriangle(66.5, 750, 199.5, 750, 133, 600);
    this.graphics2.fillTriangle(307.5, 1000, 490.5, 1000, 399, 800);    
    this.graphics3.fillTriangle(598.5, 750, 733.5, 750, 665, 600);
    this.graphics4.fillStyle(0xFFFFFF, 1);
    this.graphics4.fillEllipse(0, 0, 200, 200)
    this.owl = this.sound.add("owl", { loop: false });
    this.owl.play();
    this.tweens.add({
        targets: this.graphics, 
        duration: 2500,
        y: -300,
        ease: 'Linear',
        repeat: 0,
     });
     this.time.delayedCall(2500, () => {
        this.tweens.add({
            targets: this.graphics3, 
            duration: 2500,
            y: -300,
            ease: 'Linear',
            repeat: 0,
         });
     })
     this.time.delayedCall(5000, () => {
        this.tweens.add({
            targets: this.graphics2, 
            duration: 2500,
            y: -600,
            ease: 'Linear',
            repeat: 0,
         });
     })
     
     this.time.delayedCall(7500, () => {
        this.tweens.add({
            targets: [this.graphics, this.graphics2, this.graphics3, this.graphics4], 
            duration: 2500,
            alpha: 0,
            ease: 'Linear',
            repeat: 0,
         });
     })
     this.time.delayedCall(10500, () => {
        this.scene.start('title')
     })
   
        
    
    //this.graphics.fillRect(600,50,150,100); //x1,y1, width, height
    //create text object
   
    
    
    //create image object 
    // this.imageObject = this.add.image(
    //     400,//x
    //     250,//y
    //     'sectionimage',//imagename
    // )
   // this.imageObject.setScale(0.8) //resize
    // Add tweens

   
   
    
    }
    update(){}
}
class title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('melon', 'melon.png');
        this.load.audio("music", ["music.mp3"]);
        this.load.image('thetitle', 'thetitle.png');
    }
    create(){
    //this.graphics = this.add.graphics();
    //this.graphics.fillStyle(0xff9900, 1);
   // this.graphics.fillRect(600,50,150,100); //x1,y1, width, height
    //create text object
    this.cameras.main.setBackgroundColor('0x4AF1F2');
    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x808588, 1);
    this.graphics.fillTriangle(600, 600, 800, 600, 800, 100);
    this.graphics.fillStyle(0xFFFFFF, 1);
    this.graphics.fillTriangle(700, 350, 800, 350, 800, 100);
    this.melon = this.add.image(
        675,//x
        250,//y
        'melon',//imagename
    )
    this.thetitle = this.add.image(
        400,//x
        50,//y
        'thetitle',//imagename
    )
    this.thetitle.setScale(0.5);
    this.melon.setScale(0.2);
    this.melon.angle = 291.8014095;
    this.mytext = this.add.text(
        -200, //x
        200,//y
        "Play", //text
        {
            font: "40px Arial",
            color: "#000000",
        } //style
    );
    this.mytext2 = this.add.text(
        -200, //x
        250,//y
        "Settings", //text
        {
            font: "40px Arial",
            color: "#000000",
        } //style
    );
    this.mytext3 = this.add.text(
        -200, //x
        300,//y
        "Exit", //text
        {
            font: "40px Arial",
            color: "#000000",
        } //style
    );
    this.tweens.add({
        targets: this.mytext, 
        duration: 750,
        x: 50,
        ease: 'Linear',
        repeat: 0,
     });
    this.time.delayedCall(750, () => {
        this.tweens.add({
            targets: this.mytext2, 
            duration: 750,
            x: 50,
            ease: 'Linear',
            repeat: 0,
         });
     })
     this.time.delayedCall(1500, () => {
        this.tweens.add({
            targets: this.mytext3, 
            duration: 750,
            x: 50,
            ease: 'Linear',
            repeat: 0,
         });
     })
    this.music = this.sound.add("music", { loop: true });
    this.music.play();

    }
    update(){}
}
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0xFF69B4,
    scene: [intro, middle, title],
}
let game = new Phaser.Game(config);