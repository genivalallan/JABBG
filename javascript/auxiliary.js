class Point {
    /**
     * Creates a pair of coordinates which can represent a point on the screen.
     * @param {number} x - Horizontal coordinate.
     * @param {number} y - Vertical coordinate.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculates the distance between two Point objects.
     * @param {Point} pointB - Coordinates of antoher point.
     * @returns {number} The distance as an integral number.
     */
    distance(pointB) {
        let dx = this.x - pointB.x;
        let dy = this.y - pointB.y;
    
        return (Math.floor(Math.sqrt(dx * dx + dy * dy)));
    }
}

class Ball {
    /**
     * The class Ball contain the information necessary to draw a circle on the screen.
     * @param {Point} center - Center coordinates.
     * @param {number} radius - Radius of the circle.
     * @param {Point} velocity - Velocity in which the object moves on the x and y axis.
     * @param {string|CanvasGradient|CanvasPattern} color - Color of the object to be drawn.
     * @param {CanvasRenderingContext2D} context - 2D drawing context.
     */
    constructor(center, radius, velocity, color, context) {
        this.center = center;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.context = context;
    }

    /**
     * Draws the ball on the screen.
     */
    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    }
}

// Defines an ENUM like object representing the status of the game
const GameStatus = {
    PLAY: 1,
    PAUSE: 2,
    STOP: 3
};

// Defines an ENUM like object representing the level of the game
const GameLevel = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
    CUSTOM: 'random'
};

/**
 * Generates a pseudo random integral number between min and max.
 * @param {number} min Lower bounder.
 * @param {number} max Upper bounder.
 * @return {number} An integral random number.
 */
function random(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * Simple algorithm to generate pseudo random integral number based on percentage distribution.
 * - The values inside the array represents the percentages.
 * - The length of the array represents the total number of available possibilities.
 * 
 * The values returned by the function are indexes of the freqDist array.
 * @param {Array} freqDist - An array of numbers with the frequency distribution.
 * @param {number} retLength - An optional parameter as the length of an array to be returned.
 * @return {number|Array} A single index or an array with freqDist's indexes.
 */
function distRandom(freqDist, retLength = 1) {
    /* The intention is to randomly pick an option based on a frequency distribuiton, not just
     * calculate the amount proportional to the percentages.
     * 1) Create an array with the length of the sum of freqDist's values (for an accurate result,
     *    the sum must be 100 or a notable fraction like 10, 20, 25 or 50).
     * 2) Fill the array with as many elements as corresponding to the percentage.
     *    Each value in this array is an index of freqDist.
     * 3) Shuffle the array, so the elements become randomly distributed.
     * 4) Pick a random number between 0 and the length of the array.
     * 5) return the element pointed by the index generated on step 4.
     * 
     * Example:
     * Imagine you have 5 options to choose and they have the following percentages:
     * Option 1 - 15%, Option 2 - 25%, Option 3 - 10%, Option 4 - 30%, Option 5 - 20%
     * 
     * For this case, we need a 5 elements array (each of which represents an option available).
     * We fill this array with values acording to the percentage distribution. A sum of 20 gives
     * us 5% correspondence, fitting nicely to the percentages.
     * We can, then, create the following array: [3, 5, 2, 6, 4], which corresponds exactly with the distribution.
     * This array is used as the freqDist argument to the function.
     * The array returned by distRandom contains values from 0 to 4 representing the options available.
     * 
     * PS: The function is not strictly tied to the percentages, meaning that it may generate results very differently of the distribution.
     *     It may be a good point as it consider the weight of the options but still remains random.
     */

    // Step 1
    let distribution = [];

    // Step 2
    for (let i = 0; i < freqDist.length; i++) {
        for (let j = 0; j < freqDist[i]; j++) {
            distribution.push(i);
        }
    }

    // Step 3
    // Shuffle 5 times for better randomization
    for (let i = 0; i < 5; i++) {
        shuffle(distribution);
    }

    // Step 4
    if(retLength > 1) {
        let array = [];
        for (let i = 0; i < retLength; i++) {
            array.push(random(0, freqDist.length - 1));
        }
        return array;
    } else {
        return distribution[random(0, freqDist.length - 1)];
    }
}

/**
 * Shuffles an Array object.
 * @param {Array} array - Array object.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}
