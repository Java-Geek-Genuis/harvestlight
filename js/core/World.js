export default class World {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.tiles = [];
        this.generateWorld();
    }
    
    generateWorld() {
        // Create tile map
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = this.generateTile(x, y);
            }
        }
    }
    
    generateTile(x, y) {
        // Simple procedural generation
        // River in the middle
        if (y > 20 && y < 25 && x > 5 && x < 40) {
            return { type: 'water', walkable: false };
        }
        
        // Town center area
        if (x > 15 && x < 35 && y > 10 && y < 20) {
            return { type: 'dirt', walkable: true };
        }
        
        // Forest areas
        if ((x < 10 && y < 15) || (x > 40 && y > 30)) {
            return { type: 'grass', walkable: true, hasForest: true };
        }
        
        // Default grass
        return { type: 'grass', walkable: true };
    }
    
    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return { type: 'stone', walkable: false };
        }
        return this.tiles[y][x];
    }
    
    setTile(x, y, tileType) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tiles[y][x] = tileType;
        }
    }
}
