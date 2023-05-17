class intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create(){
        this.textObject = this.add.text(60, 192, 'Johnny is having a big family reunion, with his massive family, and he is tasked with dessert!\nJohnny sets out to make the greatest apple pie ever made.\nThe exotic flavor will be obtained by using small parts of many apples...', {font: "30px Trebuchet MS", color: "#000000",});
        this.textObject2 = this.add.text(1280, 500, `Continue`, {font: "30px Trebuchet MS",color: "#000000",})
            .setInteractive()
            .on('pointerdown', () => {this.scene.start('stage1')})

    }
    

}
class middle extends Phaser.Scene {
    constructor() {
        super('middle')
    }
    create(){
        this.scene.remove('stage1')
        this.textObject = this.add.text(60, 192, "Bad news. It turns out the host of the reunion says everyone can invite their friends, and of course everyone will.\nWe’re gonna need more apples! Will this pie even fit on the table?", {font: "30px Trebuchet MS", color: "#000000",});
        this.textObject2 = this.add.text(1280, 500, `Continue`, {font: "30px Trebuchet MS",color: "#000000",})
            .setInteractive()
            .on('pointerdown', () => {this.scene.start('stage2')})

    }
    

}
class middle2 extends Phaser.Scene {
    constructor() {
        super('middle2')
    }
    create(){
        this.scene.remove('stage2')
        this.textObject = this.add.text(60, 192, 'Johnny is exhausted. He’s gotten so mad over making the great apple pie in existence, that he has searched the entire earth\nand has gotten every apple left. Johnny says, “A pie made out of just earth apples will not do!”', {font: "30px Trebuchet MS", color: "#000000",});
        this.textObject2 = this.add.text(1280, 500, `Continue`, {font: "30px Trebuchet MS",color: "#000000",})
            .setInteractive()
            .on('pointerdown', () => {this.scene.start('stage3')})

    }
}
class end extends Phaser.Scene {
    constructor() {
        super('end')
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('end', 'TheEnd.png')

    }
    create(){
        this.scene.remove('stage3')
        this.textObject = this.add.text(60, 400, 'In the end, the pie was so big Johnny needed aliens to focus the sun onto the pie to bake it. He invited everyone in the universe to eat\nthe pie, and it was the greatest ever made.', {font: "30px Trebuchet MS", color: "#000000",});
        this.end = this.add.image(990, 640, 'end')
            .setScale(1.5)
    }
}
class stage1 extends Phaser.Scene {
    constructor() {
        super('stage1')
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('floor', 'Floor.png')
        this.load.image('house', 'House.png')
        this.load.image('tree', 'Tree.png')
        this.load.image('apple', 'Apple.png')
        this.load.image('human', 'Human.png')
    }
    create(){
        this.scene.remove('intro')
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(700, 1000, 'floor')//.setScale(3);
        this.platforms.create(300, 700, 'house').setSize(150, 160)
        this.add.image(600, 700, 'tree')
        this.add.image(800, 700, 'tree')
        this.add.image(1100, 700, 'tree')
        this.add.image(1300, 700, 'tree')
        this.apples = this.physics.add.staticGroup();
        this.apples.create(1300, 600, 'apple').setScale(0.5)
        this.apples.create(1075, 620, 'apple').setScale(0.5)
        this.apples.create(800, 600, 'apple').setScale(0.5)
        this.apples.create(625, 650, 'apple').setScale(0.5)
        this.apples.create(100, 800, 'apple').setScale(0.5)
        this.player = this.physics.add.sprite(500, 600, 'human').setScale(0.3)
        this.player.airjump = false;
        //this.player.setCollideWorldBounds(true);
        //this.physics.add.image(1300, 200, 'apple').setScale(0.5).setBounce(0.2)
        //this.player.body.allowGravity = false
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.house)
        this.physics.add.overlap(this.player, this.apples, this.collectapple, null, this)
        this.counter = 0;
        this.curvelocity = 0;
       
    }
    update(){
        const { left, right, up } = this.cursors;
        if((this.curvelocity < 0) && (left.isDown == false)){
            this.curvelocity = this.curvelocity + 3
        }
        if((this.curvelocity > 0) && (right.isDown == false)){
            this.curvelocity = this.curvelocity - 3;
        }
        //160 for right, -160 for left
        if (left.isDown && (this.curvelocity > (-160)))
        {
            //this.player.setVelocityX(-160);
            this.player.setVelocityX(this.curvelocity);
            this.curvelocity = this.curvelocity - 3;
        }
        else if (right.isDown && (this.curvelocity < 160))
        {
            //this.player.setVelocityX(160);
            this.player.setVelocityX(this.curvelocity);
            this.curvelocity = this.curvelocity + 3;
        }
        else
        {
            this.player.setVelocityX(this.curvelocity);

        }
        if(this.player.body.touching.down){
            this.player.airjump = true;
        }
        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-430);
            this.recenttime = this.game.getTime();
            //this.player.airjump = true;
            //up.timeUp = up.timeDown
        }
        else if ((this.player.body.touching.down == false) && ((this.game.getTime() - this.recenttime) > 500) && this.player.airjump && up.isDown){
            this.player.airjump = false;
            this.player.setVelocityY(-430);
        }
        if(this.counter == 5){
            this.scene.start('middle')
        }
    }
    collectapple(player, apple){
        apple.disableBody(true, true)
        this.counter = this.counter + 1;
    }
}
class stage2 extends Phaser.Scene {
    constructor() {
        super('stage2')
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('floor', 'Floor.png')
        this.load.image('hill', 'Hill.png')
        this.load.image('house', 'House.png')
        this.load.image('tree', 'Tree.png')
        this.load.image('apple', 'Apple.png')
        this.load.image('human', 'Human.png')
        this.load.image('cloud', 'Cloud.png')
    }
    create(){
        this.scene.remove('middle')
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(700, 1225, 'floor')
        //this.add.image(500, 760, 'hill').setAlpha(0.9)
        /*this.platforms.create(500, 1050, 'hill1').setSize(402, 56).setScale(2)
        this.platforms.create(900, 900, 'hill2').setSize(402, 226).setScale(2)
        this.platforms.create(1300, 900, 'hill3').setSize(402, 226).setScale(2)
        this.platforms.create(1700, 1050, 'hill4').setSize(402, 56).setScale(2)*/
        this.platforms.create(400, 600, 'floor').setSize(240, 35).setScale(0.1)
        this.platforms.create(900, 800, 'floor').setSize(240, 35).setScale(0.1)
        this.platforms.create(400, 600, 'floor').setSize(240, 35).setScale(0.1)
        this.platforms.create(1400, 750, 'floor').setSize(240, 35).setScale(0.1)
        this.add.image(1700, 925, 'tree')
        this.add.image(400, 200, 'cloud')
        this.add.image(1000, 150, 'cloud')
        this.add.image(1600, 250, 'cloud')
        this.apples = this.physics.add.staticGroup();
        this.apples.create(400, 200, 'apple').setScale(0.5)//.setCircle(17).setOffset(22, 40)
        this.apples.create(1700, 825, 'apple').setScale(0.5)
        this.apples.create(1075, 620, 'apple').setScale(0.5)
        this.apples.create(350, 550, 'apple').setScale(0.5)
        this.apples.create(450, 550, 'apple').setScale(0.5)
        this.platforms.create(1700, 650, 'floor').setSize(240, 35).setScale(0.1)
        this.apples.create(1700, 600, 'apple').setScale(0.5)
        
        this.player = this.physics.add.sprite(500, 960, 'human').setScale(0.3)
        this.player.airjump = false;
        this.player.setCollideWorldBounds(true);
        //this.player.setCollideWorldBounds(true);
        //this.physics.add.image(1300, 200, 'apple').setScale(0.5).setBounce(0.2)
        //this.player.body.allowGravity = false
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.house)
        this.physics.add.overlap(this.player, this.apples, this.collectapple, null, this)
        this.counter = 0;
        this.curvelocity = 0;
        //this.mytri = this.add.triangle(1000, 500, 100, 100, 200, 100, 150, 50, 0xFFFF00, 1)
        //this.physics.add.existing(this.mytri)
    }
    update(){
        const { left, right, up } = this.cursors;
        if((this.curvelocity < 0) && (left.isDown == false)){
            this.curvelocity = this.curvelocity + 3
        }
        if((this.curvelocity > 0) && (right.isDown == false)){
            this.curvelocity = this.curvelocity - 3;
        }
        //160 for right, -160 for left
        if (left.isDown && (this.curvelocity > (-160)))
        {
            //this.player.setVelocityX(-160);
            this.player.setVelocityX(this.curvelocity);
            this.curvelocity = this.curvelocity - 3;
        }
        else if (right.isDown && (this.curvelocity < 160))
        {
            //this.player.setVelocityX(160);
            this.player.setVelocityX(this.curvelocity);
            this.curvelocity = this.curvelocity + 3;
        }
        else
        {
            this.player.setVelocityX(this.curvelocity);

        }
        if(this.player.body.touching.down){
            this.player.airjump = true;
        }
        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-430);
            this.recenttime = this.game.getTime();
            //this.player.airjump = true;
            //up.timeUp = up.timeDown
        }
        else if ((this.player.body.touching.down == false) && ((this.game.getTime() - this.recenttime) > 500) && this.player.airjump && up.isDown){
            this.player.airjump = false;
            this.player.setVelocityY(-430);
        }
        if(this.counter == 6){
            this.scene.start('middle2')
        }
        



    }
    collectapple(player, apple){
        apple.disableBody(true, true)
        this.counter = this.counter + 1;
    }
}
class stage3 extends Phaser.Scene {
    constructor() {
        super('stage3')
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('moonfloor', 'MoonPlatform.png')
        this.load.image('star', 'Star.png')
        this.load.image('apple', 'Apple.png')
        this.load.image('human', 'Human.png')
        this.load.image('planet1', 'Planet1.png')
        this.load.image('planet2', 'Planet2.png')

    }
    create(){
        this.scene.remove('middle2')
        //this.cameras.main.setBackgroundColor('#201F3D')
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(500, 1010, 'moonfloor').setSize(1000, 140).setScale(5)
        this.platforms.create(1500, 1010, 'moonfloor').setSize(1000, 140).setScale(5)
        this.apples = this.physics.add.staticGroup();
        this.apples.create(1200, 910, 'apple').setScale(0.5)
        this.apples.create(200, 910, 'apple').setScale(0.5)
        this.apples.create(1400, 695, 'apple').setScale(0.5)
        this.add.image(1300, 820, 'star').setScale(0.3)
        this.add.image(700, 750, 'star').setScale(0.3)
        this.platforms.create(400, 300, 'planet1').setCircle(95).setOffset(10, 5)
        this.platforms.create(1600, 250, 'planet2').setCircle(95).setOffset(10, 5)
        this.apples.create(425, 185, 'apple').setScale(0.5)
        this.apples.create(135, 115, 'apple').setScale(0.5)
        this.add.image(100, 150, 'star').setScale(0.5)
        this.platforms.create(500, 650, 'moonfloor').setSize(400, 56).setScale(2)
        this.platforms.create(1300, 750, 'moonfloor').setSize(400, 56).setScale(2)
        this.platforms.create(990, 375, 'moonfloor').setSize(400, 56).setScale(2)
        this.player = this.physics.add.sprite(500, 850, 'human').setScale(0.3)
        this.player.airjump = false;
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.house)
        this.physics.add.overlap(this.player, this.apples, this.collectapple, null, this)
        this.counter = 0;
        this.curvelocity = 0;
       
    }
    update(){
        const { left, right, up } = this.cursors;
        if((this.curvelocity < 0) && (left.isDown == false)){
            this.curvelocity = this.curvelocity + 3
        }
        if((this.curvelocity > 0) && (right.isDown == false)){
            this.curvelocity = this.curvelocity - 3;
        }
        //160 for right, -160 for left
        if (left.isDown && (this.curvelocity > (-160)))
        {
            //this.player.setVelocityX(-160);
            this.player.setVelocityX(this.curvelocity);
            this.curvelocity = this.curvelocity - 3;
        }
        else if (right.isDown && (this.curvelocity < 160))
        {
            //this.player.setVelocityX(160);
            this.player.setVelocityX(this.curvelocity);
            this.curvelocity = this.curvelocity + 3;
        }
        else
        {
            this.player.setVelocityX(this.curvelocity);

        }
        if(this.player.body.touching.down){
            this.player.airjump = true;
        }
        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-430);
            this.recenttime = this.game.getTime();

            //up.timeUp = up.timeDown
        }
        else if ((this.player.body.touching.down == false) && ((this.game.getTime() - this.recenttime) > 500) && this.player.airjump && up.isDown){
            this.player.airjump = false;
            this.player.setVelocityY(-430);
        }
        if(this.counter == 5){
            this.scene.start('end')
        }
        



    }
    collectapple(player, apple){
        apple.disableBody(true, true)
        this.counter = this.counter + 1;
    }
}
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: 0x87CEEB,
    //scene: stage1,
    scene: [intro, stage1, middle, stage2, middle2, stage3, end],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
}
let game = new Phaser.Game(config);