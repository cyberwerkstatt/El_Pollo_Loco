class Statusbar extends DrawableObject {
    width = 250;
    percentage = 50;


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesStatusbar[this.showImageIndex(percentage)];
        this.img = this.imgCache[path];
    }


    /**
    * different display levels
    */
    showImageIndex(percentage) {
        if (percentage == 50) {
            return 5;
        } else if (percentage >= 40) {
            return 4;
        } else if (percentage >= 30) {
            return 3;
        } else if (percentage >= 20) {
            return 2;
        } else if (percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}