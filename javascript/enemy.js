class Enemy extends Ball {
    /**
     * The Enemy class creates and controls the enemies on the screen.
     * @param {Point} center - Center coordinates.
     * @param {number} radius - Radius of the circle.
     * @param {Point} velocity - Velocity in which the object moves on the x and y axis.
     * @param {number} strength - The strength of the enemy (how many collisions to be destroyed).
     * @param {string|CanvasGradient|CanvasPattern} color - Color of the object to be drawn.
     * @param {CanvasRenderingContext2D} context - 2D drawing context.
     */
    constructor(center, radius, velocity, strength, color, context) {
        super(center, radius, velocity, color, context);

        this.strength = strength;
    }

    /**
     * Moves the enemy on the screen.
     * @param {Point} screenSize - The bottom-right coordinates of the screen.
     */
    move(screenSize) {
        if (((this.center.x - this.radius) < 0) ||
            ((this.center.x + this.radius) > screenSize.x))
        {
            this.velocity.x = -(this.velocity.x);
        }
        
        if (((this.center.y - this.radius) < 0) ||
            ((this.center.y + this.radius) > screenSize.y))
        {
            this.velocity.y = -(this.velocity.y);
        }

        this.center.x += this.velocity.x;
        this.center.y += this.velocity.y;
    }
}