export default class Input {
    constructor() {
        this.keys = {};
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = false;
        
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code.toLowerCase()] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code.toLowerCase()] = false;
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        document.addEventListener('mousedown', () => {
            this.mouseDown = true;
        });
        
        document.addEventListener('mouseup', () => {
            this.mouseDown = false;
        });
    }
    
    getInput() {
        return {
            up: this.isKeyPressed(['w', 'arrowup']),
            down: this.isKeyPressed(['s', 'arrowdown']),
            left: this.isKeyPressed(['a', 'arrowleft']),
            right: this.isKeyPressed(['d', 'arrowright']),
            interact: this.isKeyPressed(['e']),
            inventory: this.isKeyPressed(['i']),
            map: this.isKeyPressed(['m']),
            menu: this.isKeyPressed(['escape']),
            mouseX: this.mouseX,
            mouseY: this.mouseY,
            mouseDown: this.mouseDown
        };
    }
    
    isKeyPressed(keys) {
        return keys.some(key => this.keys[key]);
    }
}
