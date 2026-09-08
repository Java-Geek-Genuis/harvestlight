export default class NPC {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.personality = data.personality;
        this.x = data.x;
        this.y = data.y;
        this.home = data.home;
        this.occupation = data.occupation;
        this.schedule = data.schedule || [];
        this.likes = data.likes || [];
        this.dislikes = data.dislikes || [];
        this.favoriteGift = data.favoriteGift;
        this.relationshipWithPlayer = 0;
        this.currentDialogueIndex = 0;
        this.direction = 'down';
        this.isMoving = false;
    }
    
    updateRelationship(amount) {
        this.relationshipWithPlayer = Math.max(-100, Math.min(100, this.relationshipWithPlayer + amount));
    }
    
    getRelationshipLevel() {
        const level = Math.floor((this.relationshipWithPlayer + 100) / 40);
        const levels = ['Stranger', 'Acquaintance', 'Friendly', 'Trusted', 'Close', 'Best Friend'];
        return levels[Math.min(level, 5)];
    }
    
    receiveGift(itemId) {
        if (itemId === this.favoriteGift) {
            this.updateRelationship(10);
            return 'loved';
        } else if (this.likes.includes(itemId)) {
            this.updateRelationship(5);
            return 'liked';
        } else if (this.dislikes.includes(itemId)) {
            this.updateRelationship(-5);
            return 'disliked';
        }
        return 'neutral';
    }
    
    getDialogue() {
        const baseDialogue = [
            `Hello! I'm ${this.name}. Nice to see you!`,
            `How are you doing today?`,
            `The weather is nice, isn't it?`,
            `Have you been exploring the valley?`,
            `I hope to see you around!`
        ];
        return baseDialogue[this.currentDialogueIndex % baseDialogue.length];
    }
}
