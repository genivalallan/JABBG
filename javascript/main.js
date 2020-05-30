const canvas = document.getElementById('game-screen');
const levelSelector = document.getElementById('level-selector');
const ballsCounter = document.getElementById('balls-counter');
const settingsDialog = document.getElementById('settings');
const startBtn = document.getElementById('btn-start');
const settingsCloseBtn = document.getElementById('settings-close-btn');

ballsCounter.min = 5;
ballsCounter.max = 100;
ballsCounter.value = 10;

let gameLevel = 'easy';
let game = new Game(canvas);

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
    game.start();
};

settingsCloseBtn.onclick = function () {
    settingsDialog.style.display = 'none';
};