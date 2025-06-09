<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono">
    <div class="w-full max-w-4xl mx-auto">
      <div class="bg-gray-800 border-2 border-purple-500 rounded-2xl shadow-2xl shadow-purple-500/20">
        <!-- Header -->
        <div class="p-4 flex justify-between items-center border-b-2 border-purple-500">
          <div>
            <h1 class="text-2xl font-bold text-purple-400">殭屍殲滅者</h1>
            <p class="text-sm text-gray-400">使用 WASD 移動, 滑鼠點擊射擊</p>
          </div>
          <div class="text-right">
            <div class="text-lg">分數: <span class="font-bold text-green-400">{{ score }}</span></div>
            <div class="text-lg">生命: <span class="font-bold text-red-400">{{ player.health }}</span></div>
            <div class="text-lg">波次: <span class="font-bold text-yellow-400">{{ wave }}</span></div>
          </div>
        </div>
        
        <!-- Game Canvas -->
        <div class="relative">
          <canvas ref="gameCanvas" class="w-full h-auto aspect-video rounded-b-xl cursor-crosshair"></canvas>
           <!-- Game Messages -->
          <div v-if="waveMessage" class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
             <h2 class="text-6xl font-bold text-white opacity-0 animate-wave-message">{{ waveMessage }}</h2>
          </div>
          <!-- Game Over Screen -->
          <div v-if="gameOver" class="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center z-10 rounded-b-xl">
            <h2 class="text-5xl font-bold text-red-500 mb-4 animate-pulse">遊戲結束</h2>
            <p class="text-2xl mb-2">你撐到了第 {{ wave }} 波</p>
            <p class="text-2xl mb-6">你的分數: {{ score }}</p>
            <button @click="startGame" class="px-8 py-3 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
              再玩一次
            </button>
          </div>
        </div>
      </div>

      <!-- Back to list link -->
      <div class="text-center mt-6">
          <router-link to="/games" class="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 justify-center group-hover:gap-3 transition-all duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              返回遊戲列表
          </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const gameCanvas = ref(null);
const score = ref(0);
const wave = ref(0);
const waveMessage = ref('');
const gameOver = ref(false);

let ctx = null;
const player = reactive({ x: 0, y: 0, radius: 15, color: '#3b82f6', health: 100, gunAngle: 0, fireRate: 250, lastShotTime: 0 });
let bullets = [];
let zombies = [];
let particles = [];
let powerUps = [];
let zombiesAlive = ref(0);
const keys = reactive({});
const mousePos = reactive({ x: 0, y: 0 });
let gameLoopId = null;

const ZOMBIE_TYPES = {
  NORMAL: { color: '#10b981', radius: 15, speed: 1, health: 100, score: 10 },
  FAST: { color: '#f59e0b', radius: 10, speed: 2, health: 50, score: 15 },
  TANK: { color: '#8b5cf6', radius: 25, speed: 0.5, health: 300, score: 30 },
};

const POWERUP_TYPES = {
  HEALTH: { color: '#22c55e', symbol: '+', type: 'HEALTH' },
  RAPID_FIRE: { color: '#ec4899', symbol: '🔥', type: 'RAPID_FIRE' },
};


onMounted(() => {
  ctx = gameCanvas.value.getContext('2d');
  gameCanvas.value.width = 1280;
  gameCanvas.value.height = 720;
  
  const handleKeyDown = (e) => { keys[e.key.toLowerCase()] = true; };
  const handleKeyUp = (e) => { keys[e.key.toLowerCase()] = false; };
  const handleMouseMove = (e) => {
    const rect = gameCanvas.value.getBoundingClientRect();
    const scaleX = gameCanvas.value.width / rect.width;
    const scaleY = gameCanvas.value.height / rect.height;
    mousePos.x = (e.clientX - rect.left) * scaleX;
    mousePos.y = (e.clientY - rect.top) * scaleY;
  };
  
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  gameCanvas.value.addEventListener('mousemove', handleMouseMove);
  gameCanvas.value.addEventListener('mousedown', shoot);

  startGame();

  onUnmounted(() => {
    cancelAnimationFrame(gameLoopId);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  });
});

