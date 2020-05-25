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
    }

    /**
     * Resets the game parameters.
     * @param {string} level - The level of the game.
     * @param {number} enemiesCount - The amount of enemies to be created.
     */
    reset(level, enemiesCount) {
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
        this.gameStatus = GameStatus.PLAY;

        this.play();
    }

    /**
     * Starts the animation.
     */
    play() {
        if(this.gameStatus !== GameStatus.PLAY) {
            return;
        }
        
        this.context.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.context.fillRect(0, 0, this.screenSize.x, this.screenSize.y);

        this.player.draw();
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move(this.screenSize);
            this.enemies[i].draw();
        }

        requestAnimationFrame(this.play.bind(this));
    }
}