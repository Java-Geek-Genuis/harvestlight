# HARVESTLIGHT

**An original browser-based farming/life RPG**

Restore Bellweather Hollow through farming, exploration, NPC relationships, and uncovering the valley's mysteries.

## Quick Start

### Requirements

- Python 3.8+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Running the Game

```bash
python server.py
```

Then open: `http://localhost`

**Note:** Port 80 requires administrator/root privileges. If you get a permission error:

```bash
python server.py --port 8000
```

Then open: `http://localhost:8000`

## Project Structure

```
harvestlight/
├── index.html          # Main game HTML
├── server.py           # Python development server
├── package.json        # Project metadata
├── README.md           # This file
│
├── assets/             # Game assets
│   ├── images/
│   ├── sprites/
│   ├── tiles/
│   ├── ui/
│   ├── audio/
│   └── fonts/
│
├── data/               # JSON game data
│   ├── crops.json
│   ├── items.json
│   ├── npcs.json
│   └── world.json
│
├── css/                # Stylesheets
│   └── main.css
│
└── js/                 # JavaScript modules
    ├── main.js         # Entry point
    ├── game.js         # Game manager
    └── core/           # Core systems
        ├── GameLoop.js
        ├── Input.js
        ├── Camera.js
        ├── Renderer.js
        └── AssetManager.js
```

## Controls

| Key | Action |
|-----|--------|
| `WASD` / `Arrow Keys` | Move |
| `E` | Interact |
| `I` | Inventory |
| `M` | Map |
| `ESC` | Menu |
| `F1` | Debug Toggle |

## Development

### Phase 1: Engine ✓
- [x] Repository setup
- [x] Python server
- [x] HTML/CSS structure
- [x] Game loop
- [x] Input system
- [x] Renderer (Canvas 2D)
- [x] Camera system
- [x] Player character
- [x] Collision detection
- [x] Asset manager

### Phase 2: World (In Progress)
- [ ] Map system
- [ ] Town layout
- [ ] Building interiors
- [ ] Terrain variety
- [ ] Transitions

### Phase 3: Farming
- [ ] Soil system
- [ ] Crops
- [ ] Watering
- [ ] Growth stages
- [ ] Harvesting

### Phase 4: NPCs
- [ ] NPC system
- [ ] Schedules
- [ ] Dialogue
- [ ] Relationships
- [ ] Gifts

### Phase 5: Economy
- [ ] Shops
- [ ] Currency
- [ ] Crafting
- [ ] Recipes

### Phase 6: Exploration
- [ ] Fishing
- [ ] Mining
- [ ] Foraging
- [ ] Collectibles

### Phase 7: Story
- [ ] Main narrative
- [ ] Quests
- [ ] Story progression
- [ ] Mysteries

### Phase 8: Polish
- [ ] Animations
- [ ] Particles
- [ ] Audio
- [ ] UI improvements

### Phase 9: QA
- [ ] Bug fixing
- [ ] Performance optimization
- [ ] Testing

## Game Concept

**Setting:** Bellweather Hollow, a neglected rural settlement centered around an abandoned watermill.

**Goal:** Restore the valley through farming, relationships, and uncovering its mysteries.

**Unique Mechanic:** The Lumenflow - an underground natural phenomenon that affects farming, structures, and exploration.

## Gameplay Features

- **Farming:** Plant, water, and harvest original crops
- **Exploration:** Discover multiple unique locations
- **NPCs:** Develop relationships with 24+ characters
- **Crafting:** Create tools, furniture, and recipes
- **Fishing:** Catch 35+ unique fish
- **Mining:** Extract resources from quarries
- **Quests:** Complete 50+ quests
- **Festivals:** Participate in seasonal events
- **Progression:** Level skills and unlock new content
- **Customization:** Build and decorate your farm

## Save System

Game state is persisted to browser localStorage:
- Player position and stats
- Inventory and equipment
- Farm layout and crops
- NPC relationships
- Quest progress
- World state

## Debug Mode

Press `F1` to toggle debug overlay showing:
- FPS
- Player coordinates
- Current map
- Game time
- Entity count

## Troubleshooting

**Port 80 Permission Denied:**
```bash
python server.py --port 8000
```

**Assets not loading:**
Ensure you're running from the project root directory.

**Blank screen:**
Check browser console (F12) for errors. Verify assets/ directory exists.

**Game runs but nothing displays:**
Verify your browser supports HTML5 Canvas. Try Chrome/Firefox.

## License

MIT License - See LICENSE file for details

## Credits

Harvestlight Development Team

---

**Status:** Phase 1 Engine Complete - Ready for Phase 2 World Building
