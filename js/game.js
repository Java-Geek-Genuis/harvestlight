import GameLoop from './core/GameLoop.js';
import Renderer from './core/Renderer.js';
import Input from './core/Input.js';
import Camera from './core/Camera.js';
import AssetManager from './core/AssetManager.js';
import Player from './core/Player.js';
import World from './core/World.js';

export default class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.debugMode = false;
        
        // Set canvas size
        this.setCanvasSize();
        
        // Initialize systems
        this.input = new Input();
        this.assetManager = new AssetManager();
        this.renderer = new Renderer(this.ctx);
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.world = new World();
        this.player = new Player(5, 5); // Start at tile (5, 5)
        this.gameLoop = new GameLoop();
        
        // Game state
        this.gameState = {
            day: 1,
            season: 'bloomtide',
            year: 1,
            time: 600, // 6:00 AM
            money: 500,
            weather: 'sunny',
            paused: false
        };
        
        // Bind methods
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }
    
    setCanvasSize() {
        // Standard game resolution: 1280x720
        const baseWidth = 1280;
        const baseHeight = 720;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        const scale = Math.min(scaleX, scaleY);
        
        this.canvas.width = baseWidth;
        this.canvas.height = baseHeight;
        this.canvas.style.transform = `scale(${scale})`;
        this.canvas.style.transformOrigin = 'top center';
    }
    
    handleResize() {
        this.setCanvasSize();
        this.camera.updateScreenSize(this.canvas.width, this.canvas.height);
    }
    
    toggleDebug() {
        this.debugMode = !this.debugMode;
        const debugOverlay = document.getElementById('debugOverlay');
        debugOverlay.classList.toggle('debug-hidden');
    }
    
    update(deltaTime) {
        if (this.gameState.paused) return;
        
        // Update player based on input
        const input = this.input.getInput();
        this.player.update(input, this.world);
        
        // Update camera to follow player
        this.camera.follow(this.player.x, this.player.y);
        
        // Update game time (simplified)
        this.gameState.time += deltaTime * 0.1; // Slow time progression
        if (this.gameState.time >= 1440) { // 24 hours
            this.gameState.time = 0;
            this.gameState.day++;
        }
        
        if (this.debugMode) {
            this.updateDebugInfo();
        }
    }
    
    updateDebugInfo() {
        const debugInfo = document.getElementById('debugInfo');
        const fps = Math.round(this.gameLoop.getFPS());
        const hours = Math.floor(this.gameState.time / 60);
        const minutes = Math.floor(this.gameState.time % 60);
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        
        debugInfo.innerHTML = `
            <div>FPS: ${fps}</div>
            <div>Player: (${this.player.x.toFixed(1)}, ${this.player.y.toFixed(1)})</div>
            <div>Tile: (${Math.floor(this.player.x)}, ${Math.floor(this.player.y)})</div>
            <div>Time: ${timeStr}</div>
            <div>Day: ${this.gameState.day}</div>
            <div>Season: ${this.gameState.season}</div>
            <div>Money: ${this.gameState.money}</div>
            <div>Camera: (${this.camera.x.toFixed(0)}, ${this.camera.y.toFixed(0)})</div>
        `;
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save camera context
        this.ctx.save();
        
        // Apply camera translation
        this.ctx.translate(
            this.canvas.width / 2 - this.camera.x * 32,
            this.canvas.height / 2 - this.camera.y * 32
        );
        
        // Render world
        this.renderer.renderWorld(this.ctx, this.world);
        
        // Render player
        this.renderer.renderPlayer(this.ctx, this.player);
        
        // Restore context
        this.ctx.restore();
        
        // Render UI (HUD) - on top of world
        this.renderHUD();
    }
    
    renderHUD() {
        // Simple HUD info
        const hours = Math.floor(this.gameState.time / 60);
        const minutes = Math.floor(this.gameState.time % 60);
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(10, 10, 200, 100);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`Season: ${this.gameState.season}`, 20, 30);
        this.ctx.fillText(`Day: ${this.gameState.day}`, 20, 50);
        this.ctx.fillText(`Time: ${timeStr}`, 20, 70);
        this.ctx.fillText(`Money: $${this.gameState.money}`, 20, 90);
        this.ctx.fillText(`Weather: ${this.gameState.weather}`, 20, 110);
    }
    
    start() {
        console.log('Starting game loop...');
        this.gameLoop.start(this.update, this.render);
    }
}
