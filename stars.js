

const canvas = document.getElementById('starry-background');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;
const starColors = ['#FFFFFF', '#E0E0FF', '#D0D0F0', '#B1B1BD']

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Star {
    constructor(x, y, size, speed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.opacityDirection = 1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), Math.max(1, Math.floor(this.size)), Math.max(1, Math.floor(this.size)));
        ctx.globalAlpha = 1.0;
    }

    update() {
        this.y += this.speed;

        
        this.opacity += 0.01 * this.opacityDirection;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
            this.opacityDirection *= -1;
            this.opacity = Math.max(0.2, Math.min(0.8, this.opacity)); 
        }

        
        if (this.y > canvas.height + this.size) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
            this.speed = Math.random() * 0.3 + 0.05;
            this.size = Math.random() * 1.5 + 0.8;
        }
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 0.8;
        const speed = Math.random() * 0.2 + 0.05;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        stars.push(new Star(x, y, size, speed, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}


setCanvasSize();
initStars();
animate();


window.addEventListener('resize', () => {
    setCanvasSize();
    initStars();
});