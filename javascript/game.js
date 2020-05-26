class Game {
    /**
     * Creates e manipulates the game environment.
     * @param {CanvasRenderingContext2D} context - 2D drawing context.
     * @param {Point} screenSize - The bottom-right coordinates of the screen.
     */
    constructor(context, screenSize) {
        this.context = context;
        this.screenSize = screenSize;
        this.gameLevel = GameLevel.EASY;
        this.gameStatus = GameStatus.STOP;
        this.elapsedTime = 0;
        this.timerID = 0;
        this.enemies = [];
        this.player = Player.create(context, screenSize);

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
        screenSize.x = window.innerWidth;
        screenSize.y = window.innerHeight;
        
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(0, 0, this.screenSize.x, this.screenSize.y);

        this.elapsedTime = 0;
        let center = new Point(
            random(this.player.radius, this.screenSize.x - this.player.radius),
            random(this.player.radius, this.screenSize.y - this.player.radius)
        );
        this.player.center = center;
        this.elapsedTime = 0;

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
        this.timerID = setInterval(() => {
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
            this.context.fillRect(0, 0, this.screenSize.x, this.screenSize.y);
            this.player.draw();

            this.stop();
            return;
        }
        
        this.context.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.context.fillRect(0, 0, this.screenSize.x, this.screenSize.y);

        this.player.draw();
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move(this.screenSize);
            this.enemies[i].draw();

            if(this.player.center.distance(this.enemies[i].center) < (this.player.radius + this.enemies[i].radius)) {
                if(this.enemies[i].hit()) {
                    this.enemies.splice(i, 1);
                    i--;
                }
            }
        }


        // Remover após teste
        document.getElementById('time').textContent = this.elapsedTime;
        document.getElementById('balls').textContent = this.enemies.length;

        this.animationID = this.requestAnimationFrame(this.play.bind(this));
    }

    stop() {
        if(game.gameStatus === GameStatus.STOP) {
            return;
        }
        this.gameStatus = GameStatus.STOP;
        clearInterval(this.timerID);
        this.cancelAnimationFrame(this.animationID);
        this.enemies = [];
    }

    pause() {
        if(game.gameStatus !== GameStatus.PLAY) {
            return;
        }
        this.gameStatus = GameStatus.PAUSE;
        clearInterval(this.timerID);
    }
}