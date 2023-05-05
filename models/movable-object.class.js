class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 50;
    lastHit = 0;
    progessCoinBar = 0;
    progessBottleBar = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&    //   right > left =>   Collision in front
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&     //    top > bottom =>   Collision bottom
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&       //     left > right =>   Collision behind
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;       //      bottom > top =>   Collision top   
    }


    isCollected(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&    //   right > left =>   Collision in front
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&     //    top > bottom =>   Collision bottom
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&       //     left > right =>   Collision behind
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;       //      bottom > top =>   Collision top  
    }


    /**
    * If the character has been damaged, 10 life points are deducted
    */
    hitCharacter() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
    * If the final boss has been damaged, 10 life points are deducted
    */
    hitEndboss() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * raising progressbar
     */    
    raiseProgressbarCoin() {
        this.progessCoinBar += 5;
    }


   /**
     * raising progressbar Bottle
     */  
    raiseProgressbarBottle() {
        this.progessBottleBar += 10;
    }


    /**
     * reduceProgressbarBottleThroughThrow
     */  
    reduceProgressbarBottleThroughThrow() {
        this.progessBottleBar -= 10;
    }


    isHurtCharacter() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


  
    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }


    chickenKilled() {
        return this.energy = 0;
    }


  
    playAnimationMo(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    addGravity() {
        setStopableInterval(() => {
            if (this.isAboveGround() || this.isNotAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }


    isNotAboveGround() {
        return this.speedY > 0 || this.y < 230;
    }
}

