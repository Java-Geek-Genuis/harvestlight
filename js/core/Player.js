import Collision from './Collision.js';

export default class Player {
    constructor(startX = 0, startY = 0) {
        this.x = startX;
        this.y = startY;
        this.vx = 0;
        this.vy = 0;
        this.speed = 4;
        this.direction = 'down';
        this.color = '#ff6b6b';
        this.isMoving = false;
        this.stamina = 100;
        this.maxStamina = 100;
        this.inBuilding = false;
        this.currentBuilding = null;
    }
    
    update(input, world, deltaTime) {
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
        
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
        
        let newX = this.x + this.vx * deltaTime;
        let newY = this.y + this.vy * deltaTime;
        
        if (!Collision.checkTileCollision(newX, newY, world) &&
            !Collision.checkBuildingCollision(newX, newY, world)) {
            this.x = newX;
            this.y = newY;
        }
        
        const building = world.getBuildingAt(Math.floor(this.x), Math.floor(this.y));
        if (building && input.interact && building.hasInterior) {
            this.inBuilding = true;
            this.currentBuilding = building;
        }
        
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