function startGame() {
  score.value = 0;
  wave.value = 0;
  gameOver.value = false;
  player.x = gameCanvas.value.width / 2;
  player.y = gameCanvas.value.height / 2;
  player.health = 100;
  player.fireRate = 250;
  bullets = [];
  zombies = [];
  particles = [];
  powerUps = [];
  zombiesAlive.value = 0;
  
  for (const key in keys) { delete keys[key]; }
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  
  startNextWave();
  gameLoop();
}

function startNextWave() {
    wave.value++;
    waveMessage.value = `第 ${wave.value} 波`;

    setTimeout(() => { waveMessage.value = ''; }, 2000);
    
    const numZombies = 5 + wave.value * 2;
    zombiesAlive.value = numZombies;

    for (let i = 0; i < numZombies; i++) {
        setTimeout(() => {
            const rand = Math.random();
            if (wave.value > 5 && rand < 0.2) spawnZombie('TANK');
            else if (wave.value > 2 && rand < 0.5) spawnZombie('FAST');
            else spawnZombie('NORMAL');
        }, i * 200);
    }
}

function shoot() {
  if(gameOver.value) return;
  const now = Date.now();
  if (now - player.lastShotTime < player.fireRate) return;
  player.lastShotTime = now;
  
  const angle = Math.atan2(mousePos.y - player.y, mousePos.x - player.x);
  bullets.push({ x: player.x, y: player.y, radius: 5, color: '#f59e0b', velocity: { x: Math.cos(angle) * 10, y: Math.sin(angle) * 10 } });

  createParticles(player.x + Math.cos(angle) * 20, player.y + Math.sin(angle) * 20, 3, '#f59e0b', 0.5, 2);
}

function spawnZombie(type) {
    const spec = ZOMBIE_TYPES[type];
    let x, y;
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - spec.radius : gameCanvas.value.width + spec.radius;
        y = Math.random() * gameCanvas.value.height;
    } else {
        x = Math.random() * gameCanvas.value.width;
        y = Math.random() < 0.5 ? 0 - spec.radius : gameCanvas.value.height + spec.radius;
    }
    zombies.push({ x, y, ...spec });
}

function createParticles(x, y, count, color, speed = 2, size = 3) {
    for(let i=0; i < count; i++) {
        particles.push({
            x, y,
            radius: Math.random() * size + 1,
            color,
            velocity: {
                x: (Math.random() - 0.5) * speed,
                y: (Math.random() - 0.5) * speed,
            },
            alpha: 1,
            friction: 0.98
        });
    }
}

