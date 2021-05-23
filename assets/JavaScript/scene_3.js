class scene_3 extends Phaser.Scene {
    constructor() {
        super("final");
    }

    create() {
        gameOver=false
        console.log(gameOver);

        var button_play = this.add.image(640, 360, "button_restart")
            button_play.setInteractive()
            this.click=this.sound.add("click", {loop:false});
            button_play.on("pointerdown", () => {this.click.play(), this.scene.start("juego")} ); 

        var finalCoins = this.add.text(720, 470, score,  { fontFamily: "Lucida", strokeThickness: 2, fontSize: 70, color: "#B5B5B5" });
    }

    reiniciar() {
        this.scene.start("juego");
    }


}