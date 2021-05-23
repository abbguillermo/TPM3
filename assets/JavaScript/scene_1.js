class scene_1 extends Phaser.Scene {
    constructor() {
        super("menu");
}

    preload (){
        this.load.image("button_play", "assets/Sprites/button_play.png");
        this.load.image("button_restart", "assets/Sprites/button_restart.png");
        this.load.image("background", "assets/Sprites/background_paper.png");
        this.load.image("lamp", "assets/Sprites/lamp.png");
        this.load.image("ground", "assets/Sprites/ground_v2.png");
        this.load.image("platform1", "assets/Sprites/platform_v2.png");
        this.load.image("platform2", "assets/Sprites/platform_2.png");
        this.load.image("leaves1", "assets/Sprites/leaves_1.png");
        this.load.image("leaves2", "assets/Sprites/leaves_2.png");
        this.load.image("leaves3", "assets/Sprites/leaves_3.png");
        this.load.image("coin", "assets/Sprites/coin.png");
        this.load.image("coin_small", "assets/Sprites/coin_small.png");
        this.load.image("shuriken", "assets/Sprites/shuriken.png");
        this.load.spritesheet("character", "assets/Sprites/spritesheet_player.png", {frameWidth: 110, frameHeight: 110});
        this.load.image("grass", "assets/Sprites/grass.png");
        this.load.image("ground_coins", "assets/Sprites/platform_v2_coins_arrows.jpg");
        this.load.audio("coin_big", "assets/Audio/coin_big.mp3");
        this.load.audio("coin_small", "assets/Audio/coin_small.mp3");
        this.load.audio("jump", "assets/Audio/jump.mp3");
        this.load.audio("gameover", "assets/Audio/gameover.mp3");
        this.load.audio("gameover1", "assets/Audio/gameover1.mp3");
        this.load.audio("gameover2", "assets/Audio/gameover2.mp3");
        this.load.audio("alert_shuriken", "assets/Audio/alert_shuriken.mp3");
        this.load.audio("alert_shuriken2", "assets/Audio/alert_shuriken_2.mp3");
        this.load.audio("click", "assets/Audio/click.mp3");
        this.load.audio("music_menu", "assets/Audio/music_menu.mp3");
        this.load.audio("music_gameplay", "assets/Audio/music_gameplay.mp3");
    }

    create() {

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("character", {start: 0, end: 7}),
            frameRate: 10,
            reapeat: -1
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("character", {start: 15, end: 8}),
            frameRate: 10,
            reapeat: -1
        });
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("character", {start: 16, end: 20}),
            frameRate: 10,
            reapeat: 1 
        });
        this.anims.create({
            key: "idle",
            frames: [{key: "character", frame: 21}],
        });
        this.anims.create({
            key: "fall",
            frames: [{key: "character", frame: 20}],
        })
        this.anims.create({
            key: "lose",
            frames: [{key: "character", frame: 19}],
        })

        this.click=this.sound.add("click", {loop:false});
        this.music_menu=this.sound.add("music_menu", {loop:true});
        this.music_menu.play();
        this.sound.pauseOnBlur=false

        var button_play = this.add.image(640, 360, "button_play")
            button_play.setInteractive()
            
            button_play.on("pointerdown", () => {this.sound.stopByKey("music_menu"), this.click.play(), this.scene.start("juego")} );
        
    }
}  