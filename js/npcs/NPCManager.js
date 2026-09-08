import NPC from './NPC.js';

export default class NPCManager {
    constructor() {
        this.npcs = [];
        this.initializeNPCs();
    }
    
    initializeNPCs() {
        const npcData = [
            {
                id: 'merchant_abel',
                name: 'Abel',
                age: 45,
                personality: 'friendly',
                x: 28,
                y: 22,
                home: 'general_store',
                occupation: 'Merchant',
                likes: ['wood', 'stone'],
                dislikes: [],
                favoriteGift: 'lantern_melon'
            },
            {
                id: 'baker_mira',
                name: 'Mira',
                age: 32,
                personality: 'cheerful',
                x: 38,
                y: 22,
                home: 'bakery',
                occupation: 'Baker',
                likes: ['honeyturnip', 'moonbean'],
                dislikes: [],
                favoriteGift: 'cloudberry'
            },
            {
                id: 'craftsman_derek',
                name: 'Derek',
                age: 50,
                personality: 'serious',
                x: 48,
                y: 22,
                home: 'workshop',
                occupation: 'Craftsman',
                likes: ['wood', 'copper_ore'],
                dislikes: [],
                favoriteGift: 'iron_ore'
            },
            {
                id: 'innkeeper_flora',
                name: 'Flora',
                age: 55,
                personality: 'warm',
                x: 28,
                y: 42,
                home: 'tavern',
                occupation: 'Innkeeper',
                likes: ['river_rice', 'fiber'],
                dislikes: [],
                favoriteGift: 'moonbean'
            },
            {
                id: 'archivist_cedar',
                name: 'Cedar',
                age: 60,
                personality: 'mysterious',
                x: 48,
                y: 42,
                home: 'library',
                occupation: 'Archivist',
                likes: ['wood', 'stone'],
                dislikes: [],
                favoriteGift: 'cloudberry'
            },
            {
                id: 'healer_iris',
                name: 'Iris',
                age: 40,
                personality: 'caring',
                x: 58,
                y: 27,
                home: 'clinic',
                occupation: 'Healer',
                likes: ['honeyturnip', 'cloudberry'],
                dislikes: [],
                favoriteGift: 'lantern_melon'
            },
            {
                id: 'mayor_hudson',
                name: 'Hudson',
                age: 65,
                personality: 'authoritative',
                x: 38,
                y: 38,
                home: 'town_hall',
                occupation: 'Mayor',
                likes: ['wood', 'lantern_melon'],
                dislikes: [],
                favoriteGift: 'copper_carrot'
            },
            {
                id: 'smith_kort',
                name: 'Kort',
                age: 55,
                personality: 'gruff',
                x: 65,
                y: 35,
                home: 'blacksmith',
                occupation: 'Blacksmith',
                likes: ['copper_ore', 'iron_ore'],
                dislikes: [],
                favoriteGift: 'iron_ore'
            }
        ];
        
        npcData.forEach(data => {
            this.npcs.push(new NPC(data));
        });
    }
    
    getNPC(id) {
        return this.npcs.find(npc => npc.id === id);
    }
    
    getNPCAt(x, y, range = 1) {
        return this.npcs.find(npc => 
            Math.hypot(npc.x - x, npc.y - y) <= range
        );
    }
    
    getAllNPCs() {
        return this.npcs;
    }
    
    updateNPCs(deltaTime) {
        this.npcs.forEach(npc => {
            npc.isMoving = Math.random() > 0.98;
            if (npc.isMoving) {
                const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
                npc.x += dx * 0.5;
                npc.y += dy * 0.5;
            }
        });
    }
}
