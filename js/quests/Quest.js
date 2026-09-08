export default class Quest {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.giver = data.giver;
        this.type = data.type;
        this.objectives = data.objectives || [];
        this.rewards = data.rewards || {};
        this.isActive = false;
        this.isCompleted = false;
        this.currentObjective = 0;
    }
    
    start() {
        this.isActive = true;
    }
    
    complete() {
        this.isCompleted = true;
        this.isActive = false;
    }
    
    getProgress() {
        return `${this.currentObjective}/${this.objectives.length}`;
    }
    
    nextObjective() {
        this.currentObjective++;
        if (this.currentObjective >= this.objectives.length) {
            this.complete();
            return true;
        }
        return false;
    }
}
