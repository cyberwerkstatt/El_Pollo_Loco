class Character extends MovableObject {
    x = 30;
    y = 230;
    width = 90;
    height = 190;
    speed = 12;
    imagesWalkingCharacter = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    imagesJumpingCharacter = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    imagesHurtCharacter = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    imagesDeadCharacter = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    imagesIdleCharacter = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    imagesLongIdleCharacter = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    offset = {
        top: 70,
        bottom: 10,
        left: 35,
        right: 35,
    }
    intervalIds = [];
    characterLastMovement = 0;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalkingCharacter);
        this.loadImages(this.imagesJumpingCharacter);
        this.loadImages(this.imagesHurtCharacter);
        this.loadImages(this.imagesDeadCharacter);
        this.loadImages(this.imagesIdleCharacter);
        this.loadImages(this.imagesLongIdleCharacter);
        this.animateCharacter();
        this.addGravity();
    }


    animateCharacter() {
        setStopableInterval(() => this.characterMove(), 1000 / 25);
        setStopableInterval(() => this.playCharacter(), 150);
    }


    /**
    * Function query where the character is currently and in which direction he wants to go
    */
    characterMove() {
        if (this.characterCanMoveRight())
            this.characterMoveRight();
        if (this.characterCanMoveLeft())
            this.characterMoveLeft();
        if (this.characterCanJump())
            this.characterJump();
        this.scrollTheMap();
    }


    scrollTheMap() {
        this.world.camera_x = -this.x + 130;
    }


    /**
    * function looks at what the character is doing
    */
    playCharacter() {
        if (this.isHurtCharacter()) {
            this.characterHurt()
            this.getUnixTimeStamp();
        } else if (this.isNotAboveGround()) {
            this.characterJumpingAnimation();
            this.getUnixTimeStamp();
        } else if (this.characterCanMoveRight() || this.characterCanMoveLeft()) {
            this.getUnixTimeStamp();
            this.characterMoveAnimation();
        } else if (this.characterSleep()) {
            this.characterSleepAnimation();
        } else if (this.isDead()) {
            this.gameIsLost();
        }
    }


    characterCanMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }


    characterMoveRight() {
        this.otherDirection = false;
        this.moveRight();
        audioWalkCharacter.play();
    }


    characterCanMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }


    characterMoveLeft() {
        this.otherDirection = true;
        this.moveLeft();
        audioWalkCharacter.play();
    }


    characterCanJump() {
        return this.world.keyboard.space && !this.isAboveGround();
    }


    characterJump() {
        this.jump();
        audioJumpCharacter.play();
        audioJumpCharacter.volume = 0.3;
    }


    jump() {
        this.speedY = 30;
    }


    characterHurt() {
        this.playAnimationMo(this.imagesHurtCharacter);
        auidoHurtCharacter.play();
    }


    /**
    * The game is lost
    */
    gameIsLost() {
        this.playAnimationMo(this.imagesDeadCharacter);
        audioGameLost.play();
        clearAllIntervals();
        resetBackgroundMusic();
        showGameOverScreen();
    }


    characterSleep() {
        let timepassed = new Date().getTime() - this.characterLastMovement;
        timepassed = timepassed / 2000;
        return timepassed > 1.5;
    }


    characterJumpingAnimation() {
        this.playAnimationMo(this.imagesJumpingCharacter);
    }


    /**
    * Time indication when the character last ran
    */
    getUnixTimeStamp() {
        this.characterLastMovement = new Date().getTime();
    }


    characterMoveAnimation() {
        this.playAnimationMo(this.imagesWalkingCharacter);
    }


    characterSleepAnimation() {
        this.playAnimationMo(this.imagesLongIdleCharacter);
    }
}