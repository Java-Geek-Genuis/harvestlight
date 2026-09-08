export default class Relationship {
    constructor() {
        this.npcRelationships = new Map();
    }
    
    setRelationship(npcId, level) {
        this.npcRelationships.set(npcId, level);
    }
    
    getRelationship(npcId) {
        return this.npcRelationships.get(npcId) || 0;
    }
    
    addRelationship(npcId, amount) {
        const current = this.getRelationship(npcId);
        this.setRelationship(npcId, Math.max(-100, Math.min(100, current + amount)));
    }
    
    getLevel(npcId) {
        const points = this.getRelationship(npcId);
        const level = Math.floor((points + 100) / 40);
        const levels = ['Stranger', 'Acquaintance', 'Friendly', 'Trusted', 'Close', 'Best Friend'];
        return levels[Math.min(level, 5)];
    }
}
