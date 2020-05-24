class Player extends Ball {
    /**
     * The Player class creates and controls the player on the screen.
     * @param {Point} center - Center coordinates.
     * @param {number} radius - Radius of the circle.
     * @param {Point} velocity - Velocity in which the object moves on the x and y axis.
     * @param {string|CanvasGradient|CanvasPattern} color - Color of the object to be drawn.
     * @param {CanvasRenderingContext2D} context - 2D drawing context.
     */
    constructor(center, radius, velocity, color, context) {
        super(center, radius, velocity, color, context);
    }

    /**
     * Creates a Player object with predefined attributes.
     * @param {CanvasRenderingContext2D} context - 2D drawing context.
     * @param {Point} screenSize - The screen size.
     * @returns {Player} - Default Player object.
     */
    static create(context, screenSize) {
        let radius = 10;
        let player = new Player(
            new Point(
                random(radius, screenSize.x - radius),
                random(radius, screenSize.y - radius)
            ),
            radius,
            new Point(radius, radius),
            'white',
            context
        );

        return player;
    }

    /**
     * Draws the player on the screen.
     */
    draw() {
        this.context.beginPath();
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 2;
        this.context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    /**
     * Moves the player on the screen.
     * @param {string} key - The key pressed. A string in the format returned by KeyboardEvent.code.
     * @param {Point} screenSize - The screen bottom-right boundaries.
     */
    move(key, screenSize) {
        switch (key) {
            case 'KeyA':
            case 'ArrowLeft':
                this.center.x -= this.velocity.x;
                if (this.center.x - this.radius < 0) {
                    this.draw();
                    this.center.x += this.velocity.x;
                }
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.center.x += this.velocity.x;
                if (this.center.x + this.radius > screenSize.x) {
                    this.draw();
                    this.center.x -= this.velocity.x;
                }
                break;
            case 'KeyW':
            case 'ArrowUp':
                this.center.y -= this.velocity.y;
                if (this.center.y - this.radius < 0) {
                    this.draw();
                    this.center.y += this.velocity.y;
                }
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.center.y += this.velocity.y;
                if (this.center.y + this.radius > screenSize.y) {
                    this.draw();
                    this.center.y -= this.velocity.y;
                }
                break;
            default:
                break;
        }
    }
}