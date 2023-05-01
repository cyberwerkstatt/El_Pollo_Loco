class Endboss extends MovableObject {
    x = 4600;
    y = 95;
    width = 300;
    height = 350;
    speed = 20;
    speedThroughHit = 50;
    imagesWalkingEndboss = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    imagesAlertEndboss = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    imagesAttackEndboss = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    imagesHurtEndboss = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    imagesDeadEndboss = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    offset = {
        top: 100,
        bottom: 50,
        left: 40,
        right: 40,
    }
    hadFirstContact = false;
    intervalIds = [];


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.imagesWalkingEndboss);
        this.loadImages(this.imagesAlertEndboss);
        this.loadImages(this.imagesAttackEndboss);
        this.loadImages(this.imagesHurtEndboss);
        this.loadImages(this.imagesDeadEndboss);
        this.animateEndboss();
    }



    animateEndboss() {
        let i = 0;
        setStopableInterval(() => {
            this.playEndboss(i);
            i++;
            if (this.endbossReached()) {
                i = 0;
                this.hadFirstContact = true;
                this.playBackgroundMusicEndboss();
            }
        }, 120);
    }


    playEndboss(i) {
        if (i < 15) {
            this.playAnimationMo(this.imagesAlertEndboss);
        } else if (!this.isDead() && !this.isHurtEndboss() && this.endbossFightBegins()) {
            this.playAnimationMo(this.imagesWalkingEndboss);
            this.moveLeft();
        } else if (this.isHurtEndboss()) {
            this.playAnimationMo(this.imagesAttackEndboss);
            this.endBossRushForward();
        } else if (this.isDead()) {
            this.playAnimationMo(this.imagesDeadEndboss);
            setTimeout(() => {
                this.gameIsWin();
            }, 350);
        }
    }


   
    gameIsWin() {
        audioGameWin.play();
        clearAllIntervals();
        resetBackgroundMusic();
        showWinScreen();
    }


   
    playBackgroundMusicEndboss() {
        audioBackgroundMusicEndboss.volume = 0.2;
        audioBackgroundMusicEndboss.play();
        audioBackgroundMusicEndboss.loop = true;
        audioBackgroundMusicInGame.pause();
    }


  
    endbossReached() {
        return world.character.x > 3800 && !this.hadFirstContact;
    }


  
    endbossFightBegins() {
        return world.character.x > world.level.endboss[0].x - 1000;
    }


   
    endBossRushForward() {
        let speedIncreaseThroughHit = world.level.endboss[0].x -= this.speedThroughHit;
        return speedIncreaseThroughHit;
    }
}