class Bottle extends MovableObject {
    width = 100;
    height = 80;


    constructor(imagePath, y) {
        super().loadImage(imagePath, y);
        this.x = 400 + Math.random() * 2000;
        this.y = y;
    }
}