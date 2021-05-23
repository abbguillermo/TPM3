var configuracion = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [scene_1, scene_2, scene_3]
};

var game = new Phaser.Game (configuracion);

var platforms;
var player;
var cursors;
var coins;
var coins_small;
var score;
var scoreText;
var shurikens;
var gameOver;