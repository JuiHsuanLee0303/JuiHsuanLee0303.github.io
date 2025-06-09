<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono">
    <div class="w-full max-w-2xl mx-auto">
      <div class="bg-gray-800 border-2 border-cyan-500 rounded-2xl shadow-2xl shadow-cyan-500/20">
        <!-- Header -->
        <div class="p-4 flex justify-between items-center border-b-2 border-cyan-500">
          <div>
            <h1 class="text-2xl font-bold text-cyan-400">星際殲滅者</h1>
            <p class="text-sm text-gray-400">方向鍵移動, 自動射擊</p>
          </div>
          <div class="text-right">
            <div class="text-lg">分數: <span class="font-bold text-green-400">{{ score }}</span></div>
            <div class="text-lg">生命: <span class="font-bold text-red-400">{{ lives }}</span></div>
            <div class="text-lg">波次: <span class="font-bold text-yellow-400">{{ waveDisplay }}</span></div>
          </div>
        </div>
        
        <!-- Game Canvas -->
        <div class="relative">
          <canvas ref="gameCanvas" class="w-full h-auto aspect-[4/3] rounded-b-xl"></canvas>
          <!-- Boss Health Bar -->
          <div v-if="bossActive" class="absolute top-4 left-1/4 right-1/4 z-20">
              <div class="w-full bg-gray-600 rounded-full h-4 border-2 border-purple-400">
                  <div class="bg-purple-600 h-full rounded-full transition-all duration-300" :style="{ width: bossHealthPercentage + '%' }"></div>
              </div>
              <p class="text-center text-purple-300 font-bold mt-1">BOSS 生命值</p>
          </div>
          <!-- Game Messages -->
          <div v-if="gameMessage" class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
             <h2 class="text-6xl font-bold text-white opacity-0 animate-wave-message">{{ gameMessage }}</h2>
          </div>
          <!-- Game Over Screen -->
          <div v-if="gameOver" class="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center z-10 rounded-b-xl">
            <h2 class="text-5xl font-bold text-red-500 mb-4 animate-pulse">任務失敗</h2>
            <p class="text-2xl mb-6">最終分數: {{ score }}</p>
            <button @click="startGame" class="px-8 py-3 rounded-full font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105">
              重新出擊
            </button>
          </div>
           <!-- Start Screen -->
          <div v-if="!gameStarted" class="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center z-10 rounded-b-xl">
            <h2 class="text-5xl font-bold text-cyan-400 mb-4">星際殲滅者</h2>
            <p class="text-xl mb-6">準備好挑戰無盡的敵人了嗎？</p>
            <button @click="startGame" class="px-8 py-3 rounded-full font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 animate-pulse">
              開始遊戲
            </button>
          </div>
        </div>
      </div>

      <!-- Back to list link -->
      <div class="text-center mt-6">
          <router-link to="/games" class="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 justify-center group-hover:gap-3 transition-all duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              返回遊戲列表
          </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';

const gameCanvas = ref(null);
const score = ref(0);
const lives = ref(3);
const wave = ref(0);
const gameMessage = ref('');
const gameOver = ref(false);
const gameStarted = ref(false);
const bossActive = ref(false);
const boss = ref(null);

const waveDisplay = computed(() => bossActive.value ? 'BOSS' : wave.value);
const bossHealthPercentage = computed(() => {
    if (!boss.value || boss.value.maxHealth === 0) return 0;
    return (boss.value.health / boss.value.maxHealth) * 100;
});

let ctx;
const player = reactive({
    x: 0, y: 0, width: 50, height: 40, speed: 7, shield: false, multiShot: false,
    lastShotTime: 0, fireRate: 250, shieldTimeout: null, multiShotTimeout: null,
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = player.multiShot ? '#f1c40f' : '#3498db';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Engine glow
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + this.height, 10, 10);

        if (this.shield) {
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 1.5, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
});

let bullets = [], enemies = [], enemyBullets = [], particles = [], stars = [], powerUps = [];
const keys = {};
let gameLoopId, waveManager;


// =========== CLASSES ===========
class Star {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 1 + 0.5;
    }
    update() {
        this.y += this.speed;
        if (this.y > this.canvas.height) {
            this.y = 0;
            this.x = Math.random() * this.canvas.width;
        }
    }
    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.size / 3})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class Entity {
    constructor(x, y, width, height, speed) { Object.assign(this, { x, y, width, height, speed }); }
    update() {}
    draw(ctx) {}
}

