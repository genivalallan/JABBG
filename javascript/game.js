class Game {
    /**
     * Creates e manipulates the game environment.
     * @param {HTMLElement} canvas - The canvas HTML element where the game elements will be drawn.
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.gameLevel = GameLevel.EASY;
        this.gameStatus = GameStatus.STOP;
        this.screenSize = new Point(this.canvas.width, this.canvas.height);
        this.elapsedTime = 0;
        this.timerID = 0;
        this.enemies = [];
        this.player = Player.create(this.context, screenSize);

        this.requestAnimationFrame = requestAnimationFrame.bind(window) ||
                                     webkitRequestAnimationFrame.bind(window) ||
                                     mozRequestAnimationFrame.bind(window) ||
                                     msRequestAnimationFrame.bind(window);
        this.cancelAnimationFrame = cancelAnimationFrame.bind(window) ||
                                    webkitCancelAnimationFrame.bind(window) ||
                                    mozCancelAnimationFrame.bind(window) ||
                                    msCancelAnimationFrame.bind(window);
        this.animationID = 0;
        
    }

    /**
     * Resets the game parameters.
     * @param {string} level - The level of the game.
     * @param {number} enemiesCount - The amount of enemies to be created.
     */
    reset(level, enemiesCount) {
        this.canvas.width = this.screenSize.x = window.innerWidth;
        this.canvas.height = this.screenSize.y = window.innerHeight;

        this.elapsedTime = 0;
        
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let center = new Point(
            random(this.player.radius, this.canvas.width - this.player.radius),
            random(this.player.radius, this.canvas.height - this.player.radius)
        );
        this.player.center = center;

        this.enemies = Enemy.create(level, this.screenSize, this.context, enemiesCount);
    }

    /**
     * Starts the game.
     */
    start() {
        if(this.gameStatus === GameStatus.PLAY) {
            return;
        }
        this.gameStatus = GameStatus.PLAY;
        this.timerID = window.setInterval(() => {
            this.elapsedTime++;
        }, 1000);

        this.animationID = this.requestAnimationFrame(this.play.bind(this));
    }

    /**
     * Starts the animation.
     */
    play() {
        if(this.gameStatus !== GameStatus.PLAY) {
            return;
        } else if(this.enemies.length === 0) {
            this.context.fillStyle = 'rgb(0, 0, 0)';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.player.draw();

            this.stop();
            return;
        }
        
        this.context.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw();
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move(this.screenSize);
            this.enemies[i].draw();

            if(this.player.center.distance(this.enemies[i].center) < (this.player.radius + this.enemies[i].radius)) {
                if(this.enemies[i].hit()) {
                    this.enemies.splice(i, 1);
                    i--;
                    continue;
                }
            }
        }

        this.animationID = this.requestAnimationFrame(this.play.bind(this));
    }

    stop() {
        if(game.gameStatus === GameStatus.STOP) {
            return;
        }
        this.gameStatus = GameStatus.STOP;
        window.clearInterval(this.timerID);
        this.cancelAnimationFrame(this.animationID);
        this.enemies = [];
    }

    pause() {
        if(game.gameStatus !== GameStatus.PLAY) {
            return;
        }
        this.gameStatus = GameStatus.PAUSE;
        window.clearInterval(this.timerID);
    }

    /**
     * Responds to the keys pressed.
     * @param {KeyboardEvent} key - A KeyboardEvent object with information about the key pressed.
     */
    keyboardHandler(event) {
        switch (event.code) {
            case 'Escape':  // Stop/Quit
            case 'KeyQ':
                this.stop();
                break;
            case 'KeyP':    // Pause
                this.pause();
                break;
            case 'Enter':   // Start
            case 'Space':
                if(this.gameStatus === GameStatus.STOP) {
                    this.reset('easy', 10);
                    this.start();
                } else if(this.gameStatus === GameStatus.PAUSE) {
                    this.start();
                }
                break;
            case 'KeyR':    // Restart
                this.stop();
                this.reset('hard', 10);
                this.start();
                break;
            case 'ArrowUp':     // Moviment
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'KeyW':
            case 'KeyS':
            case 'KeyA':
            case 'KeyD':
                if(this.gameStatus === GameStatus.PLAY) {
                    this.player.move(event.code, this.screenSize);
                }
                break;
            default:    // Return the KeyboardEvent
                return event;
        }
    }
}