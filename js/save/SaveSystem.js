export default class SaveSystem {
    constructor(slotName = 'harvestlight_save') {
        this.slotName = slotName;
    }
    
    save(gameState, playerData, inventoryData, farmData, npcData, questData) {
        const saveData = {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            gameState: gameState,
            player: playerData,
            inventory: inventoryData,
            farm: farmData,
            npcs: npcData,
            quests: questData
        };
        
        try {
            localStorage.setItem(this.slotName, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }
    
    load() {
        try {
            const data = localStorage.getItem(this.slotName);
            if (data) {
                return JSON.parse(data);
            }
            return null;
        } catch (e) {
            console.error('Load failed:', e);
            return null;
        }
    }
    
    exists() {
        return localStorage.getItem(this.slotName) !== null;
    }
    
    delete() {
        localStorage.removeItem(this.slotName);
    }
    
    getAllSaves() {
        const saves = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('harvestlight_save')) {
                saves.push({
                    name: key,
                    data: JSON.parse(localStorage.getItem(key))
                });
            }
        }
        return saves;
    }
}
