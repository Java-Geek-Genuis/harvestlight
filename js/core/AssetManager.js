export default class AssetManager {
    constructor() {
        this.images = {};
        this.audio = {};
        this.isLoading = false;
        this.loadedCount = 0;
        this.totalCount = 0;
    }
    
    loadImage(name, path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                reject(new Error(`Failed to load image: ${path}`));
            };
            img.src = path;
        });
    }
    
    getImage(name) {
        if (!this.images[name]) {
            console.warn(`Image not found: ${name}`);
            return null;
        }
        return this.images[name];
    }
    
    loadAudio(name, path) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                this.audio[name] = audio;
                resolve(audio);
            };
            audio.onerror = () => {
                console.error(`Failed to load audio: ${path}`);
                reject(new Error(`Failed to load audio: ${path}`));
            };
            audio.src = path;
        });
    }
    
    getAudio(name) {
        if (!this.audio[name]) {
            console.warn(`Audio not found: ${name}`);
            return null;
        }
        return this.audio[name];
    }
    
    async preloadAssets() {
        this.isLoading = true;
        const promises = [];
        
        // Add image preloads here when assets are available
        // Example: promises.push(this.loadImage('player', 'assets/sprites/player.png'));
        
        try {
            await Promise.all(promises);
            console.log('Assets loaded successfully');
        } catch (error) {
            console.error('Asset loading failed:', error);
        }
        
        this.isLoading = false;
    }
}
