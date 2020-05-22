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

