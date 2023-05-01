let canvas;
let world;
let keyboard = new Keyboard();
let audioBackgroundMusicInGame = new Audio('audio/bgmusic2.mp3');
let audioWalkCharacter = new Audio('audio/running.mp3');
let audioJumpCharacter = new Audio('audio/jump.mp3');
let auidoHurtCharacter = new Audio('audio/hit.mp3');
let audioGameLost = new Audio('audio/gameOver.mp3');
let audioCoinCollected = new Audio('audio/collectcoinCoins.mp3');
let audioBottleCollected = new Audio('audio/collectcoinThroebel.mp3');
let audioThrowBottle = new Audio('audio/BottelThrow.mp3');
let audioSplashBottle = new Audio('audio/glass.mp3');
let audioGameWin = new Audio('audio/win2.mp3');
let audioDeadChicken = new Audio('audio/chickenDeath.mp3');
let audioBackgroundMusicEndboss = new Audio('audio/EndbossMusic.mp3');
let intervalIds = [];



function startGame() {
    showLoadingScreen();
    setTimeout(() => {
        initLevel();
        hideElementsInStartScreen();
        showSoundBtns();
        showMobileBtns();
        showFullscreenBtn();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
        closeLoadingScreen();
        playBackgroundMusic();
    }, 3500);
}



function showLoadingScreen() {
    document.getElementById('loadingScreenContainer').classList.remove('hide');
}

 

function closeLoadingScreen() {
    document.getElementById('loadingScreenContainer').classList.add('hide');
}



function hideElementsInStartScreen() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('btnPlay').classList.add('d-none');
    document.getElementById('steeringIcon').classList.add('d-none');
}



function showSoundBtns() {
    document.getElementById('audioToggleIcon').classList.remove('d-none');
}



function showMobileBtns() {
    document.getElementById('positionAbsoluteLeft').classList.remove('d-none');
    document.getElementById('positionAbsoluteRight').classList.remove('d-none');
    document.getElementById('infoForTheSmartphonDiv').classList.remove('d-none');
}



function showFullscreenBtn() {
    document.getElementById('enterFullscreenIcon').classList.remove('d-none');
}



function playBackgroundMusic() {
    audioBackgroundMusicInGame.volume = 0.2;
    audioBackgroundMusicInGame.play();
    audioBackgroundMusicInGame.loop = true;
}


function restartGame() {
    document.getElementById('gameOverScreenContainer').classList.add('d-none');
    document.getElementById('winScreenContainer').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('enterFullscreenIcon').classList.remove('d-none');
    closeFullscreen();
    clearAllIntervals();
    resetBackgroundMusic();
    startGame();
    document.getElementById('canvas').classList.remove('d-none');
}



function goBackToStartScreen() {
    clearAllIntervals();
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('gameOverScreenContainer').classList.add('d-none');
    document.getElementById('winScreenContainer').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('btnPlay').classList.remove('d-none');
    document.getElementById('positionAbsoluteLeft').classList.add('d-none');
    document.getElementById('positionAbsoluteRight').classList.add('d-none');
    document.getElementById('infoForTheSmartphonDiv').classList.add('d-none');
    document.getElementById('steeringIcon').classList.remove('d-none');
    closeFullscreen();
    resetBackgroundMusic();
}



function showGameOverScreen() {
    setTimeout(() => {
        document.getElementById('positionAbsoluteLeft').classList.add('d-none');
        document.getElementById('positionAbsoluteRight').classList.add('d-none');
        document.getElementById('infoForTheSmartphonDiv').classList.add('d-none');
        document.getElementById('gameOverScreenContainer').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioToggleIcon').classList.add('d-none');
        document.getElementById('enterFullscreenIcon').classList.add('d-none');
        document.getElementById('exitFullscreenIcon').classList.add('d-none');
        resetBackgroundMusic();
    }, 1500);
}



function showWinScreen() {
    setTimeout(() => {
        document.getElementById('winScreenContainer').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioToggleIcon').classList.add('d-none');
        document.getElementById('positionAbsoluteLeft').classList.add('d-none');
        document.getElementById('positionAbsoluteRight').classList.add('d-none');
        document.getElementById('infoForTheSmartphonDiv').classList.add('d-none');
        document.getElementById('enterFullscreenIcon').classList.add('d-none');
        document.getElementById('exitFullscreenIcon').classList.add('d-none');
        resetBackgroundMusic();
    }, 1500);
}


function resetBackgroundMusic() {
    audioBackgroundMusicInGame.currentTime = 0;
    audioBackgroundMusicEndboss.currentTime = 0;
    audioBackgroundMusicEndboss.pause();
    audioBackgroundMusicInGame.pause();
}