class Particle extends Entity {
    constructor(x, y, color) {
        super(x, y, Math.random() * 3 + 1, Math.random() * 3 + 1, 0);
        this.velocity = { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 };
        this.lifespan = 60; // 60 frames
        this.color = color;
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifespan--;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.lifespan / 60;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

class Bullet extends Entity {
    constructor(x, y) { super(x, y, 5, 10, 10); }
    update() { this.y -= this.speed; }
    draw(ctx) { ctx.fillStyle = '#f1c40f'; ctx.fillRect(this.x, this.y, this.width, this.height); }
}

class EnemyBullet extends Entity {
    constructor(x, y) { super(x, y, 5, 10, 5); }
    update() { this.y += this.speed; }
    draw(ctx) { ctx.fillStyle = '#e67e22'; ctx.fillRect(this.x, this.y, this.width, this.height); }
}

class Enemy extends Entity {
    constructor(type, canvasWidth) {
        const specs = {
            'normal': { width: 40, height: 30, speed: 2, health: 100, color: '#e74c3c', points: 100 },
            'weaver': { width: 35, height: 35, speed: 3, health: 80, color: '#9b59b6', points: 150 },
            'heavy': { width: 60, height: 40, speed: 1, health: 250, color: '#7f8c8d', points: 300 },
        };
        const spec = specs[type];
        super(Math.random() * (canvasWidth - spec.width), -spec.height, spec.width, spec.height, spec.speed);
        this.type = type;
        this.health = spec.health;
        this.maxHealth = spec.health;
        this.color = spec.color;
        this.points = spec.points;
        this.lastShot = Date.now();
        this.shootInterval = Math.random() * 1000 + (type === 'heavy' ? 1000 : 1500);

        // Movement properties
        if (this.type === 'weaver') {
            this.baseX = this.x;
            this.angle = 0;
        } else {
            this.horizontalSpeed = (Math.random() * 1.5) + 0.5;
            this.horizontalDirection = Math.random() < 0.5 ? 1 : -1;
            this.ticks = Math.floor(Math.random() * 1000); // Randomize start of sine wave
        }
    }
    update() {
        if (this.type === 'weaver') {
            // Weaver movement: continues to move in a sine wave pattern horizontally while moving down.
            this.y += this.speed;
            this.angle += 0.05;
            this.x = this.baseX + Math.sin(this.angle) * 80;
        } else {
            // New movement for 'normal' and 'heavy' enemies
            // Base downward movement, slightly slower to allow for more on-screen time
            this.y += this.speed * 0.75;

            // Horizontal movement (左右)
            this.x += this.horizontalSpeed * this.horizontalDirection;
            if (this.x <= 0 || this.x + this.width >= gameCanvas.value.width) {
                this.horizontalDirection *= -1;
                this.x += this.horizontalSpeed * this.horizontalDirection; // Prevent sticking to walls
            }

            // Vertical bobbing (前後) using a sine wave
            this.ticks++;
            this.y += Math.sin(this.ticks * 0.03) * 0.7;
        }

        // Shooting logic remains the same for all types
        if (Date.now() - this.lastShot > this.shootInterval && this.y > 0) {
            enemyBullets.push(new EnemyBullet(this.x + this.width / 2, this.y + this.height));
            this.lastShot = Date.now();
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.health < this.maxHealth) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y - 10, this.width, 5);
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y - 10, this.width * (this.health / this.maxHealth), 5);
        }
    }
    takeDamage(amount) {
        this.health -= amount;
        return this.health <= 0;
    }
}

class Boss extends Entity {
    constructor() {
        super(gameCanvas.value.width / 2 - 100, -200, 200, 150, 1);
        this.maxHealth = 10000;
        this.health = this.maxHealth;
        this.lastShot = Date.now();
        this.phase = 1;
        this.targetY = 50;
        this.direction = 1;
        this.moveSpeed = 1.5;
    }
    update() {
        if (this.y < this.targetY) { this.y += this.speed; } else {
            this.x += this.moveSpeed * this.direction;
            if (this.x <= 0 || this.x + this.width >= gameCanvas.value.width) {
                this.direction *= -1;
            }
        }
    }
    draw(ctx) {
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    takeDamage(amount) {
        this.health -= amount;
        return this.health <= 0;
    }
}

class PowerUp extends Entity {
    constructor(x, y, type) {
        super(x, y, 25, 25, 2);
        this.type = type;
        const specs = {
            'SHIELD': { color: '#3498db', symbol: 'S' },
            'MULTI_SHOT': { color: '#2ecc71', symbol: 'M' },
        };
        this.color = specs[type].color;
        this.symbol = specs[type].symbol;
    }
    update() { this.y += this.speed; }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, this.x + this.width / 2, this.y + this.height / 2);
        ctx.restore();
    }
}

