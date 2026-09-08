export default class Player {
    constructor(startX = 0, startY = 0) {
        this.x = startX;
        this.y = startY;
        this.vx = 0;
        this.vy = 0;
        this.speed = 4; // tiles per second
        this.direction = 'down';
        this.color = '#ff6b6b';
        this.isMoving = false;
        this.stamina = 100;
        this.maxStamina = 100;
    }
    
    update(input, world) {
        // Reset velocity
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
        
        // Handle movement input
        if (input.up) {
            this.vy = -this.speed;
            this.direction = 'up';
            this.isMoving = true;
        }
        if (input.down) {
            this.vy = this.speed;
            this.direction = 'down';
            this.isMoving = true;
        }
        if (input.left) {
            this.vx = -this.speed;
            this.direction = 'left';
            this.isMoving = true;
        }
        if (input.right) {
            this.vx = this.speed;
            this.direction = 'right';
            this.isMoving = true;
        }
        
        // Update position with delta time
        const gameLoop = 0.016; // Approximate 60 FPS delta
        let newX = this.x + this.vx * gameLoop;
        let newY = this.y + this.vy * gameLoop;
        
        // Check collision with world bounds
        if (newX >= 0 && newX < world.width - 1) {
            this.x = newX;
        }
        if (newY >= 0 && newY < world.height - 1) {
            this.y = newY;
        }
        
        // Stamina management
        if (this.isMoving) {
            this.stamina = Math.max(0, this.stamina - 0.1);
        } else {
            this.stamina = Math.min(this.maxStamina, this.stamina + 0.05);
        }
    }
    
    getPosition() {
        return { x: Math.floor(this.x), y: Math.floor(this.y) };
    }
    
    getTilePosition() {
        return { x: Math.floor(this.x), y: Math.floor(this.y) };
    }
}
