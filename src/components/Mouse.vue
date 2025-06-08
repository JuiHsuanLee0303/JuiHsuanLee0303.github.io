<template>
  <!-- 超酷炫鼠標效果系統 -->
  <div class="mouse-container">
    <!-- 主光標 - 內核 -->
    <div 
      ref="mouseCursor"
      class="mouse-cursor fixed pointer-events-none z-[99999]"
      style="top: 0; left: 0;"
    >
      <div class="cursor-core"></div>
      <div class="cursor-glow"></div>
      <div class="cursor-pulse"></div>
    </div>
    
    <!-- 拖曳尾巴特效容器 -->
    <div ref="trailsContainer" class="trails-container fixed pointer-events-none z-[99995]" style="top: 0; left: 0;"></div>
    
    <!-- 粒子軌跡容器 -->
    <div ref="trailContainer" class="trail-container fixed pointer-events-none z-[99990]" style="top: 0; left: 0;"></div>
    
    <!-- 點擊爆炸效果容器 -->
    <div ref="clickContainer" class="click-container fixed pointer-events-none z-[99998]" style="top: 0; left: 0;"></div>
    
    <!-- 磁力場指示器 -->
    <div ref="magneticIndicator" class="magnetic-indicator fixed pointer-events-none z-[99993] opacity-0" style="top: 0; left: 0;">
      <div class="magnetic-ring"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// DOM 引用
const mouseCursor = ref(null)
const trailsContainer = ref(null)
const trailContainer = ref(null)
const clickContainer = ref(null)
const magneticIndicator = ref(null)
const dynamicStyle = ref(null)

// 光標位置追蹤
const cursorPos = { x: 0, y: 0 }
const targetPos = { x: 0, y: 0 }
const velocity = { x: 0, y: 0 }
const prevPos = { x: 0, y: 0 }

// 拖曳尾巴系統
const trails = []
const maxTrails = 20
const trailSpacing = 8

// 特效狀態
const isHovering = ref(false)
const isClicking = ref(false)
const currentHoverElement = ref(null)
const magneticStrength = ref(0)

// 粒子軌跡
const particles = []
const maxParticles = 15

// 動畫控制
let animationFrameId = null
let magneticAnimationId = null
let trailAnimationId = null

// 顏色主題
const colorThemes = {
  default: ['#3b82f6', '#8b5cf6', '#ec4899'],
  fire: ['#ff6b35', '#f7931e', '#ffd23f'],
  ocean: ['#06d6a0', '#118ab2', '#073b4c'],
  sunset: ['#ff6b6b', '#ffa726', '#ab47bc'],
  neon: ['#00f5ff', '#ff00ff', '#00ff41']
}
let currentTheme = 'default'

// 創建拖曳尾巴節點
const createTrailNode = (x, y, index) => {
  const colors = colorThemes[currentTheme]
  return {
    x,
    y,
    life: 1,
    size: 18,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: 0,
    scale: 1
  }
}

// 更新拖曳尾巴
const updateTrails = () => {
  // 計算移動距離
  const distance = Math.sqrt(
    Math.pow(targetPos.x - prevPos.x, 2) + 
    Math.pow(targetPos.y - prevPos.y, 2)
  )
  
  // 降低門檻，更容易生成尾巴節點
  if (distance > 3) {
    // 在頭部添加新節點
    trails.unshift(createTrailNode(targetPos.x, targetPos.y, 0))
    
    // 移除多餘的節點
    if (trails.length > maxTrails) {
      trails.splice(maxTrails)
    }
    
    // 更新上一個位置
    prevPos.x = targetPos.x
    prevPos.y = targetPos.y
  }
  
  // 始終更新現有節點的位置（彈性跟隨）
  trails.forEach((trail, index) => {
    if (index === 0 && trails.length > 0) {
      // 第一個節點跟隨光標位置
      const ease = 0.15
      trail.x += (targetPos.x - trail.x) * ease
      trail.y += (targetPos.y - trail.y) * ease
    } else if (index > 0) {
      // 其他節點跟隨前一個節點
      const prevTrail = trails[index - 1]
      const ease = Math.max(0.08, 0.2 - (index * 0.006)) // 確保最小跟隨速度
      trail.x += (prevTrail.x - trail.x) * ease
      trail.y += (prevTrail.y - trail.y) * ease
      
      // 更新旋轉角度
      const dx = trail.x - prevTrail.x
      const dy = trail.y - prevTrail.y
      trail.rotation = Math.atan2(dy, dx) * 180 / Math.PI
    }
    
    // 重新計算節點屬性
    const progress = index / maxTrails
    trail.life = Math.max(0.1, 1 - progress * 0.8)
    trail.scale = Math.max(0.2, 1 - progress * 0.6)
    trail.size = Math.max(6, 20 - (progress * 14))
  })
}

