class SmallChicken extends MovableObject {
    x = 120;
    y = 365;
    width = 60;
    height = 50;
    imagesWalkingChickenSmall = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',

    ];
    imageDeadChickenSmall = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    intervalIds = [];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.imagesWalkingChickenSmall);
        this.x = 500 + Math.random() * 2700;
        this.speed = 0.20 + Math.random() * 1;
        this.animateChicken();
    }


    animateChicken() {
        let intervalSmallChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
        setStopableInterval(() => {
            if (!this.isDead()) {
                this.playAnimationMo(this.imagesWalkingChickenSmall);
            } else {
                this.loadImage(this.imageDeadChickenSmall);
                clearInterval(intervalSmallChicken);
            }
        }, 100);
    }
}