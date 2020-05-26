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
     * Randomly creates Enemy objects based on the game level.
     * @param {string} level - The game level (a value defined by the GameLevel object).
     * @param {Point} screenSize - The bottom-right coordinates of the screen.
     * @param {CanvasRenderingContext2D} context - 2D drawing context.
     * @param {number} arrayLength - The length of the array to be returned.
     * @return {Array} An array of Enemy objects.
     */
    static create(level, screenSize, context, arrayLength) {
        /* 
         * Enemy's properties:
         * - The size of the circle is based on the game level.
         * - Size probability table:
         *              | 10 ~ 13 | 14 ~ 17 | 18 ~ 21 |
         *      --------+---------+---------+---------+
         *      easy:   |   10%   |   30%   |   60%   |
         *      normal: |   20%   |   40%   |   40%   |
         *      hard:   |   50%   |   25%   |   25%   |
         * - The strength is based on the size of the circle, the bigger the circle, the weaker it is.
         * - The speed is based on the size of the enemy. The smaller, the faster.
         * - The color is based on the strength:
         *   blueish for weak, yellowish for medium and redish for strong.
         */

        if(arrayLength < 1) {
            return;
        }

        let probDist;
        if (level === GameLevel.EASY) {
            probDist = [1, 3, 6];
        } else if (level === GameLevel.NORMAL) {
            probDist = [2, 4, 4];
        } else if (level === GameLevel.HARD) {
            probDist = [10, 5, 5];
        } else if (level === GameLevel.RANDOM) {
            probDist = [3, 4, 3];
        } else {
            return;
        }

        let distribution = distRandom(probDist, arrayLength);

        let enemies = new Array(arrayLength);
        for (let i = 0; i < arrayLength; i++) {
            // For distribution[i] = 0 -> strength = 3, radius = 10 ~ 13, speed = 9 ~ 11
            // For distribution[i] = 1 -> strength = 2, radius = 14 ~ 17, speed = 6 ~ 8
            // For distribution[i] = 2 -> strength = 1, radius = 18 ~ 21, speed = 3 ~ 5
            let strength = 3 - distribution[i];
            let radius = random(22 - (strength * 4), 25 - (strength * 4));
            let velocity = new Point(
                random(strength * 3, (strength * 3) + 2),
                random(strength * 3, (strength * 3) + 2)
            );
            // Changes the direction of the moviment
            velocity.x *= ((random(-1, 1) === -1) ? -1 : 1);
            velocity.y *= ((random(-1, 1) === -1) ? -1 : 1);
            let center = new Point(
                random(radius, screenSize.x - radius),
                random(radius, screenSize.y - radius)
            );
            let color = Enemy.pickColor(strength);

            enemies[i] = new Enemy(
                center,
                radius,
                velocity,
                strength,
                color,
                context
            );
        }

        return enemies;
    }

    /**
     * Returns the color name based on the enemy's strength.
     * @param {number} strength - The strength of the enemy.
     * @return {string} The color name.
     */
    static pickColor(strength) {
        if (strength === 1) {
            return 'cornflowerblue';
        } else if (strength === 2) {
            return 'gold';
        } else if (strength === 3) {
            return 'darkred';
        } else {
            return;
        }
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

    /**
     * Updates the enemy's strength after a hit and returns a boolean indicating if the object is to be destroyed.
     * @return {boolean} True if the strength property reached zero. False, otherwise.
     */
    hit() {
        this.strength--;

        if(this.strength < 1) {
            return true;
        }

        this.velocity.x = -(this.velocity.x);
        this.velocity.y = -(this.velocity.y);
        this.color = Enemy.pickColor(this.strength);
        return false;
    }
}