// 渲染拖曳尾巴
const renderTrails = () => {
  if (!trailsContainer.value) {
    console.warn('trailsContainer not found')
    return
  }
  
  // 清除舊尾巴
  trailsContainer.value.innerHTML = ''
  
  // 如果沒有尾巴節點，不進行渲染
  if (trails.length === 0) return
  
  // 渲染新尾巴
  trails.forEach((trail, index) => {
    const trailEl = document.createElement('div')
    trailEl.className = 'trail-node'
    trailEl.style.position = 'absolute'
    trailEl.style.left = (trail.x - trail.size / 2) + 'px'
    trailEl.style.top = (trail.y - trail.size / 2) + 'px'
    trailEl.style.width = trail.size + 'px'
    trailEl.style.height = trail.size + 'px'
    trailEl.style.opacity = trail.life
    trailEl.style.transform = `scale(${trail.scale}) rotate(${trail.rotation}deg)`
    trailEl.style.borderRadius = '50%'
    trailEl.style.pointerEvents = 'none'
    trailEl.style.background = `radial-gradient(circle, ${trail.color}, ${trail.color}88, transparent)`
    trailEl.style.boxShadow = `0 0 ${trail.size * 0.8}px ${trail.color}66`
    trailEl.style.zIndex = '99995'
    
    trailsContainer.value.appendChild(trailEl)
  })
}

// 創建粒子
const createParticle = (x, y) => {
  const colors = colorThemes[currentTheme]
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 1,
    decay: 0.02 + Math.random() * 0.03,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 2 + Math.random() * 4,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10
  }
}

// 更新粒子系統
const updateParticles = () => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i]
    particle.x += particle.vx
    particle.y += particle.vy
    particle.life -= particle.decay
    particle.rotation += particle.rotationSpeed
    
    if (particle.life <= 0) {
      particles.splice(i, 1)
    }
  }
}

// 創建點擊爆炸效果
const createClickExplosion = (x, y) => {
  const explosion = document.createElement('div')
  explosion.className = 'click-explosion'
  explosion.style.left = x - 25 + 'px'
  explosion.style.top = y - 25 + 'px'
  
  if (clickContainer.value) {
    clickContainer.value.appendChild(explosion)
    
    setTimeout(() => {
      if (explosion.parentNode) {
        explosion.parentNode.removeChild(explosion)
      }
    }, 600)
  }
  
  // 創建爆炸粒子
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const speed = 3 + Math.random() * 4
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.03,
      color: colorThemes[currentTheme][i % colorThemes[currentTheme].length],
      size: 3 + Math.random() * 3,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 20
    })
  }
}

// 檢測懸停元素
const detectHoverElement = (x, y) => {
  const element = document.elementFromPoint(x, y)
  const isInteractive = element && (
    element.tagName === 'BUTTON' ||
    element.tagName === 'A' ||
    element.classList.contains('magnetic-button') ||
    element.closest('button') ||
    element.closest('a')
  )
  
  if (isInteractive !== isHovering.value) {
    isHovering.value = isInteractive
    updateCursorTheme()
  }
  
  currentHoverElement.value = isInteractive ? element : null
}

// 更新光標主題
const updateCursorTheme = () => {
  if (isHovering.value) {
    currentTheme = 'neon'
    magneticStrength.value = 1
  } else {
    currentTheme = 'default'
    magneticStrength.value = 0
  }
}

