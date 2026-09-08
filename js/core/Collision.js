export default class Collision {
    static checkTileCollision(x, y, world) {
        const tile = world.getTile(Math.floor(x), Math.floor(y));
        return !tile.walkable;
    }
    
    static checkBuildingCollision(x, y, world) {
        const building = world.getBuildingAt(Math.floor(x), Math.floor(y));
        return building !== undefined;
    }
    
    static checkObjectCollision(x, y, world, radius = 0.5) {
        return world.getObjectsInArea(x, y, radius).length > 0;
    }
    
    static isWalkable(x, y, world) {
        if (this.checkTileCollision(x, y, world)) return false;
        if (this.checkBuildingCollision(x, y, world)) return false;
        if (this.checkObjectCollision(x, y, world)) return false;
        return true;
    }
    
    static checkInteractionRange(playerX, playerY, targetX, targetY, range = 1.5) {
        const distance = Math.hypot(playerX - targetX, playerY - targetY);
        return distance <= range;
    }
}
