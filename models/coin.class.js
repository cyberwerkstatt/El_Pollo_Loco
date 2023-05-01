class Coin extends MovableObject {
    width = 100;
    height = 100;
    imagesCoins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    intervalIds = [];


    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * 3500;
        this.y = 100 + Math.random() * 70;
        this.loadImages(this.imagesCoins);
        this.animateCoins();
    }


    animateCoins() {
        setStopableInterval(() => {
            this.playAnimationMo(this.imagesCoins)
        }, 350);
    }
}