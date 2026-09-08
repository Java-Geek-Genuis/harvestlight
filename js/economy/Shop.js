export default class Shop {
    constructor(id, name, npcId) {
        this.id = id;
        this.name = name;
        this.npcId = npcId;
        this.inventory = [];
        this.openHour = 8;
        this.closeHour = 18;
        this.isOpen = true;
    }
    
    addInventory(itemId, quantity, price) {
        const item = this.inventory.find(i => i.id === itemId);
        
        if (item) {
            item.quantity += quantity;
        } else {
            this.inventory.push({
                id: itemId,
                quantity: quantity,
                price: price
            });
        }
    }
    
    removeInventory(itemId, quantity) {
        const item = this.inventory.find(i => i.id === itemId);
        
        if (item) {
            item.quantity -= quantity;
            if (item.quantity <= 0) {
                this.inventory = this.inventory.filter(i => i.id !== itemId);
            }
            return true;
        }
        return false;
    }
    
    hasItem(itemId, quantity = 1) {
        const item = this.inventory.find(i => i.id === itemId);
        return item && item.quantity >= quantity;
    }
    
    getItem(itemId) {
        return this.inventory.find(i => i.id === itemId);
    }
    
    getPrice(itemId) {
        const item = this.getItem(itemId);
        return item ? item.price : 0;
    }
    
    buyItem(playerInventory, itemId, quantity, playerMoney) {
        if (!this.hasItem(itemId, quantity)) {
            return { success: false, message: 'Shop out of stock' };
        }
        
        const price = this.getPrice(itemId);
        const totalCost = price * quantity;
        
        if (playerMoney < totalCost) {
            return { success: false, message: 'Not enough money' };
        }
        
        if (!playerInventory.addItem(itemId, quantity)) {
            return { success: false, message: 'Inventory full' };
        }
        
        this.removeInventory(itemId, quantity);
        return { success: true, cost: totalCost };
    }
    
    sellItem(playerInventory, itemId, quantity, sellPrice) {
        if (!playerInventory.hasItem(itemId, quantity)) {
            return { success: false, message: 'You don\'t have that item' };
        }
        
        playerInventory.removeItem(itemId, quantity);
        this.addInventory(itemId, quantity, sellPrice || 0);
        
        return { success: true, earned: sellPrice * quantity };
    }
}
