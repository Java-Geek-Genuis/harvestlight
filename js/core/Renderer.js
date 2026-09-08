export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.tileSize = 32;
    }
    
    renderWorld(ctx, world) {
        // Render background
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(-1000, -1000, 2000, 2000);
        
        // Render tiles
        for (let y = 0; y < world.height; y++) {
            for (let x = 0; x < world.width; x++) {
                const tile = world.getTile(x, y);
                this.renderTile(ctx, x, y, tile);
            }
        }
    }
    
    renderTile(ctx, x, y, tile) {
        const screenX = x * this.tileSize;
        const screenY = y * this.tileSize;
        
        // Base terrain color
        switch (tile.type) {
            case 'grass':
                ctx.fillStyle = '#4a7c2f';
                break;
            case 'water':
                ctx.fillStyle = '#1e5f8f';
                break;
            case 'sand':
                ctx.fillStyle = '#c8b88b';
                break;
            case 'stone':
                ctx.fillStyle = '#8b8b8b';
                break;
            case 'dirt':
                ctx.fillStyle = '#5d4037';
                break;
            default:
                ctx.fillStyle = '#333';
        }
        
        ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
        
        // Tile border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
    }
    
    renderPlayer(ctx, player) {
        const screenX = player.x * this.tileSize;
        const screenY = player.y * this.tileSize;
        
        // Draw player as a simple character
        ctx.fillStyle = player.color || '#ff6b6b';
        ctx.fillRect(screenX + 4, screenY + 4, this.tileSize - 8, this.tileSize - 8);
        
        // Draw head
        ctx.fillStyle = '#ffdbac';
        ctx.beginPath();
        ctx.arc(screenX + this.tileSize / 2, screenY + 8, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw eyes based on direction
        ctx.fillStyle = '#000';
        const eyeY = screenY + 6;
        if (player.direction === 'right') {
            ctx.fillRect(screenX + 16, eyeY, 2, 2);
        } else if (player.direction === 'left') {
            ctx.fillRect(screenX + 14, eyeY, 2, 2);
        } else if (player.direction === 'down') {
            ctx.fillRect(screenX + 14, eyeY + 1, 2, 2);
            ctx.fillRect(screenX + 18, eyeY + 1, 2, 2);
        } else {
            ctx.fillRect(screenX + 14, eyeY, 2, 2);
            ctx.fillRect(screenX + 18, eyeY, 2, 2);
        }
    }
}
