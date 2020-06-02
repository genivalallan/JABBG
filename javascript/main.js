const canvas = document.getElementById('game-screen');

const ballsScore = document.getElementById('balls');
const timeScore = document.getElementById('time');
const levelTitle = document.getElementById('level-title');

const settingsDialog = document.getElementById('settings');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const levelSelector = document.getElementById('level-selector');
const ballsCounter = document.getElementById('balls-counter');
const startBtn = document.getElementById('start-btn');

const pauseDialog = document.getElementById('pause');
const pauseCloseBtn = document.getElementById('pause-close-btn');

const helpDialog = document.getElementById('help');
const helpCloseBtn = document.getElementById('help-close-btn');

ballsCounter.min = 5;
ballsCounter.max = 50;
ballsCounter.value = 10;

let game = new Game(canvas, update);
let gameStatus = GameStatus.STOP;

let openDialog = settingsDialog;

function update(ballsCount, time) {
    ballsScore.textContent = ballsCount.toString();
    timeScore.textContent = time + ' s';

    if (ballsCount === 0) {
        settingsDialog.style.display = 'block';
    }
}

window.onkeydown = function keyboardHandler(event) {
    switch (event.code) {
        case 'Escape':  // Stop/Quit
        case 'KeyQ':
            if(openDialog) {
                openDialog.style.display = 'none';
                openDialog = null;
                
                if (gameStatus === GameStatus.PAUSE) {
                    gameStatus = GameStatus.PLAY;
                    game.start();
                }
            } else {
                game.stop();
                gameStatus = GameStatus.STOP;
                openDialog = settingsDialog;
                settingsDialog.style.display = 'block';
            }
            break;
        case 'KeyP':    // Pause
            if (gameStatus === GameStatus.PLAY) {
                game.pause();
                gameStatus = GameStatus.PAUSE;
                openDialog = pauseDialog;
                pauseDialog.style.display = 'block';
            }
            break;
        case 'KeyH':
            if (gameStatus === GameStatus.PLAY) {
                game.pause();
                gameStatus = GameStatus.PAUSE;
            } else if (openDialog && openDialog !== helpDialog) {
                openDialog.style.display = 'none';
            }
            openDialog = helpDialog;
            helpDialog.style.display = 'block';
            break;
        case 'Enter':   // Start
        case 'Space':
            if(openDialog === settingsDialog) {
                game.reset(levelSelector.value, parseInt(ballsCounter.value));
                update(ballsCounter.value, 0);
                settingsDialog.style.display = 'none';
                openDialog = null;
                gameStatus = GameStatus.PLAY;
                game.start();
            }
            break;
        case 'KeyR':    // Reset
            if (gameStatus === GameStatus.PLAY || gameStatus === GameStatus.PAUSE) {
                game.stop();
                game.reset(levelSelector.value, parseInt(ballsCounter.value));
                if (openDialog) {
                    openDialog.style.display = 'none';
                    openDialog = null;
                }
                update(ballsCounter.value, 0);
                game.start();
            }
            break;
        case 'ArrowUp':     // Moviment
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'KeyW':
        case 'KeyS':
        case 'KeyA':
        case 'KeyD':
            if(game.gameStatus === GameStatus.PLAY) {
                game.player.move(event.code, game.screenSize);
            }
            break;
        default:
            break;
    }
};

startBtn.onclick = function () {
    game.reset(levelSelector.value, parseInt(ballsCounter.value));
    settingsDialog.style.display = 'none';
    openDialog = null;
    update(ballsCounter.value, 0);
    game.start();
};

settingsCloseBtn.onclick = function () {
    settingsDialog.style.display = 'none';
    openDialog = null;
};

pauseCloseBtn.onclick = function () {
    pauseDialog.style.display = 'none';
    openDialog = null;
    gameStatus = GameStatus.PLAY;
    game.start();
};

helpCloseBtn.onclick = function () {
    helpDialog.style.display = 'none';
    openDialog = null;
    if (gameStatus === GameStatus.PAUSE) {
        gameStatus = GameStatus.PLAY;
        game.start();
    }
};

levelSelector.onchange = function () {
    levelTitle.textContent = levelSelector.value;

    if (levelSelector.value === GameLevel.EASY) {
        levelTitle.style.color = 'cornflowerblue';
        levelTitle.style.textShadow = '0 0 5px blue';
    } else if (levelSelector.value === GameLevel.NORMAL) {
        levelTitle.style.color = 'gold';
        levelTitle.style.textShadow = '0 0 5px yellow';
    } else if (levelSelector.value === GameLevel.HARD){
        levelTitle.style.color = 'darkred';
        levelTitle.style.textShadow = '0 0 5px red';
    } else {
        levelTitle.style.color = 'white';
        levelTitle.style.textShadow = '0 0 5px white';
    }
};