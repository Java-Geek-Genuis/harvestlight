import GameLoop from './core/GameLoop.js';
import Renderer from './core/Renderer.js';
import Input from './core/Input.js';
import Camera from './core/Camera.js';
import AssetManager from './core/AssetManager.js';
import Player from './core/Player.js';
import World from './core/World.js';
import LocationManager from './world/LocationManager.js';
import FarmingSystem from './farming/FarmingSystem.js';
import Inventory from './farming/Inventory.js';
import Economy from './economy/Economy.js';

export default class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.debugMode = false;
        
        this.setCanvasSize();
        
        this.input = new Input();
        this.assetManager = new AssetManager();
        this.renderer = new Renderer(this.ctx);
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.world = new World();
        this.locationManager = new LocationManager();
        this.player = new Player(25, 30);
        this.gameLoop = new GameLoop();
        
        // Load crops data
        this.cropsData = [
            { id: 'moonbean', name: 'Moonbean', seedPrice: 40, growthDays: 5, growthStages: 4, sellPrice: 120 },
            { id: 'emberroot', name: 'Emberroot', seedPrice: 35, growthDays: 4, growthStages: 3, sellPrice: 100 },
            { id: 'honeyturnip', name: 'Honeyturnip', seedPrice: 45, growthDays: 6, growthStages: 4, sellPrice: 140 },
            { id: 'bluebell_pepper', name: 'Bluebell Pepper', seedPrice: 50, growthDays: 7, growthStages: 4, sellPrice: 160 },
            { id: 'lantern_melon', name: 'Lantern Melon', seedPrice: 60, growthDays: 8, growthStages: 4, sellPrice: 200 },
            { id: 'frostpea', name: 'Frostpea', seedPrice: 40, growthDays: 5, growthStages: 3, sellPrice: 130 },
            { id: 'sunburst_squash', name: 'Sunburst Squash', seedPrice: 45, growthDays: 6, growthStages: 4, sellPrice: 150 },
            { id: 'river_rice', name: 'River Rice', seedPrice: 30, growthDays: 4, growthStages: 3, sellPrice: 80 },
            { id: 'cloudberry', name: 'Cloudberry', seedPrice: 55, growthDays: 7, growthStages: 4, sellPrice: 180 },
            { id: 'copper_carrot', name: 'Copper Carrot', seedPrice: 35, growthDays: 4, growthStages: 3, sellPrice: 95 }
        ];
        
        this.farmingSystem = new FarmingSystem(this.cropsData);
        this.inventory = new Inventory(30);
        this.economy = new Economy();
        
        this.gameState = {
            day: 1,
            season: 'bloomtide',
            year: 1,
            time: 600,
            money: 500,
            weather: 'sunny',
            paused: false
        };
        
        // Add starting seeds and items
        this.inventory.addItem('moonbean_seed', 5);
        this.inventory.addItem('river_rice_seed', 5);
        this.inventory.addItem('wood', 10);
        this.inventory.addItem('stone', 8);
        
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }
    
    setCanvasSize() {
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
        
        const input = this.input.getInput();
        
        if (this.locationManager.isInsideInterior()) {
            const interior = this.locationManager.getCurrentInterior();
            const mockWorld = {
                width: interior.width,
                height: interior.height,
                getTile: (x, y) => this.locationManager.getTile(x, y),
                getBuildingAt: () => null,
                getObjectsInArea: () => []
            };
            this.player.update(input, mockWorld, deltaTime);
            
            if (input.interact && this.player.y >= interior.height - 1) {
                this.locationManager.exitInterior();
                this.player.x = 25;
                this.player.y = 20;
            }
        } else {
            this.player.update(input, this.world, deltaTime);
            this.checkLocationTransitions();
            
            // Handle farming interactions
            if (input.interact) {
                const playerPos = this.player.getTilePosition();
                const plot = this.farmingSystem.farm.getPlot(playerPos.x, playerPos.y);
                
                if (plot) {
                    if (plot.crop && plot.harvestable) {
                        const harvest = this.farmingSystem.harvestCrop(playerPos.x, playerPos.y);
                        if (harvest.success) {
                            const cropData = this.cropsData.find(c => c.id === harvest.cropId);
                            this.inventory.addItem(harvest.cropId, 1);
                            this.gameState.money += cropData.sellPrice * 0.8;
                        }
                    } else if (!plot.tilled) {
                        this.farmingSystem.farm.tillPlot(playerPos.x, playerPos.y);
                    }
                } else {
                    // Check building entry
                    const building = this.world.getBuildingAt(
                        Math.floor(this.player.x),
                        Math.floor(this.player.y)
                    );
                    if (building && building.hasInterior) {
                        this.locationManager.enterInterior(building.interior);
                        this.player.x = 8;
                        this.player.y = 10;
                    }
                }
            }
            
            // Water crops with W key
            if (input.water) {
                const playerPos = this.player.getTilePosition();
                const plot = this.farmingSystem.farm.getPlot(playerPos.x, playerPos.y);
                if (plot && plot.tilled && plot.crop) {
                    this.farmingSystem.farm.waterPlot(playerPos.x, playerPos.y);
                }
            }
        }
        
        this.camera.follow(this.player.x, this.player.y);
        
        // Update time and farming
        this.gameState.time += deltaTime * 0.1;
        if (this.gameState.time >= 1440) {
            this.gameState.time = 0;
            this.gameState.day++;
            this.farmingSystem.updateFarm(this.gameState.season);
        }
        
        if (this.debugMode) {
            this.updateDebugInfo();
        }
    }
    
    checkLocationTransitions() {
        const connections = this.world.getLocationConnections();
        const playerPos = this.player.getTilePosition();
        
        connections.forEach(conn => {
            if (Math.hypot(playerPos.x - conn.x, playerPos.y - conn.y) < 1) {
                const spawnPos = this.world.changeLocation(conn.target, conn.x, conn.y);
                if (spawnPos) {
                    this.player.x = spawnPos.x;
                    this.player.y = spawnPos.y;
                }
            }
        });
    }
    
    updateDebugInfo() {
        const debugInfo = document.getElementById('debugInfo');
        const fps = Math.round(this.gameLoop.getFPS());
        const hours = Math.floor(this.gameState.time / 60);
        const minutes = Math.floor(this.gameState.time % 60);
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const location = this.world.getCurrentLocation();
        const interior = this.locationManager.isInsideInterior() ? this.locationManager.getCurrentInterior().name : 'None';
        
        debugInfo.innerHTML = `
            <div>FPS: ${fps}</div>
            <div>Player: (${this.player.x.toFixed(1)}, ${this.player.y.toFixed(1)})</div>
            <div>Tile: (${Math.floor(this.player.x)}, ${Math.floor(this.player.y)})</div>
            <div>Time: ${timeStr}</div>
            <div>Day: ${this.gameState.day}</div>
            <div>Season: ${this.gameState.season}</div>
            <div>Money: $${this.gameState.money}</div>
            <div>Location: ${location.name}</div>
            <div>Interior: ${interior}</div>
            <div>Inventory: ${this.inventory.getSlotCount()}/${this.inventory.maxSlots}</div>
            <div>Buildings: ${this.world.buildings.length}</div>
        `;
    }
    
    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.save();
        this.ctx.translate(
            this.canvas.width / 2 - this.camera.x * 32,
            this.canvas.height / 2 - this.camera.y * 32
        );
        
        if (this.locationManager.isInsideInterior()) {
            const interior = this.locationManager.getCurrentInterior();
            this.renderer.renderInterior(this.ctx, interior);
            this.renderer.renderPlayer(this.ctx, this.player);
        } else {
            this.renderer.renderWorld(this.ctx, this.world, this.farmingSystem);
            this.renderer.renderPlayer(this.ctx, this.player);
        }
        
        this.ctx.restore();
        this.renderHUD();
    }
    
    renderHUD() {
        const hours = Math.floor(this.gameState.time / 60);
        const minutes = Math.floor(this.gameState.time % 60);
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const location = this.world.getCurrentLocation();
        const staminaPercent = Math.round((this.player.stamina / this.player.maxStamina) * 100);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(10, 10, 300, 140);
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(10, 10, 300, 140);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(location.name, 20, 30);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`${this.gameState.season.charAt(0).toUpperCase() + this.gameState.season.slice(1)} ${this.gameState.day}`, 20, 50);
        this.ctx.fillText(`Time: ${timeStr}`, 20, 70);
        this.ctx.fillText(`Money: $${this.gameState.money}`, 20, 90);
        this.ctx.fillText(`Stamina: ${staminaPercent}%`, 20, 110);
        this.ctx.fillText(`Inventory: ${this.inventory.getSlotCount()}/${this.inventory.maxSlots}`, 20, 130);
        
        const barWidth = 100;
        const barHeight = 8;
        const barX = 150;
        const barY = 102;
        
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(barX, barY, barWidth, barHeight);
        
        this.ctx.fillStyle = staminaPercent > 50 ? '#4caf50' : staminaPercent > 25 ? '#ffc107' : '#f44336';
        this.ctx.fillRect(barX, barY, (barWidth * staminaPercent) / 100, barHeight);
        
        this.ctx.strokeStyle = '#666';
        this.ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // Controls
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.font = '10px Arial';
        this.ctx.fillText('WASD/Arrows: Move | E: Till/Harvest | W: Water | I: Inventory | M: Map | F1: Debug', 10, this.canvas.height - 10);
    }
    
    start() {
        console.log('Starting HARVESTLIGHT...');
        console.log('Phase 3: Farming - Crops, soil tilling, watering, harvesting, inventory, and economy');
        this.gameLoop.start(this.update, this.render);
    }
}
