class World {
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    statusbarEndbossHealth = new StatusbarEnbossHealth();
    statusbarIconEndboss = new StatusbarIconEndboss();
    throwableObject = [];
    maxBottlesToThrow = 0;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lastLitter = false;
    alreadyThrow = false;
    intervalIds = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorldWithCharacter();
        this.checkCollisionsWithMo();
        this.checkCollisionsWithThrowingBottle();
        this.checkTimerForLitter();
    }


    /**
     * draw all Elements on the Canvas.
     * 
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarEndbossHealth);
        this.addToMap(this.statusbarIconEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }


    setWorldWithCharacter() {
        this.character.world = this;
    }


    checkCollisionsWithMo() {
        setStopableInterval(() => {
            this.checkCollisionsChicken();
            this.CollisionsEndboss();
            this.checkCollectedCoins();
            this.checkCollectedBottles();
        }, 1000 / 25);
    }


    checkCollisionsWithThrowingBottle() {
        setStopableInterval(() => {
            this.checkCollisionWithBottleEndboss();
        }, 250);
    }


    checkTimerForLitter() {
        setStopableInterval(() => {
            this.checkThrowObjects();
        }, 1000 / 60);
    }


    /**
    * it is checked whether one has come into contact with the chicken or the small chicken
    */
    checkCollisionsChicken() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && !this.character.isHurtCharacter()) {
                if (this.character.isAboveGround()) {
                    this.killChickenWithJumpFromTop(enemy);
                } else {
                    this.character.hitCharacter()
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
    * If you jump on the chicken, it will be killed
    */
    killChickenWithJumpFromTop(enemy) {
        enemy.chickenKilled();
        this.character.speedY = 30;
        audioDeadChicken.play();
        audioDeadChicken.volume = 0.3
        setTimeout(() => {
            this.eraseEnemyFromArray(enemy);
        }, 750);
    }


    /**
    * Function for checking if you came in contact with the end boss
    */
    CollisionsEndboss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                this.character.hitCharacter();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }


    /**
    * Checking whether you came into contact with a coin
    */
    checkCollectedCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollected(coin)) {
                this.coinCollected(coin);
                this.character.raiseProgressbarCoin();
                audioCoinCollected.play();
                this.statusbarCoin.setPercentage(this.character.progessCoinBar);
            }
        });
    }


    /**
    * coin number increase when you touch the coins
    */
    coinCollected(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
    }


    /**
    * contact with the bottles is tested
    */
    checkCollectedBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollected(bottle)) {
                this.bottleCollected(bottle);
                this.character.raiseProgressbarBottle();
                audioBottleCollected.play();
                this.statusbarBottle.setPercentage(this.character.progessBottleBar);
            }
        });
    }


    /**
    * bottle number is increased when you touch the bottles
    */
    bottleCollected(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1);
        this.maxBottlesToThrow++;
    }


    /**
    * check if a bottle is thrown
    */
    checkThrowObjects() {
        if (this.keyboard.a && this.maxBottlesToThrow > 0 && !this.lastLitter) {
            this.alreadyThrow = true;
            this.checkThrowObjectsFunktion();
        } else {
            this.timerForLitter();
        }
    }


    /**
    * animation of the bottle when it is thrown as well as playing a sound and checking if there are enough bottles left.
    */
    checkThrowObjectsFunktion() {
        this.lastLitter = true;
        let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
        this.throwableObject.push(bottle);
        audioThrowBottle.play();
        this.maxBottlesToThrow--;
        this.character.reduceProgressbarBottleThroughThrow();
        this.statusbarBottle.setPercentage(this.character.progessBottleBar);
    }


    /**
    * timer to check when the next bottle can be thrown.
    */
    timerForLitter() {
        if (this.alreadyThrow) {
            this.alreadyThrow = false;
            setTimeout(() => {
                this.lastLitter = false;
            }, 500);
        }
    }


    /**
    * check if the enboss has come into contact with the bottle
    */
    checkCollisionWithBottleEndboss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endboss.forEach(endboss => {
                if (bottle.isColliding(endboss)) {
                    endboss.hitEndboss(endboss.energy);
                    this.playSoundEnbossHit();
                    this.statusbarEndbossHealth.setPercentage(world.level.endboss[0].energy);
                    setTimeout(() => {
                        this.eraseThrowingBottleFromArray(bottle);
                    }, 180);
                }
            });
        });
    }


    /**
    * plays the sound when the end boss is hit
    */
    playSoundEnbossHit() {
        audioSplashBottle.volume = 0.2;
        audioSplashBottle.play();
        audioDeadChicken.volume = 0.3;
        audioDeadChicken.play();
    }


    /**
    * when a chicken has died it is removed with this function
    */
    eraseEnemyFromArray(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(i, 1);
    }


    /**
    * when the bottle has hit the endboss it will be removed with this function
    */
    eraseThrowingBottleFromArray(bottle) {
        let i = this.throwableObject.indexOf(bottle);
        this.throwableObject.splice(i, 1);
    }
}   