// 鼠標移動事件處理
const handleMouseMove = (e) => {
  // 計算速度
  velocity.x = e.clientX - targetPos.x
  velocity.y = e.clientY - targetPos.y
  
  // 更新目標位置
  targetPos.x = e.clientX
  targetPos.y = e.clientY
  
  // 檢測懸停元素
  detectHoverElement(e.clientX, e.clientY)
  
  // 初始化拖曳尾巴（如果還沒有節點）
  if (trails.length === 0) {
    for (let i = 0; i < 5; i++) {
      trails.push(createTrailNode(targetPos.x, targetPos.y, i))
    }
  }
  
  // 創建軌跡粒子
  if (Math.abs(velocity.x) + Math.abs(velocity.y) > 2 && particles.length < maxParticles) {
    particles.push(createParticle(targetPos.x, targetPos.y))
  }
  
  // 磁力按鈕效果（節流處理）
  if (!magneticAnimationId) {
    magneticAnimationId = requestAnimationFrame(() => {
      const magneticButtons = document.querySelectorAll('.magnetic-button')
      let hasNearbyMagnetic = false
      
      magneticButtons.forEach(button => {
        const buttonRect = button.getBoundingClientRect()
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + 
          Math.pow(e.clientY - buttonCenterY, 2)
        )
        
        if (distance < 120) {
          hasNearbyMagnetic = true
          const strength = (120 - distance) / 120
          const x = (e.clientX - buttonCenterX) * strength * 0.4
          const y = (e.clientY - buttonCenterY) * strength * 0.4
          
          button.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1 + strength * 0.15})`
          
          // 更新磁力指示器
          if (magneticIndicator.value) {
            magneticIndicator.value.style.opacity = strength * 0.6
            magneticIndicator.value.style.transform = `translate3d(${buttonCenterX - 30}px, ${buttonCenterY - 30}px, 0) scale(${1 + strength * 0.5})`
          }
        } else {
          button.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
        }
      })
      
      if (!hasNearbyMagnetic && magneticIndicator.value) {
        magneticIndicator.value.style.opacity = '0'
      }
      
      magneticAnimationId = null
    })
  }
}

// 鼠標離開時重置按鈕位置
const handleMouseLeave = () => {
  const magneticButtons = document.querySelectorAll('.magnetic-button')
  magneticButtons.forEach(button => {
    button.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
  })
}

// 渲染粒子
const renderParticles = () => {
  if (!trailContainer.value) return
  
  // 清除舊粒子
  trailContainer.value.innerHTML = ''
  
  // 渲染新粒子
  particles.forEach(particle => {
    const particleEl = document.createElement('div')
    particleEl.className = 'trail-particle'
    particleEl.style.left = particle.x - particle.size / 2 + 'px'
    particleEl.style.top = particle.y - particle.size / 2 + 'px'
    particleEl.style.width = particle.size + 'px'
    particleEl.style.height = particle.size + 'px'
    particleEl.style.backgroundColor = particle.color
    particleEl.style.opacity = particle.life
    particleEl.style.transform = `rotate(${particle.rotation}deg)`
    trailContainer.value.appendChild(particleEl)
  })
}

// 光標動畫循環
const animateCursor = () => {
  // 主光標 - 彈性跟隨
  const easeInner = isHovering.value ? 0.3 : 0.2
  cursorPos.x += (targetPos.x - cursorPos.x) * easeInner
  cursorPos.y += (targetPos.y - cursorPos.y) * easeInner
  
  // 計算速度影響
  const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
  const scale = Math.min(1 + speed * 0.015, 1.5)
  
  // 更新光標樣式
  if (mouseCursor.value) {
    const rotation = Math.atan2(velocity.y, velocity.x) * 180 / Math.PI
    mouseCursor.value.style.transform = `translate3d(${cursorPos.x - 15}px, ${cursorPos.y - 15}px, 0) scale(${scale}) rotate(${rotation}deg)`
    
    // 更新主題
    mouseCursor.value.className = `mouse-cursor fixed pointer-events-none z-50 ${isHovering.value ? 'hovering' : ''} ${isClicking.value ? 'clicking' : ''}`
  }
  
  // 更新拖曳尾巴
  updateTrails()
  renderTrails()
  
  // 更新粒子
  updateParticles()
  renderParticles()
  
  animationFrameId = requestAnimationFrame(animateCursor)
}

// 點擊事件處理
const handleMouseDown = (e) => {
  isClicking.value = true
  createClickExplosion(e.clientX, e.clientY)
}

const handleMouseUp = () => {
  isClicking.value = false
}

onMounted(() => {
  // 設置光標初始位置
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  targetPos.x = centerX
  targetPos.y = centerY
  cursorPos.x = centerX
  cursorPos.y = centerY
  prevPos.x = centerX
  prevPos.y = centerY
  
  // 初始化拖曳尾巴
  for (let i = 0; i < 8; i++) {
    trails.push(createTrailNode(centerX, centerY, i))
  }
  
  // 添加全局鼠標事件監聽器
  document.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mousedown', handleMouseDown, { passive: true })
  document.addEventListener('mouseup', handleMouseUp, { passive: true })
  
  // 強制隱藏所有元素的光標
  document.body.style.cursor = 'none'
  document.documentElement.style.cursor = 'none'
  
  // 添加全局樣式來隱藏光標
  dynamicStyle.value = document.createElement('style')
  dynamicStyle.value.textContent = `
    *, *:hover, *:focus, *:active {
      cursor: none !important;
    }
    button, a, input, textarea, select {
      cursor: none !important;
    }
  `
  document.head.appendChild(dynamicStyle.value)
  
  // 啟動光標動畫循環
  animateCursor()
})

onUnmounted(() => {
  // 停止光標動畫
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  // 移除全局事件監聽器
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
  
  // 恢復系統光標
  document.body.style.cursor = 'auto'
  document.documentElement.style.cursor = 'auto'
  
  // 移除動態添加的樣式
  if (dynamicStyle.value && dynamicStyle.value.parentNode) {
    dynamicStyle.value.parentNode.removeChild(dynamicStyle.value)
  }
})
</script>

<style scoped>
/* 容器樣式 */
.mouse-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99999;
}

/* 主光標樣式 */
.mouse-cursor {
  width: 30px;
  height: 30px;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  transition: all 0.1s ease-out;
}

.cursor-core {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 
    0 0 10px rgba(59, 130, 246, 0.8),
    0 0 20px rgba(139, 92, 246, 0.6),
    0 0 30px rgba(236, 72, 153, 0.4);
  animation: coreGlow 2s ease-in-out infinite alternate;
}

.cursor-glow {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: glowPulse 1.5s ease-in-out infinite;
}

.cursor-pulse {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulseRing 2s ease-out infinite;
}

/* 拖曳尾巴特效 */
.trails-container {
  width: 100%;
  height: 100%;
}

.trail-node {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  transition: all 0.1s ease-out;
  backdrop-filter: blur(1px);
}

/* 懸停狀態 */
.mouse-cursor.hovering .cursor-core {
  background: radial-gradient(circle, #00f5ff 0%, #ff00ff 50%, #00ff41 100%);
  box-shadow: 
    0 0 15px rgba(0, 245, 255, 0.9),
    0 0 25px rgba(255, 0, 255, 0.7),
    0 0 35px rgba(0, 255, 65, 0.5);
  animation: hoverCoreGlow 1s ease-in-out infinite alternate;
}

.mouse-cursor.hovering .cursor-glow {
  background: radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%);
  animation: hoverGlowPulse 1s ease-in-out infinite;
}



/* 點擊狀態 */
.mouse-cursor.clicking .cursor-core {
  transform: translate(-50%, -50%) scale(1.5);
  background: radial-gradient(circle, #fff 0%, #ff6b35 50%, #f7931e 100%);
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 1),
    0 0 30px rgba(255, 107, 53, 0.8),
    0 0 40px rgba(247, 147, 30, 0.6);
}

/* 粒子軌跡 */
.trail-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 6px currentColor;
  animation: particleFade 0.8s ease-out forwards;
}

/* 點擊爆炸效果 */
:global(.click-explosion) {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  animation: explosion 0.6s ease-out forwards;
  box-shadow: 
    0 0 20px rgba(255, 107, 53, 0.8),
    0 0 40px rgba(247, 147, 30, 0.6),
    0 0 60px rgba(255, 215, 0, 0.4);
}

/* 磁力場指示器 */
.magnetic-indicator {
  width: 60px;
  height: 60px;
  transition: all 0.3s ease-out;
}

.magnetic-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px dashed rgba(0, 245, 255, 0.6);
  border-radius: 50%;
  animation: magneticRotate 4s linear infinite;
}

/* 動畫定義 */
@keyframes coreGlow {
  0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(236, 72, 153, 0.4); }
  100% { box-shadow: 0 0 15px rgba(59, 130, 246, 1), 0 0 25px rgba(139, 92, 246, 0.8), 0 0 35px rgba(236, 72, 153, 0.6); }
}

@keyframes hoverCoreGlow {
  0% { box-shadow: 0 0 15px rgba(0, 245, 255, 0.9), 0 0 25px rgba(255, 0, 255, 0.7), 0 0 35px rgba(0, 255, 65, 0.5); }
  100% { box-shadow: 0 0 20px rgba(0, 245, 255, 1), 0 0 30px rgba(255, 0, 255, 0.9), 0 0 40px rgba(0, 255, 65, 0.7); }
}

@keyframes glowPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
}

@keyframes hoverGlowPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.8; }
}

@keyframes pulseRing {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
}

@keyframes trailFloat {
  0% { 
    transform: scale(1.2) rotate(0deg); 
    opacity: 0.9; 
  }
  50% { 
    transform: scale(1.1) rotate(180deg); 
    opacity: 0.7; 
  }
  100% { 
    transform: scale(0.8) rotate(360deg); 
    opacity: 0.3; 
  }
}

@keyframes particleFade {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.3); }
}

@keyframes explosion {
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes magneticRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 全局光標隱藏 */
:global(body) {
  cursor: none !important;
}

:global(body *) {
  cursor: none !important;
}

:global(button) {
  cursor: none !important;
}

:global(a) {
  cursor: none !important;
}

:global(input) {
  cursor: none !important;
}

:global(.custom-cursor) {
  cursor: none !important;
}

:global(.custom-cursor *) {
  cursor: none !important;
}

/* 磁力按鈕增強效果 */
:global(.magnetic-button) {
  cursor: none !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

:global(.magnetic-button:hover) {
  filter: brightness(1.1) drop-shadow(0 0 10px rgba(59, 130, 246, 0.4));
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
</style>
