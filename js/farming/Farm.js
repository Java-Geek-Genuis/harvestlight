export default class Farm {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.plots = [];
        this.initializePlots();
    }
    
    initializePlots() {
        for (let y = 0; y < this.height; y++) {
            this.plots[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.plots[y][x] = {
                    x: this.x + x,
                    y: this.y + y,
                    tilled: false,
                    crop: null,
                    daysPlanted: 0,
                    watered: false,
                    fertilized: false,
                    harvestable: false
                };
            }
        }
    }
    
    getPlot(x, y) {
        const localX = x - this.x;
        const localY = y - this.y;
        
        if (localX < 0 || localX >= this.width || localY < 0 || localY >= this.height) {
            return null;
        }
        
        return this.plots[localY][localX];
    }
    
    tillPlot(x, y) {
        const plot = this.getPlot(x, y);
        if (plot && !plot.tilled && !plot.crop) {
            plot.tilled = true;
            return true;
        }
        return false;
    }
    
    plantCrop(x, y, cropId) {
        const plot = this.getPlot(x, y);
        if (plot && plot.tilled && !plot.crop) {
            plot.crop = {
                id: cropId,
                daysPlanted: 0,
                currentStage: 0,
                watered: false,
                fertilized: false
            };
            return true;
        }
        return false;
    }
    
    waterPlot(x, y) {
        const plot = this.getPlot(x, y);
        if (plot && plot.crop) {
            plot.watered = true;
            plot.crop.watered = true;
            return true;
        }
        return false;
    }
    
    fertilizePlot(x, y) {
        const plot = this.getPlot(x, y);
        if (plot && plot.crop && !plot.fertilized) {
            plot.fertilized = true;
            plot.crop.fertilized = true;
            return true;
        }
        return false;
    }
    
    harvestPlot(x, y) {
        const plot = this.getPlot(x, y);
        if (plot && plot.harvestable) {
            const crop = plot.crop;
            plot.crop = null;
            plot.tilled = false;
            plot.watered = false;
            plot.fertilized = false;
            plot.harvestable = false;
            return crop;
        }
        return null;
    }
    
    updateCrops(cropsData, currentSeason) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const plot = this.plots[y][x];
                
                if (plot.crop) {
                    const cropData = cropsData.find(c => c.id === plot.crop.id);
                    if (cropData) {
                        if (plot.watered) {
                            plot.crop.daysPlanted += 1;
                            plot.watered = false;
                        }
                        
                        const growthMultiplier = plot.fertilized ? 1.2 : 1;
                        const daysToHarvest = cropData.growthDays / growthMultiplier;
                        
                        if (plot.crop.daysPlanted >= daysToHarvest) {
                            plot.harvestable = true;
                        }
                        
                        plot.crop.currentStage = Math.min(
                            cropData.growthStages - 1,
                            Math.floor((plot.crop.daysPlanted / daysToHarvest) * cropData.growthStages)
                        );
                    }
                }
            }
        }
    }
    
    getAllPlots() {
        const allPlots = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                allPlots.push(this.plots[y][x]);
            }
        }
        return allPlots;
    }
}
