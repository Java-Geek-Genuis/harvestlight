export default class Inventory {
    constructor(maxSlots = 20) {
        this.maxSlots = maxSlots;
        this.items = [];
        this.selectedSlot = 0;
    }
    
    addItem(itemId, quantity = 1) {
        const existingItem = this.items.find(i => i.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            if (this.items.length >= this.maxSlots) {
                return false;
            }
            this.items.push({
                id: itemId,
                quantity: quantity
            });
        }
        return true;
    }
    
    removeItem(itemId, quantity = 1) {
        const item = this.items.find(i => i.id === itemId);
        
        if (!item || item.quantity < quantity) {
            return false;
        }
        
        item.quantity -= quantity;
        
        if (item.quantity <= 0) {
            this.items = this.items.filter(i => i.id !== itemId);
        }
        
        return true;
    }
    
    hasItem(itemId, quantity = 1) {
        const item = this.items.find(i => i.id === itemId);
        return item && item.quantity >= quantity;
    }
    
    getItem(itemId) {
        return this.items.find(i => i.id === itemId);
    }
    
    getSlotCount() {
        return this.items.length;
    }
    
    isFull() {
        return this.items.length >= this.maxSlots;
    }
    
    clear() {
        this.items = [];
    }
    
    sort() {
        this.items.sort((a, b) => a.id.localeCompare(b.id));
    }
}
