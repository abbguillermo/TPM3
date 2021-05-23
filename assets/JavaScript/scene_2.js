class scene_2 extends Phaser.Scene {
    constructor() {
        super("juego");
    }

    create (){
        this.music_gameplay=this.sound.add("music_gameplay", {loop:true}).setVolume(0.5) .setDetune(-100);
        this.music_gameplay.play();

        this.add.image(640, 360, "background");
        this.add.image(600, 460, "lamp");
        this.add.image(640, 592, "grass");
        this.add.image(1090, 430, "leaves1");
        this.add.image(185, 435, "leaves2");
        this.add.image(697, 253, "leaves3");
        
        platforms=this.physics.add.staticGroup();
        platforms.create(640, 662, "ground");
        platforms.create(580, 662, "ground_coins");
        platforms.create(-25, 390, "platform1");
        platforms.create(1250, 430, "platform1");
        platforms.create(685, 250, "platform2");
        platforms.create(0, 200, "platform2");
        platforms.create(1280, 225, "platform2");

        player=this.physics.add.sprite(50, 500, "character",).setScale(0.9).setSize(50, 90).setOffset(30, 16).refreshBody();
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }

        coins=this.physics.add.group({
            key: "coin",
            repeat: 11,
            setXY: {x: 35, y: 0, stepX: 110}
        });
        coins.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
        });

        coins_small=this.physics.add.group({
            key:"coin_small",
            repeat: 4,
            setXY: {x: 50, y: 0, stepX: 300}
        })
        coins_small.children.iterate(function(child){
            child.setBounceY(.8);
            child.setVelocity (Phaser.Math.Between(-200, 200), 200);
            child.setCollideWorldBounds(true);
        });

        shurikens=this.physics.add.group();

        scoreText=this.add.text(1120, 618, "0", {fontFamily:"Lucida", strokeThickness: 3, fontSize: "80px", fill: "#fff"});

        cursors=this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(coins, platforms);
        this.physics.add.collider(coins_small, platforms);
        this.physics.add.collider(shurikens, platforms);
        this.physics.add.collider(shurikens, shurikens);
        this.physics.add.overlap(player, coins, this.collectCoin, null, this);
        this.coinBig=this.sound.add("coin_big", {loop:false});
        this.physics.add.overlap(player, coins_small, this.collectCoinSmall, null, this);
        this.coinSmall=this.sound.add("coin_small", {loop:false});
        this.physics.add.overlap(player, shurikens, this.hitShuriken, null, this);
        this.jump=this.sound.add("jump", {loop:false});
        this.shuriken_alert=this.sound.add("alert_shuriken", {loop:false}).setVolume(.5);
        this.shuriken_alert2=this.sound.add("alert_shuriken2", {loop:false}).setVolume(.3);

        score = 0;
        gameOver = false;
        console.log(gameOver);

    }
    
    update (){
        if (gameOver){       
            return
        }
        if (cursors.left.isDown){
            player.setVelocityX(-340);
        }
        else if (cursors.right.isDown){
            player.setVelocityX(340);
        }
        else if (player.body.touching.down){
            player.setVelocityX(0);
            player.anims.play("idle");
        }
        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-660);
            this.jump.play();
        }
        if (cursors.up.isDown) {
            player.anims.play("fall");
        }
        if (cursors.left.isDown && player.body.touching.down){
            player.anims.play("left", true);
        }
        else if (cursors.right.isDown && player.body.touching.down){
            player.anims.play("right", true);
        }


    }

    collectCoin (player, coin){
        coin.disableBody(true,true);

        this.coinBig.play();

        score += 1;
        scoreText.setText(score)
        if(coins.countActive(true)===0){
            coins.children.iterate(function(child){
                child.enableBody(true, child.x, 0, true, true);
            });

            this.shuriken_alert.play();
            this.shuriken_alert2.play();
            
            let x= (player.x<640) ? Phaser.Math.Between(640, 1280): Phaser.Math.Between(0, 640);
            
            let shuriken= shurikens.create(x, 16, "shuriken").setScale(1.5).setSize(10, 10).refreshBody();
            shuriken.setBounce(1);
            shuriken.setCollideWorldBounds(true);
            shuriken.setVelocity (Phaser.Math.Between(-200, 300), 200);
            shuriken.allowGravity=false;

            this.music_gameplay.detune += 50;
        }
    }

    collectCoinSmall (player, coin_small){
        coin_small.disableBody(true,true);

        this.coinSmall.play();

        score += 0.5;
        scoreText.setText(score)
        if((coins_small.countActive(true)===0)){
            coins_small.children.iterate(function(child){
                child.enableBody(true, child.x, 0, true, true);
                child.setVelocity(Phaser.Math.Between(-500, 500), 200);
            });
        }
    }

    hitShuriken (player, shuriken){
        this.gameOver1=this.sound.add("gameover1", {loop:false});
        this.gameOver1.play();

        gameOver = true;
        
        this.gameOver=this.sound.add("gameover", {loop:false});
        this.gameOver.play();
        this.music_gameplay.stop();
        this.music_menu=this.sound.add("music_menu", {loop:true}) .setVolume(0.2);
        this.music_menu.play();
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play("lose");

        this.click=this.sound.add("click", {loop:false});

        var gameOverButton = this.add.text(640, 40, "Game Over", {fontFamily:"Lucida", fontSize: "100px", fill: "#000"})
        .setInteractive()
        .on("pointerdown", () => {this.sound.stopByKey("music_menu"), this.click.play(), this.scene.start("final")});
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(640, 50, 1280, 720));
        
        var clickHere = this.add.text(640, 40, "click here", {fontFamily:"Lucida", fontSize: "30px", fill: "#000"})
        .setInteractive()
        .on("pointerdown", () => {this.sound.stopByKey("music_menu"), this.click.play(), this.scene.start("final")});
        Phaser.Display.Align.In.Center(clickHere, this.add.zone(640, 100, 1280, 720));
        
        console.log(gameOver)
    }
}