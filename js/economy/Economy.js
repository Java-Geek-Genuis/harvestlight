import Shop from './Shop.js';

export default class Economy {
    constructor() {
        this.shops = new Map();
        this.initializeShops();
    }
    
    initializeShops() {
        const shop1 = new Shop('general_store', 'General Store', 'merchant_abel');
        shop1.addInventory('moonbean_seed', 10, 40);
        shop1.addInventory('emberroot_seed', 15, 35);
        shop1.addInventory('honeyturnip_seed', 10, 45);
        shop1.addInventory('bluebell_pepper_seed', 8, 50);
        shop1.addInventory('lantern_melon_seed', 5, 60);
        shop1.addInventory('frostpea_seed', 12, 40);
        shop1.addInventory('sunburst_squash_seed', 10, 45);
        shop1.addInventory('river_rice_seed', 20, 30);
        shop1.addInventory('cloudberry_seed', 6, 55);
        shop1.addInventory('copper_carrot_seed', 15, 35);
        shop1.addInventory('fertilizer', 20, 20);
        this.shops.set('general_store', shop1);
        
        const shop2 = new Shop('blacksmith', 'Blacksmith', 'smith_kort');
        shop2.addInventory('copper_ore', 30, 30);
        shop2.addInventory('iron_ore', 20, 50);
        this.shops.set('blacksmith', shop2);
    }
    
    getShop(shopId) {
        return this.shops.get(shopId);
    }
    
    getAllShops() {
        return Array.from(this.shops.values());
    }
}
