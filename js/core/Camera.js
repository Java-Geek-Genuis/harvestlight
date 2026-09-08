export default class Camera {
    constructor(screenWidth, screenHeight) {
        this.x = 0;
        this.y = 0;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.zoom = 1;
        this.smoothing = 0.1; // Camera smoothing factor
    }
    
    follow(targetX, targetY) {
        // Smooth camera movement
        this.x += (targetX - this.x) * this.smoothing;
        this.y += (targetY - this.y) * this.smoothing;
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    
    setZoom(z) {
        this.zoom = Math.max(0.5, Math.min(z, 3));
    }
    
    getZoom() {
        return this.zoom;
    }
    
    updateScreenSize(width, height) {
        this.screenWidth = width;
        this.screenHeight = height;
    }
    
    isInView(x, y, width, height) {
        const viewLeftEdge = this.x - this.screenWidth / (2 * 32);
        const viewRightEdge = this.x + this.screenWidth / (2 * 32);
        const viewTopEdge = this.y - this.screenHeight / (2 * 32);
        const viewBottomEdge = this.y + this.screenHeight / (2 * 32);
        
        return !(x + width < viewLeftEdge || x > viewRightEdge ||
                 y + height < viewTopEdge || y > viewBottomEdge);
    }
}
