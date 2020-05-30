const canvas = document.getElementById('game-screen');
const levelSelector = document.getElementById('level-selector');
const ballsCounter = document.getElementById('balls-counter');
const settingsDialog = document.getElementById('settings');
const startBtn = document.getElementById('btn-start');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const ballsScore = document.getElementById('balls');
const timeScore = document.getElementById('time');
const levelTitle = document.getElementById('level-title');

ballsCounter.min = 5;
ballsCounter.max = 100;
ballsCounter.value = 10;

let gameLevel = 'easy';
let game = new Game(canvas, update);

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
            game.stop();
            settingsDialog.style.display = 'block';
            break;
        case 'KeyP':    // Pause
            game.pause();
            break;
        case 'Enter':   // Start
        case 'Space':
            if(game.gameStatus === GameStatus.STOP) {
                game.reset(levelSelector.value, parseInt(ballsCounter.value));
                update(ballsCounter.value, 0);
                game.start();
            } else if(game.gameStatus === GameStatus.PAUSE) {
                game.start();
            }
            settingsDialog.style.display = 'none';
            break;
        case 'KeyR':    // Restart
            game.stop();
            game.reset(levelSelector.value, parseInt(ballsCounter.value));
            settingsDialog.style.display = 'none';
            update(ballsCounter.value, 0);
            game.start();
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
    update(ballsCounter.value, 0);
    game.start();
};

settingsCloseBtn.onclick = function () {
    settingsDialog.style.display = 'none';
};

levelSelector.onchange = function () {
    levelTitle.textContent = levelSelector.value;

    if (levelSelector.value === 'easy') {
        levelTitle.style.color = 'cornflowerblue';
        levelTitle.style.textShadow = '0 0 5px blue';
    } else if (levelSelector.value === 'normal') {
        levelTitle.style.color = 'gold';
        levelTitle.style.textShadow = '0 0 5px yellow';
    } else if (levelSelector.value === 'hard'){
        levelTitle.style.color = 'darkred';
        levelTitle.style.textShadow = '0 0 5px red';
    } else {
        levelTitle.style.color = 'white';
        levelTitle.style.textShadow = '0 0 5px white';
    }
};