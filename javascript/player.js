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
}