import Farm from './Farm.js';

export default class FarmingSystem {
    constructor(cropsData) {
        this.cropsData = cropsData;
        this.farm = new Farm(28, 35, 10, 8);
        this.selectedTool = 'hoe';
    }
    
    getTile(x, y) {
        const plot = this.farm.getPlot(x, y);
        
        if (!plot) {
            return { type: 'grass', walkable: true };
        }
        
        if (plot.crop) {
            return { type: 'crop', walkable: true, plot: plot };
        }
        
        if (plot.tilled) {
            return { type: 'tilled_soil', walkable: true, plot: plot };
        }
        
        return { type: 'grass', walkable: true, plot: plot };
    }
    
    setTool(toolName) {
        this.selectedTool = toolName;
    }
    
    useTool(x, y, tool) {
        const plot = this.farm.getPlot(x, y);
        if (!plot) return null;
        
        if (tool === 'hoe') {
            if (this.farm.tillPlot(x, y)) {
                return { action: 'till', success: true };
            }
        } else if (tool === 'watering_can') {
            if (plot.tilled && plot.crop) {
                if (this.farm.waterPlot(x, y)) {
                    return { action: 'water', success: true };
                }
            }
        } else if (tool === 'axe') {
            if (plot.tilled && plot.crop && plot.crop.harvestable) {
                const crop = this.farm.harvestPlot(x, y);
                return { action: 'harvest', success: true, crop: crop };
            }
        }
        
        return { action: tool, success: false };
    }
    
    plantSeed(x, y, cropId, inventory) {
        const seedId = `${cropId}_seed`;
        
        if (inventory.hasItem(seedId)) {
            if (this.farm.plantCrop(x, y, cropId)) {
                inventory.removeItem(seedId, 1);
                return { success: true, message: 'Seed planted' };
            }
        }
        
        return { success: false, message: 'Cannot plant here or no seed' };
    }
    
    harvestCrop(x, y) {
        const harvest = this.farm.harvestPlot(x, y);
        
        if (harvest) {
            const cropData = this.cropsData.find(c => c.id === harvest.id);
            return {
                success: true,
                cropId: harvest.id,
                cropData: cropData
            };
        }
        
        return { success: false };
    }
    
    updateFarm(currentSeason) {
        this.farm.updateCrops(this.cropsData, currentSeason);
    }
    
    getFarmPlots() {
        return this.farm.getAllPlots();
    }
    
    getFarmBounds() {
        return {
            x: this.farm.x,
            y: this.farm.y,
            width: this.farm.width,
            height: this.farm.height
        };
    }
}