function setStopableInterval(fn, time) {
    let idIntervall = setInterval(fn, time);
    intervalIds.push(idIntervall);
}



function clearAllIntervals() {
    for (let i = 1; i < 9999; i++)  window.clearInterval(i);
}



function openFullscreen() {
    let fullScreen = document.getElementById('fullScreen');
    if (fullScreen.requestFullscreen) {
        fullScreen.requestFullscreen();
    } else if (fullScreen.webkitRequestFullscreen) {
        fullScreen.webkitRequestFullscreen();
    } else if (fullScreen.msRequestFullscreen) {
        fullScreen.msRequestFullscreen();
    }
    addStylesForFullScreen();
}


function addStylesForFullScreen() {
    document.getElementById('enterFullscreenIcon').classList.add('d-none');
    document.getElementById('exitFullscreenIcon').classList.remove('d-none');
    document.getElementById('canvas').classList.add('canvasFullScreen');
    document.getElementById('winScreenContainer').classList.add('winScreenContainerFullScreen', 'winScreenContainerFullScreenh2', 'imgTrophyContainerFullScreenimg');
    document.getElementById('gameOverScreen').classList.add('gameOverScreenFullScreen');
    document.getElementById('positionAbsoluteLeft').classList.add('d-none');
    document.getElementById('positionAbsoluteRight').classList.add('d-none');
    document.getElementById('infoForTheSmartphonDiv').classList.add('d-none');
}



function closeFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    removeStylesForFullScreen();
}



function removeStylesForFullScreen() {
    document.getElementById('enterFullscreenIcon').classList.remove('d-none');
    document.getElementById('exitFullscreenIcon').classList.add('d-none');
    document.getElementById('canvas').classList.remove('canvasFullScreen');
    document.getElementById('winScreenContainer').classList.remove('winScreenContainerFullScreen', 'winScreenContainerFullScreenh2', 'imgTrophyContainerFullScreenimg');
    document.getElementById('gameOverScreen').classList.remove('gameOverScreenFullScreen');
    document.getElementById('positionAbsoluteLeft').classList.remove('d-none');
    document.getElementById('positionAbsoluteRight').classList.remove('d-none');
    document.getElementById('infoForTheSmartphonDiv').classList.remove('d-none');
}



function toggleMute() {
    toggleNoSoundBtn();
    audioBackgroundMusicEndboss.muted = !audioBackgroundMusicEndboss.muted;
    audioBackgroundMusicInGame.muted = !audioBackgroundMusicInGame.muted;
    audioDeadChicken.muted = !audioDeadChicken.muted;
    audioWalkCharacter.muted = !audioWalkCharacter.muted;
    audioJumpCharacter.muted = !audioJumpCharacter.muted;
    auidoHurtCharacter.muted = !auidoHurtCharacter.muted;
    audioGameLost.muted = !audioGameLost.muted;
    audioGameWin.muted = !audioGameWin.muted;
    audioCoinCollected.muted = !audioCoinCollected.muted;
    audioBottleCollected.muted = !audioBottleCollected.muted;
    audioThrowBottle.muted = !audioThrowBottle.muted;
    audioSplashBottle.muted = !audioSplashBottle.muted;
}



function toggleNoSoundBtn() {
    let img = document.getElementById('audioToggleIcon').src;

    if (img.indexOf('icons/audioOnIcon.png') != -1) {
        document.getElementById('audioToggleIcon').src = 'icons/audioOffIcon.png';
    } else {
        document.getElementById('audioToggleIcon').src = 'icons/audioOnIcon.png';
    }

}



function openSteeringMenu() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('containerGameControlls').classList.remove('d-none');
    document.getElementById('btnPlay').classList.add('d-none');
    document.getElementById('audioToggleIcon').classList.add('d-none');
    document.getElementById('steeringIcon').classList.add('d-none');
    document.getElementById('arrowBackGameControlls').classList.remove('d-none');
    document.getElementById('positionAbsoluteLeft').classList.add('d-none');
    document.getElementById('positionAbsoluteRight').classList.add('d-none');
    document.getElementById('infoForTheSmartphonDiv').classList.add('d-none');
}



function closeSteeringMenu() {
    document.getElementById('containerGameControlls').classList.add('d-none');
    document.getElementById('arrowBackGameControlls').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('btnPlay').classList.remove('d-none');
    document.getElementById('steeringIcon').classList.remove('d-none');
    document.getElementById('audioToggleIcon').classList.add('d-none');
    document.getElementById('positionAbsoluteLeft').classList.remove('d-none');
    document.getElementById('positionAbsoluteRight').classList.remove('d-none');
    document.getElementById('infoForTheSmartphonDiv').classList.remove('d-none');
}