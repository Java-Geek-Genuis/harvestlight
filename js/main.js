import Game from './game.js';

// Initialize game
const game = new Game();

// Start game loop
game.start();

// Handle debug toggle
document.addEventListener('keydown', (e) => {
    if (e.key === 'F1') {
        e.preventDefault();
        game.toggleDebug();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    game.handleResize();
});

console.log('HARVESTLIGHT initialized');
