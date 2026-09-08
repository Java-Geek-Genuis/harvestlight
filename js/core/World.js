export default class World {
    constructor() {
        this.width = 80;
        this.height = 80;
        this.tiles = [];
        this.buildings = [];
        this.objects = [];
        this.currentLocation = 'bellweather_hollow';
        this.locations = this.initializeLocations();
        this.generateWorld();
    }
    
    initializeLocations() {
        return {
            bellweather_hollow: {
                id: 'bellweather_hollow',
                name: 'Bellweather Hollow',
                width: 80,
                height: 80,
                description: 'A neglected rural settlement around an abandoned watermill',
                music: 'town_ambient',
                connections: [
                    { direction: 'north', target: 'whispergrove', x: 40, y: 5 },
                    { direction: 'east', target: 'copperbank_quarry', x: 75, y: 40 },
                    { direction: 'south', target: 'lantern_marsh', x: 40, y: 75 }
                ]
            },
            whispergrove: {
                id: 'whispergrove',
                name: 'Whispergrove Forest',
                width: 80,
                height: 80,
                description: 'A dense forest full of mystery and ancient trees',
                music: 'forest_ambient',
                connections: [
                    { direction: 'south', target: 'bellweather_hollow', x: 40, y: 75 },
                    { direction: 'east', target: 'glasswater_river', x: 75, y: 40 }
                ]
            },
            glasswater_river: {
                id: 'glasswater_river',
                name: 'Glasswater River',
                width: 80,
                height: 80,
                description: 'A peaceful river perfect for fishing and reflection',
                music: 'river_ambient',
                connections: [
                    { direction: 'west', target: 'whispergrove', x: 5, y: 40 },
                    { direction: 'south', target: 'bellweather_hollow', x: 40, y: 5 }
                ]
            },
            copperbank_quarry: {
                id: 'copperbank_quarry',
                name: 'Copperbank Quarry',
                width: 80,
                height: 80,
                description: 'Rich mineral deposits and mining caves',
                music: 'quarry_ambient',
                connections: [
                    { direction: 'west', target: 'bellweather_hollow', x: 5, y: 40 },
                    { direction: 'south', target: 'frostmere_ridge', x: 40, y: 5 }
                ]
            },
            frostmere_ridge: {
                id: 'frostmere_ridge',
                name: 'Frostmere Ridge',
                width: 80,
                height: 80,
                description: 'A late-game snowy region with rare resources',
                music: 'mountain_ambient',
                connections: [
                    { direction: 'north', target: 'copperbank_quarry', x: 40, y: 75 }
                ]
            },
            lantern_marsh: {
                id: 'lantern_marsh',
                name: 'Lantern Marsh',
                width: 80,
                height: 80,
                description: 'A mysterious marsh with glowing plants and secrets',
                music: 'marsh_ambient',
                connections: [
                    { direction: 'north', target: 'bellweather_hollow', x: 40, y: 5 }
                ]
            }
        };
    }
    
    generateWorld() {
        const location = this.locations[this.currentLocation];
        
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = this.generateTile(x, y, this.currentLocation);
            }
        }
        
        this.generateBuildings(this.currentLocation);
        this.generateObjects(this.currentLocation);
    }
    
    generateTile(x, y, location) {
        let tileType = 'grass';
        
        if (location === 'bellweather_hollow') {
            if (x > 20 && x < 60 && y > 15 && y < 55) {
                tileType = 'dirt';
            }
            if (y > 35 && y < 45 && x > 10 && x < 70) {
                tileType = 'water';
            }
        } else if (location === 'whispergrove') {
            tileType = Math.random() > 0.7 ? 'forest' : 'grass';
        } else if (location === 'glasswater_river') {
            tileType = (y > 25 && y < 55) ? 'water' : 'grass';
        } else if (location === 'copperbank_quarry') {
            tileType = (x > 25 && x < 55 && y > 25 && y < 55) ? 'stone' : 'dirt';
        } else if (location === 'frostmere_ridge') {
            tileType = 'snow';
        } else if (location === 'lantern_marsh') {
            tileType = Math.random() > 0.6 ? 'marsh' : 'water';
        }
        
        return { 
            type: tileType, 
            walkable: tileType !== 'water' && tileType !== 'stone',
            x,
            y
        };
    }
    
    generateBuildings(location) {
        this.buildings = [];
        
        if (location === 'bellweather_hollow') {
            this.buildings.push({
                id: 'general_store',
                name: 'General Store',
                x: 25, y: 20,
                width: 6, height: 6,
                type: 'shop',
                npc: 'merchant_abel',
                hasInterior: true,
                interior: 'general_store_interior'
            });
            
            this.buildings.push({
                id: 'bakery',
                name: 'Cozy Bakery',
                x: 35, y: 20,
                width: 6, height: 6,
                type: 'shop',
                npc: 'baker_mira',
                hasInterior: true,
                interior: 'bakery_interior'
            });
            
            this.buildings.push({
                id: 'workshop',
                name: 'Workshop',
                x: 45, y: 20,
                width: 6, height: 6,
                type: 'crafting',
                npc: 'craftsman_derek',
                hasInterior: true,
                interior: 'workshop_interior'
            });
            
            this.buildings.push({
                id: 'watermill',
                name: 'Old Watermill',
                x: 40, y: 35,
                width: 8, height: 8,
                type: 'landmark',
                hasInterior: true,
                interior: 'watermill_interior',
                story_important: true
            });
            
            this.buildings.push({
                id: 'tavern',
                name: 'Wanderer\'s Rest Tavern',
                x: 25, y: 40,
                width: 6, height: 6,
                type: 'social',
                npc: 'innkeeper_flora',
                hasInterior: true,
                interior: 'tavern_interior'
            });
            
            this.buildings.push({
                id: 'library',
                name: 'Archive',
                x: 45, y: 40,
                width: 6, height: 6,
                type: 'social',
                npc: 'archivist_cedar',
                hasInterior: true,
                interior: 'archive_interior'
            });
            
            this.buildings.push({
                id: 'clinic',
                name: 'Healer\'s Cottage',
                x: 55, y: 25,
                width: 6, height: 6,
                type: 'service',
                npc: 'healer_iris',
                hasInterior: true,
                interior: 'clinic_interior'
            });
            
            this.buildings.push({
                id: 'town_hall',
                name: 'Town Hall',
                x: 35, y: 35,
                width: 7, height: 7,
                type: 'government',
                npc: 'mayor_hudson',
                hasInterior: true,
                interior: 'town_hall_interior'
            });
        }
    }
    
    generateObjects(location) {
        this.objects = [];
        
        if (location === 'bellweather_hollow') {
            for (let i = 0; i < 15; i++) {
                this.objects.push({
                    type: 'tree',
                    x: Math.random() * 80,
                    y: Math.random() * 80,
                    harvestable: true,
                    resource: 'wood'
                });
            }
            
            for (let i = 0; i < 20; i++) {
                this.objects.push({
                    type: 'rock',
                    x: Math.random() * 80,
                    y: Math.random() * 80,
                    harvestable: true,
                    resource: 'stone'
                });
            }
        } else if (location === 'whispergrove') {
            for (let i = 0; i < 30; i++) {
                this.objects.push({
                    type: 'tree',
                    x: Math.random() * 80,
                    y: Math.random() * 80,
                    harvestable: true,
                    resource: 'wood'
                });
            }
        } else if (location === 'glasswater_river') {
            for (let i = 0; i < 8; i++) {
                this.objects.push({
                    type: 'fishing_spot',
                    x: 20 + Math.random() * 40,
                    y: 30 + Math.random() * 20,
                    fishAvailable: true
                });
            }
        }
    }
    
    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return { type: 'stone', walkable: false };
        }
        return this.tiles[y][x];
    }
    
    setTile(x, y, tileType) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tiles[y][x].type = tileType.type || 'grass';
            this.tiles[y][x].walkable = tileType.walkable !== false;
        }
    }
    
    getBuildings() {
        return this.buildings;
    }
    
    getBuilding(id) {
        return this.buildings.find(b => b.id === id);
    }
    
    getBuildingAt(x, y) {
        return this.buildings.find(b => 
            x >= b.x && x < b.x + b.width &&
            y >= b.y && y < b.y + b.height
        );
    }
    
    getObjects() {
        return this.objects;
    }
    
    getObjectsInArea(x, y, radius) {
        return this.objects.filter(obj => {
            const dist = Math.hypot(obj.x - x, obj.y - y);
            return dist < radius;
        });
    }
    
    removeObject(objectToRemove) {
        this.objects = this.objects.filter(obj => obj !== objectToRemove);
    }
    
    getCurrentLocation() {
        return this.locations[this.currentLocation];
    }
    
    changeLocation(locationId, playerX, playerY) {
        if (this.locations[locationId]) {
            this.currentLocation = locationId;
            this.generateWorld();
            return { x: playerX, y: playerY };
        }
        return null;
    }
    
    getLocationConnections() {
        const location = this.locations[this.currentLocation];
        return location ? location.connections : [];
    }
}