function update() {
  player.gunAngle = Math.atan2(mousePos.y - player.y, mousePos.x - player.x);
  if (keys['w'] && player.y - player.radius > 0) player.y -= 4;
  if (keys['s'] && player.y + player.radius < gameCanvas.value.height) player.y += 4;
  if (keys['a'] && player.x - player.radius > 0) player.x -= 4;
  if (keys['d'] && player.x + player.radius < gameCanvas.value.width) player.x += 4;

  bullets.forEach((bullet, i) => {
    bullet.x += bullet.velocity.x;
    bullet.y += bullet.velocity.y;
    if (bullet.x < 0 || bullet.x > gameCanvas.value.width || bullet.y < 0 || bullet.y > gameCanvas.value.height) {
        setTimeout(() => bullets.splice(i, 1), 0);
    }
  });

  zombies.forEach((zombie, i) => {
    const angle = Math.atan2(player.y - zombie.y, player.x - zombie.x);
    zombie.x += Math.cos(angle) * zombie.speed * (1 + wave.value / 20);
    zombie.y += Math.sin(angle) * zombie.speed * (1 + wave.value / 20);

    bullets.forEach((bullet, j) => {
        if (Math.hypot(bullet.x - zombie.x, bullet.y - zombie.y) - zombie.radius - bullet.radius < 1) {
            zombie.health -= 50;
            createParticles(bullet.x, bullet.y, 5, zombie.color, 1);
            setTimeout(() => bullets.splice(j, 1), 0);

            if (zombie.health <= 0) {
                createParticles(zombie.x, zombie.y, 15, zombie.color, 3);
                score.value += zombie.score;
                zombiesAlive.value--;
                if(Math.random() < 0.15) { // 15% chance to drop powerup
                    const type = Math.random() < 0.5 ? 'HEALTH' : 'RAPID_FIRE';
                    powerUps.push({ x: zombie.x, y: zombie.y, radius: 10, ...POWERUP_TYPES[type], createdAt: Date.now() });
                }
                setTimeout(() => zombies.splice(i, 1), 0);
            }
        }
    });
    
    if (Math.hypot(player.x - zombie.x, player.y - zombie.y) - zombie.radius - player.radius < 1) {
        player.health -= 10;
        createParticles(player.x, player.y, 10, player.color, 2);
        setTimeout(() => zombies.splice(i, 1), 0);
        zombiesAlive.value--;
    }
  });
  
  if (player.health <= 0) {
    gameOver.value = true;
    player.health = 0;
  }
  
  if (zombiesAlive.value <= 0 && zombies.length === 0) {
    startNextWave();
  }
  
  particles.forEach((p, i) => {
      p.velocity.x *= p.friction;
      p.velocity.y *= p.friction;
      p.x += p.velocity.x;
      p.y += p.velocity.y;
      p.alpha -= 0.02;
      if (p.alpha <= 0) setTimeout(() => particles.splice(i, 1), 0);
  });
  
  powerUps.forEach((p, i) => {
      if(Math.hypot(player.x - p.x, player.y - p.y) - player.radius - p.radius < 1) {
          if(p.type === 'HEALTH') player.health = Math.min(100, player.health + 20);
          if(p.type === 'RAPID_FIRE') {
              player.fireRate = 100;
              setTimeout(() => player.fireRate = 250, 5000);
          }
          setTimeout(() => powerUps.splice(i, 1), 0);
      }
      if(Date.now() - p.createdAt > 8000) setTimeout(() => powerUps.splice(i, 1), 0);
  });
}

function draw() {
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

  // Draw grid
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  for (let i = 0; i < gameCanvas.value.width; i += 50) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, gameCanvas.value.height); ctx.stroke();
  }
  for (let i = 0; i < gameCanvas.value.height; i += 50) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(gameCanvas.value.width, i); ctx.stroke();
  }

  powerUps.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
      ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = 'white'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.symbol, p.x, p.y);
  });
  
  // Player
  ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(player.gunAngle);
  ctx.fillStyle = '#60a5fa'; ctx.fillRect(0, -5, 25, 10);
  ctx.restore();
  ctx.beginPath(); ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2); ctx.fillStyle = player.color; ctx.fill();

  bullets.forEach(b => { ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); ctx.fillStyle = b.color; ctx.fill(); });
  
  zombies.forEach(z => {
      ctx.beginPath(); ctx.arc(z.x, z.y, z.radius, 0, Math.PI * 2); ctx.fillStyle = z.color; ctx.fill();
      ctx.beginPath(); ctx.arc(z.x, z.y, z.radius * 0.7, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fill();
  });

  particles.forEach(p => {
    ctx.save(); ctx.globalAlpha = p.alpha;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
    ctx.restore();
  });
}

function gameLoop() {
  if (gameOver.value) { cancelAnimationFrame(gameLoopId); return; }
  update();
  draw();
  gameLoopId = requestAnimationFrame(gameLoop);
}
</script>

<style scoped>
@keyframes wave-message-animation {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
}
.animate-wave-message {
    animation: wave-message-animation 2s ease-in-out forwards;
}
</style> 