class WaveManager {
    constructor(startWaveFn, spawnFn, spawnBossFn) {
        this.wave = 0;
        this.timer = null;
        this.enemiesToSpawn = 0;
        this.spawning = false;
        this.startWave = startWaveFn;
        this.spawn = spawnFn;
        this.spawnBoss = spawnBossFn;
    }
    nextWave() {
        if (this.spawning) return;
        this.spawning = true;
        this.wave++;
        
        setTimeout(() => {
            if (this.wave % 5 === 0) { // Boss wave
                this.spawnBoss();
                this.spawning = false;
                return;
            }
            this.startWave();
            this.enemiesToSpawn = 5 + this.wave * 2;
            let spawnedCount = 0;
            this.timer = setInterval(() => {
                if (spawnedCount < this.enemiesToSpawn) {
                    const type = this.wave > 3 ? (Math.random() < 0.3 ? 'heavy' : 'weaver') : 'normal';
                    this.spawn(type);
                    spawnedCount++;
                } else {
                    clearInterval(this.timer);
                    this.spawning = false;
                }
            }, 800);
        }, 3000); // 3-second delay between waves
    }
    update(enemiesAlive) {
        if (!this.spawning && enemiesAlive === 0 && !bossActive.value && gameStarted.value) {
            this.nextWave();
        }
    }
    stop() {
        clearInterval(this.timer);
        this.spawning = false;
        this.enemiesToSpawn = 0;
    }
}


// =========== LIFECYCLE & MAIN LOGIC ===========

onMounted(() => {
    ctx = gameCanvas.value.getContext('2d');
    gameCanvas.value.width = 800;
    gameCanvas.value.height = 600;
    
    const handleKeyDown = e => { if (!e.repeat) keys[e.code] = true; };
    const handleKeyUp = e => { keys[e.code] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    stars = Array.from({ length: 100 }, () => new Star(gameCanvas.value));
    drawInitialScreen();

    onUnmounted(() => {
        cancelAnimationFrame(gameLoopId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        if (waveManager) waveManager.stop();
    });
});

function drawInitialScreen() {
    if (!ctx) return;
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
    stars.forEach(star => star.draw(ctx));
}

function startGame() {
    score.value = 0;
    lives.value = 3;
    wave.value = 0;
    gameOver.value = false;
    gameStarted.value = true;
    bossActive.value = false;
    boss.value = null;
    
    player.x = gameCanvas.value.width / 2 - player.width / 2;
    player.y = gameCanvas.value.height - player.height - 20;
    player.shield = false;
    player.multiShot = false;

    clearTimeout(player.shieldTimeout);
    clearTimeout(player.multiShotTimeout);
    
    bullets = []; enemies = []; enemyBullets = []; particles = [], powerUps = [];

    if (waveManager) waveManager.stop();
    waveManager = new WaveManager(
        () => { wave.value++; gameMessage.value = `第 ${wave.value} 波`; setTimeout(() => gameMessage.value = '', 2000); }, 
        (type) => enemies.push(new Enemy(type, gameCanvas.value.width)), 
        () => { bossActive.value = true; boss.value = new Boss(); gameMessage.value = 'BOSS 出現!'; setTimeout(() => gameMessage.value = '', 2000); }
    );
    waveManager.nextWave();

    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    gameLoop();
}

function createExplosion(x, y, color, count = 20) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function playerHit() {
    if (player.shield) {
        player.shield = false;
        createExplosion(player.x + player.width/2, player.y + player.height/2, '#3498db', 30);
        return;
    }
    lives.value--;
    createExplosion(player.x + player.width/2, player.y + player.height/2, '#e74c3c', 50);
    if (lives.value <= 0) {
        gameOver.value = true;
        gameStarted.value = false;
        if (waveManager) waveManager.stop();
    }
}

function update() {
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < gameCanvas.value.width - player.width) player.x += player.speed;
    
    if (Date.now() - player.lastShotTime > player.fireRate) {
        player.lastShotTime = Date.now();
        if (player.multiShot) {
            bullets.push(new Bullet(player.x - 10, player.y));
            bullets.push(new Bullet(player.x + player.width/2 - 2.5, player.y - 10));
            bullets.push(new Bullet(player.x + player.width - 5 + 10, player.y));
        } else {
             bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y));
        }
    }
    
    [stars, bullets, enemies, enemyBullets, particles, powerUps].forEach(arr => arr.forEach(e => e.update()));
    if(boss.value) boss.value.update();
    
    particles = particles.filter(p => p.lifespan > 0);
    bullets = bullets.filter(b => b.y > -b.height);
    enemyBullets = enemyBullets.filter(b => b.y < gameCanvas.value.height);
    enemies = enemies.filter(e => e.y < gameCanvas.value.height + e.height);
    powerUps = powerUps.filter(p => p.y < gameCanvas.value.height);

    handleCollisions();
    
    if (waveManager) waveManager.update(enemies.length);
}

