import Quest from './Quest.js';

export default class QuestManager {
    constructor() {
        this.quests = [];
        this.activeQuests = [];
        this.completedQuests = [];
        this.initializeQuests();
    }
    
    initializeQuests() {
        const questData = [
            {
                id: 'welcome_to_hollow',
                name: 'Welcome to Bellweather Hollow',
                description: 'Explore the town and meet the locals',
                giver: 'mayor_hudson',
                type: 'exploration',
                objectives: ['Talk to Abel at the General Store', 'Talk to Mira at the Bakery', 'Explore the town square'],
                rewards: { money: 100, items: [] }
            },
            {
                id: 'first_harvest',
                name: 'First Harvest',
                description: 'Plant and harvest your first crop',
                giver: 'merchant_abel',
                type: 'farming',
                objectives: ['Till soil on your farm', 'Plant moonbean seeds', 'Water the crops', 'Harvest when ready'],
                rewards: { money: 150, items: ['honeyturnip_seed'] }
            },
            {
                id: 'gather_wood',
                name: 'Gather Wood',
                description: 'Collect wood from the forest',
                giver: 'craftsman_derek',
                type: 'gathering',
                objectives: ['Collect 10 wood from trees', 'Bring wood to Derek'],
                rewards: { money: 75, items: [] }
            },
            {
                id: 'help_the_mill',
                name: 'Restore the Mill',
                description: 'The old watermill needs investigation',
                giver: 'archivist_cedar',
                type: 'story',
                objectives: ['Visit the Old Watermill', 'Examine the mill carefully', 'Report back to Cedar'],
                rewards: { money: 200, items: ['iron_ore'] }
            },
            {
                id: 'mysterious_glow',
                name: 'The Lumenflow',
                description: 'Discover the source of the strange glow in the valley',
                giver: 'archivist_cedar',
                type: 'mystery',
                objectives: ['Explore Lantern Marsh', 'Find glowing plants', 'Return to Cedar with information'],
                rewards: { money: 300, items: ['crystal'] }
            }
        ];
        
        questData.forEach(data => {
            this.quests.push(new Quest(data));
        });
        
        // Start first quest automatically
        if (this.quests.length > 0) {
            this.acceptQuest('welcome_to_hollow');
        }
    }
    
    getQuest(id) {
        return this.quests.find(q => q.id === id);
    }
    
    acceptQuest(questId) {
        const quest = this.getQuest(questId);
        if (quest && !this.activeQuests.includes(quest)) {
            quest.start();
            this.activeQuests.push(quest);
            return true;
        }
        return false;
    }
    
    completeQuest(questId) {
        const quest = this.getQuest(questId);
        if (quest && quest.isActive) {
            quest.complete();
            this.activeQuests = this.activeQuests.filter(q => q.id !== questId);
            this.completedQuests.push(quest);
            return quest.rewards;
        }
        return null;
    }
    
    progressObjective(questId) {
        const quest = this.getQuest(questId);
        if (quest && quest.isActive) {
            const isComplete = quest.nextObjective();
            if (isComplete) {
                return this.completeQuest(questId);
            }
            return { progress: quest.getProgress() };
        }
        return null;
    }
    
    getActiveQuests() {
        return this.activeQuests;
    }
    
    getCompletedQuests() {
        return this.completedQuests;
    }
}
