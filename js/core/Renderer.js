export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.tileSize = 32;
        this.colors = {
            grass: '#4a7c2f',
            water: '#1e5f8f',
            sand: '#c8b88b',
            stone: '#8b8b8b',
            dirt: '#5d4037',
            forest: '#2d5016',
            snow: '#e8f4f8',
            marsh: '#4a5f2f',
            wall: '#654321',
            floor: '#deb887'
        };
    }
    
    renderWorld(ctx, world) {
        ctx.fillStyle = this.colors[world.tiles[0]?.[0]?.type] || '#2d5016';
        ctx.fillRect(-1000, -1000, 2000, 2000);
        
        for (let y = 0; y < world.height; y++) {
            for (let x = 0; x < world.width; x++) {
                const tile = world.getTile(x, y);
                this.renderTile(ctx, x, y, tile);
            }
        }
        
        this.renderObjects(ctx, world);
        this.renderBuildings(ctx, world);
    }
    
    renderTile(ctx, x, y, tile) {
        const screenX = x * this.tileSize;
        const screenY = y * this.tileSize;
        
        ctx.fillStyle = this.colors[tile.type] || '#333';
        ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
    }
    
    renderObjects(ctx, world) {
        const objects = world.getObjects();
        
        objects.forEach(obj => {
            const screenX = obj.x * this.tileSize;
            const screenY = obj.y * this.tileSize;
            
            if (obj.type === 'tree') {
                this.renderTree(ctx, screenX, screenY);
            } else if (obj.type === 'rock') {
                this.renderRock(ctx, screenX, screenY);
            } else if (obj.type === 'fishing_spot') {
                this.renderFishingSpot(ctx, screenX, screenY);
            }
        });
    }
    
    renderTree(ctx, x, y) {
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + 12, y + 16, 8, 16);
        ctx.fillStyle = '#2d5016';
        ctx.beginPath();
        ctx.arc(x + 16, y + 8, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#4a7c2f';
        ctx.beginPath();
        ctx.arc(x + 14, y + 6, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderRock(ctx, x, y) {
        ctx.fillStyle = '#8b8b8b';
        ctx.beginPath();
        ctx.ellipse(x + 16, y + 16, 10, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#a9a9a9';
        ctx.fillRect(x + 12, y + 12, 8, 8);
    }
    
    renderFishingSpot(ctx, x, y) {
        ctx.fillStyle = '#64b5f6';
        ctx.beginPath();
        ctx.arc(x + 16, y + 16, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e88e5';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + 16, y + 16, 8, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    renderBuildings(ctx, world) {
        const buildings = world.getBuildings();
        
        buildings.forEach(building => {
            const screenX = building.x * this.tileSize;
            const screenY = building.y * this.tileSize;
            const screenW = building.width * this.tileSize;
            const screenH = building.height * this.tileSize;
            
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(screenX, screenY, screenW, screenH);
            
            ctx.fillStyle = '#d2691e';
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(screenX + screenW / 2, screenY - 8);
            ctx.lineTo(screenX + screenW, screenY);
            ctx.fill();
            
            ctx.fillStyle = '#654321';
            const doorX = screenX + screenW / 2 - 8;
            const doorY = screenY + screenH - 16;
            ctx.fillRect(doorX, doorY, 16, 16);
            
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(doorX + 12, doorY + 8, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#87ceeb';
            ctx.fillRect(screenX + 4, screenY + 4, 8, 8);
            ctx.fillRect(screenX + screenW - 12, screenY + 4, 8, 8);
        });
    }
    
    renderPlayer(ctx, player) {
        const screenX = player.x * this.tileSize;
        const screenY = player.y * this.tileSize;
        
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(screenX + 6, screenY + 10, 20, 16);
        
        ctx.fillStyle = '#ffdbac';
        ctx.beginPath();
        ctx.arc(screenX + 16, screenY + 6, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        if (player.direction === 'right') {
            ctx.fillRect(screenX + 18, screenY + 4, 2, 2);
        } else if (player.direction === 'left') {
            ctx.fillRect(screenX + 14, screenY + 4, 2, 2);
        } else if (player.direction === 'down') {
            ctx.fillRect(screenX + 14, screenY + 5, 2, 2);
            ctx.fillRect(screenX + 18, screenY + 5, 2, 2);
        } else {
            ctx.fillRect(screenX + 14, screenY + 4, 2, 2);
            ctx.fillRect(screenX + 18, screenY + 4, 2, 2);
        }
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(screenX + 16, screenY + 28, 10, 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderInterior(ctx, interior) {
        for (let y = 0; y < interior.height; y++) {
            for (let x = 0; x < interior.width; x++) {
                const tile = interior.tiles[y][x];
                const screenX = x * this.tileSize;
                const screenY = y * this.tileSize;
                
                ctx.fillStyle = this.colors[tile.type] || '#888';
                ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
            }
        }
    }
}
