class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}
class myintro extends Phaser.Scene{
    constructor() {
        super('myintro');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('road', 'Road.png')
        this.load.image('welcome', 'Welcome.png')
    }
    create(){
        this.cameras.main.setBackgroundColor('0xFFFFFF');
        this.road = this.add.image(1440, 540, 'road');
        this.road.setScale(3)
        this.welcome = this.add.image(480, 540, 'welcome')
        this.welcome.setScale(2)
        this.road.setInteractive({useHandCursor: true})
        this.road.on('pointerdown', () => this.scene.start('room1'))
    }

}
class myoutro extends Phaser.Scene{
    constructor() {
        super('myoutro');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('road', 'Road.png')
        this.load.image('goodbye', 'Goodbye.png')
    }
    create(){
        this.cameras.main.setBackgroundColor('0xFFFFFF');
        this.road = this.add.image(480, 540, 'road');
        this.road.setScale(3)
        this.welcome = this.add.image(1440, 540, 'goodbye')
        this.welcome.setScale(2)
    }

}
class room1 extends AdventureScene{
    constructor(){
        super("room1", "Monkey exhibit")
        this.backpackexists = true;
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('monkey', 'Monkey.png')
        this.load.image('elephantdoor', 'ElephantDoor.png')
        this.load.image('jaguardoor', 'JaguarDoor.png')
        this.load.image('tree', 'Tree.png')
        this.load.image('peanut', 'Peanut.png')
        this.load.image('backpack', "BackPack.png")
        
    }
    shake(theobj){
        this.tweens.add({
            targets: theobj, 
            duration: 250,
            x: theobj.x + 50,
            yoyo: true,
            ease: 'Linear',
            repeat: 0,
         });
    }
    pickupandtext(myobj, mytext){
        this.showMessage(mytext)
        this.gainItem(myobj)
    }
    onEnter() {
        this.cameras.main.setBackgroundColor('0xFFFFFF');
        this.trees = this.add.container(480, 270);
        this.trees.add(this.add.image(0, 0, 'tree'));
        this.trees.add(this.add.image(-240, 30, 'tree'));
        this.trees.add(this.add.image(180, -30, 'tree'));
        this.trees.add(this.add.image(360, -30, 'tree'));
        //this.trees.add(this.add.image(600, 0, 'tree'));
        this.elephantdoor = this.add.image(1375, 280, 'elephantdoor')
        .setInteractive()
        .on('pointerdown', () => {this.gotoScene("room2")})
        this.jaguardoor = this.add.image(1375, 680, 'jaguardoor')
        .setInteractive()
        .on('pointerdown', () => {this.gotoScene("room3")})
        this.trees.setScale(1.3);
        this.monkey = this.add.image(800, 700, 'monkey')
            .setInteractive()
            .on('pointerdown', () => {
                if (this.hasItem("Backpack")){
                    this.loseItem("Backpack")
                    this.showMessage("The monkey enjoys playing with your backpack")
                    this.time.delayedCall(3000, () => {this.showMessage("He gets you the peanuts in return")
                        this.peanut.destroy();
                        this.gainItem("Peanuts")

                    })
                   
                }
                else{
                    this.shake(this.monkey)
                    this.showMessage("The monkey's fur is soft")
                }
            })
            if(this.backpackexists == true){
                this.peanut = this.add.image(960, 135, 'peanut')
                .setInteractive()
                .setScale(0.1)
                .on('pointerover', () => {this.showMessage("You can't reach this")})
                this.backpack = this.add.image(1200, 700, 'backpack')
                .setScale(0.5)
                .setInteractive()
                .on('pointerdown', () => {this.pickupandtext("Backpack", "You pick up your backpack")
                    this.backpack.destroy()  
                    this.backpackexists = false  
                })
                .on('pointerover', () => {this.showMessage("Your backpack.")})
            }
            else{
                this.peanut.destroy()
                this.backpack.destroy()

            }
        
       

    }
}
class room2 extends AdventureScene{
    constructor(){
        super("room2", "Elephant exhibit")
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('monkeydoor', 'MonkeyDoor.png')
        this.load.image('tree', 'Tree.png')
        this.load.image('elephant', 'Elephant.png')
        this.load.image('lake', 'Lake.png')
        this.load.image('waterfall', 'Waterfall.png')
    }
    shake(theobj){
        this.tweens.add({
            targets: theobj, 
            duration: 250,
            x: theobj.x + 50,
            yoyo: true,
            ease: 'Linear',
            repeat: 0,
         });
    }
    pickupandtext(myobj, mytext){
        this.showMessage(mytext)
        this.gainItem(myobj)
    }
    onEnter() {
        this.cameras.main.setBackgroundColor('0xFFFFFF');
        this.tree = this.add.image(1100, 300, 'tree')
        this.waterfall = this.add.image(600, 480, 'waterfall')
        this.lake = this.add.image(800, 600, 'lake')
        this.tree.setScale(1.3)
        this.waterfall.setScale(1.3)
        this.monkeydoor = this.add.image(100, 580, 'monkeydoor')
            .setInteractive()
            .on('pointerdown', () => {this.gotoScene("room1")})
        this.elephant = this.add.image(775, 450, 'elephant')
        .setInteractive()
        .on('pointerdown', () => {
            if (this.hasItem("Peanuts")){
                this.loseItem("Peanuts")
                   this.showMessage("The elephant loves your peanuts")
                   this.time.delayedCall(3000, () => {this.showMessage("He gets happy and shoots water all over you")                    
                    this.gainItem("Wet Clothes")

                    })
                   
                }
                else{
                    this.showMessage("He has a cute face but I wouldn't want to get on his bad side")
                    this.shake(this.elephant)
                }
            })
    
    }
}
class room3 extends AdventureScene{
    constructor(){
        super("room3", "Jaguar exhibit")
        this.gotapple = false
        this.jaguargone = false;
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('tree', 'Tree.png')
        this.load.image('monkeydoor', 'MonkeyDoor.png')
        this.load.image('giraffedoor', 'GiraffeDoor.png')
        this.load.image('grass', 'Grass.png')
        this.load.image('jaguar', 'Jaguar.png')
        this.load.image('apple', 'Apple.png')
        
    }
    shake(theobj){
        this.tweens.add({
            targets: theobj, 
            duration: 250,
            x: theobj.x + 50,
            yoyo: true,
            ease: 'Linear',
            repeat: 0,
         });
    }
    pickupandtext(myobj, mytext){
        this.showMessage(mytext)
        this.gainItem(myobj)
    }
    onEnter() {
        this.cameras.main.setBackgroundColor('0xFFFFFF');
        this.tree = this.add.image(1200, 300, 'tree')
        this.grass1 = this.add.image(800, 600, 'grass')
            .setScale(0.3)
        this.grass2 = this.add.image(1000, 800, 'grass')
            .setScale(0.3)
        this.grass3 = this.add.image(600, 700, 'grass')
            .setScale(0.3)
        if(this.gotapple == false){
           
            this.apple1 = this.add.image(1200, 500, 'apple')
                .setScale(0.75)
                .setInteractive()
                .on('pointerdown', () => {
                    this.gotapple = true
                    this.pickupandtext("Apple", "You got an apple")
                
                    //this.gainItem("Apple")
                    //this.showMessage("You got an apple")
                    this.apple1.destroy()
                    })
                    .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("What's that?") 
                    })
            
        }
        this.apple2 = this.add.image(1200, 150, 'apple')
            .setScale(0.75)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("I can't reach this") 
                })
        this.apple3 = this.add.image(1150, 225, 'apple')
            .setScale(0.75)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("I can't reach this") 
                })
        this.apple4 = this.add.image(1250, 225, 'apple')
            .setScale(0.75)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("I can't reach this") 
                })
        this.grass4 = this.add.image(1200, 500, 'grass')
            .setScale(0.3)
        this.grass5 = this.add.image(1150, 525, 'grass')
            .setScale(0.3)
        this.tree.setScale(1.3)
        this.monkeydoor = this.add.image(100, 580, 'monkeydoor')
            .setInteractive()
            .on('pointerdown', () => {this.gotoScene("room1")})
        this.giraffedoor = this.add.image(1375, 580, 'giraffedoor')
            .setInteractive()
            .on('pointerdown', () => {
                if(this.jaguargone = true){
                this.gotoScene("room4")
                }
            })    
        this.jaguar1 = this.add.image(775, 450, 'jaguar')
            .setInteractive()
            .on('pointerdown', () => {this.showMessage("He purrs loudly")
            this.shake(this.jaguar1)
        })
            .on('pointerover', () => this.showMessage("They're less aggressive than I thought"))
        this.jaguar2 = this.add.image(475, 650, 'jaguar')
            .setInteractive()
            .on('pointerdown', () => {this.showMessage("He purrs loudly")
            this.shake(this.jaguar2)
        })
            .on('pointerover', () => this.showMessage("They're less aggressive than I thought"))
        if(this.jaguargone == false){
        this.jaguar3 = this.add.image(1350, 680, 'jaguar')
        .setInteractive()
        .on('pointerdown', () => {
            if (this.hasItem("Wet Clothes")){
                this.loseItem("Wet Clothes")
                   this.showMessage("The jaguar hates being wet and runs out of the way")       
                   this.jaguar3.destroy();
                   this.jaguargone = true;            
                }
                else{
                    this.showMessage("He's cute but he's blocking the door and won't move...")
                }
            })
        }
    }
}
class room4 extends AdventureScene{
    constructor(){
        super("room4", "Giraffe exhibit")
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('giraffe', 'Giraffe.png')
        this.load.image('exitdoor', 'ExitDoor.png')
        this.load.image('jaguardoor', 'JaguarDoor.png')
        this.load.image('grass', 'Grass.png')
      
        
    }
    pickupandtext(myobj, mytext){
        this.showMessage(mytext)
        this.gainItem(myobj)
    }
    shake(theobj){
        this.tweens.add({
            targets: theobj, 
            duration: 250,
            x: theobj.x + 50,
            yoyo: true,
            ease: 'Linear',
            repeat: 0,
         });
    }
    onEnter() {
        this.cameras.main.setBackgroundColor('0xFFFFFF');
        this.grass1 = this.add.image(800, 600, 'grass')
            .setScale(0.3)
        this.grass2 = this.add.image(1000, 800, 'grass')
            .setScale(0.3)
        this.grass3 = this.add.image(600, 700, 'grass')
            .setScale(0.3)
        this.grass4 = this.add.image(600, 700, 'grass')
            .setScale(0.3)
        this.grass5 = this.add.image(600, 700, 'grass')
            .setScale(0.3)
        this.exitdoor = this.add.image(1375, 580, 'exitdoor')
            .on('pointerdown', () => {this.showMessage("You can't go through")}) 
            .on('pointerover', () => {this.showMessage("Oh no, the exit is under construction")}) 
        this.jaguardoor = this.add.image(100, 580, 'jaguardoor')
            .setInteractive()
            .on('pointerdown', () => {this.gotoScene("room3")})
            
        this.giraffe1 = this.add.image(475, 650, 'giraffe')
            .setInteractive()
            .setScale(2)
            .on('pointerdown', () => {this.showMessage("It oddly makes no noise")
            this.shake(this.giraffe1)
        })
            .on('pointerover', () => this.showMessage("I wonder what the things on top of their heads are for?"))
        this.giraffe2 = this.add.image(975, 450, 'giraffe')
            .setInteractive()
            .setScale(2)
            .on('pointerdown', () => {
                if (this.hasItem("Apple")){
                    this.loseItem("Apple")
                       this.showMessage("It eats the apple rapidly. He helps you in return and carries you over the exit gate!")            
                       this.time.delayedCall(3000, () => this.scene.start("myoutro"))       
                    }
                    else{
                        this.showMessage("There must be something around here I can feed him")
                    }


            })
            .on('pointerover', () => this.showMessage("He looks hungry"))
   
        
    
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [myintro, room1, room2, room3, room4, myoutro],
    title: "Adventure Game",
});

