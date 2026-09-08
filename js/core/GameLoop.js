export default class GameLoop {
    constructor() {
        this.isRunning = false;
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fpsUpdateTime = 0;
        this.currentFPS = 0;
        this.targetFPS = 60;
        this.updateCallback = null;
        this.renderCallback = null;
    }
    
    start(updateCallback, renderCallback) {
        this.updateCallback = updateCallback;
        this.renderCallback = renderCallback;
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this.loop();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    loop = () => {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
        this.lastFrameTime = currentTime;
        
        // Cap deltaTime to prevent large jumps
        const cappedDeltaTime = Math.min(deltaTime, 0.1);
        
        // Update
        if (this.updateCallback) {
            this.updateCallback(cappedDeltaTime);
        }
        
        // Render
        if (this.renderCallback) {
            this.renderCallback();
        }
        
        // FPS calculation
        this.frameCount++;
        if (currentTime - this.fpsUpdateTime >= 1000) {
            this.currentFPS = this.frameCount;
            this.frameCount = 0;
            this.fpsUpdateTime = currentTime;
        }
        
        requestAnimationFrame(this.loop);
    }
    
    getFPS() {
        return this.currentFPS;
    }
}
