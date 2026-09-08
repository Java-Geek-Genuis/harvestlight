export default class LocationManager {
    constructor() {
        this.interiors = new Map();
        this.currentInterior = null;
        this.initializeInteriors();
    }
    
    initializeInteriors() {
        const interiorIds = [
            'general_store_interior',
            'bakery_interior',
            'workshop_interior',
            'watermill_interior',
            'tavern_interior',
            'archive_interior',
            'clinic_interior',
            'town_hall_interior'
        ];
        
        interiorIds.forEach(id => {
            this.interiors.set(id, this.createInterior(id));
        });
    }
    
    createInterior(id) {
        const width = 16;
        const height = 12;
        const tiles = [];
        
        for (let y = 0; y < height; y++) {
            tiles[y] = [];
            for (let x = 0; x < width; x++) {
                if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                    tiles[y][x] = { type: 'wall', walkable: false };
                } else {
                    tiles[y][x] = { type: 'floor', walkable: true };
                }
            }
        }
        
        return {
            id,
            name: this.getInteriorName(id),
            width,
            height,
            tiles,
            exitPoint: { x: 8, y: 11 }
        };
    }
    
    getInteriorName(id) {
        const names = {
            'general_store_interior': 'General Store',
            'bakery_interior': 'Cozy Bakery',
            'workshop_interior': 'Workshop',
            'watermill_interior': 'Old Watermill',
            'tavern_interior': 'Wanderer\'s Rest',
            'archive_interior': 'Archive',
            'clinic_interior': 'Healer\'s Cottage',
            'town_hall_interior': 'Town Hall'
        };
        return names[id] || 'Interior';
    }
    
    enterInterior(interiorId) {
        const interior = this.interiors.get(interiorId);
        if (interior) {
            this.currentInterior = interior;
            return interior;
        }
        return null;
    }
    
    exitInterior() {
        this.currentInterior = null;
    }
    
    getCurrentInterior() {
        return this.currentInterior;
    }
    
    isInsideInterior() {
        return this.currentInterior !== null;
    }
    
    getTile(x, y) {
        if (!this.currentInterior) return null;
        if (x < 0 || x >= this.currentInterior.width || y < 0 || y >= this.currentInterior.height) {
            return { type: 'wall', walkable: false };
        }
        return this.currentInterior.tiles[y][x];
    }
}
