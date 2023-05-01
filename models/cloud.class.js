class Cloud extends MovableObject {
    y = 0;
    width = 400;
    height = 350;
    speed = 0.20;


    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
        this.animatedClouds();
    }

    
    animatedClouds() {
        setStopableInterval(() => {
            this.moveLeft();
        }, 15);
    }
}