function handleCollisions() {
    // Player bullets vs Enemies
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            const b = bullets[i];
            const e = enemies[j];
            if (b && e && b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
                bullets.splice(i, 1);
                createExplosion(b.x, b.y, e.color, 5);
                if (e.takeDamage(50)) {
                    score.value += e.points;
                    createExplosion(e.x + e.width/2, e.y + e.height/2, e.color, 30);
                    enemies.splice(j, 1);
                    if (Math.random() < 0.15) { // 15% chance to drop power-up
                        powerUps.push(new PowerUp(e.x, e.y, Math.random() < 0.5 ? 'SHIELD' : 'MULTI_SHOT'));
                    }
                }
                break; 
            }
        }
    }

    // Player bullets vs Boss
    if (boss.value) {
        for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            if (b.x < boss.value.x + boss.value.width && b.x + b.width > boss.value.x && b.y < boss.value.y + boss.value.height && b.y + b.height > boss.value.y) {
                bullets.splice(i, 1);
                if (boss.value.takeDamage(50)) {
                    score.value += 10000;
                    bossActive.value = false;
                    boss.value = null;
                    createExplosion(b.x, b.y, '#8e44ad', 200);
                }
            }
        }
    }

    // Enemy bullets vs Player
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const eb = enemyBullets[i];
        if (eb.x < player.x + player.width && eb.x + eb.width > player.x && eb.y < player.y + player.height && eb.y + eb.height > player.y) {
            enemyBullets.splice(i, 1);
            playerHit();
            break;
        }
    }
    
    // Player vs Enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (player.x < e.x + e.width && player.x + player.width > e.x && player.y < e.y + e.height && player.y + player.height > e.y) {
            enemies.splice(i, 1);
            playerHit();
            break;
        }
    }

    // Player vs Power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const p = powerUps[i];
        if (player.x < p.x + p.width && player.x + player.width > p.x && player.y < p.y + p.height && player.y + player.height > p.y) {
            powerUps.splice(i, 1);
            if (p.type === 'SHIELD') {
                player.shield = true;
                clearTimeout(player.shieldTimeout);
                player.shieldTimeout = setTimeout(() => player.shield = false, 10000);
            } else if (p.type === 'MULTI_SHOT') {
                player.multiShot = true;
                clearTimeout(player.multiShotTimeout);
                player.multiShotTimeout = setTimeout(() => player.multiShot = false, 10000);
            }
        }
    }
}

function draw() {
    if(!ctx) return;
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
    
    [stars, bullets, enemyBullets, powerUps, enemies].forEach(arr => arr.forEach(e => e.draw(ctx)));
    if(boss.value) boss.value.draw(ctx);
    player.draw(ctx);
    particles.forEach(p => p.draw(ctx));
}

function gameLoop() {
    if (gameOver.value) {
        cancelAnimationFrame(gameLoopId);
        return;
    }
    update();
    draw();
    gameLoopId = requestAnimationFrame(gameLoop);
}
</script>

<style scoped>
canvas { background-color: #0c0a09; }
@keyframes wave-message-animation {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
}
.animate-wave-message { animation: wave-message-animation 2s ease-in-out forwards; }
</style> 