<template>
  <div ref="container" class="three-background fixed inset-0 -z-10"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene = null
let camera = null
let renderer = null
let particles = null
let animationId = null
let geometries = []

const initThree = () => {
  if (!container.value) return

  // 創建場景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  // 創建相機
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 1000

  // 創建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 創建粒子系統
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000
    positions[i + 1] = (Math.random() - 0.5) * 2000
    positions[i + 2] = (Math.random() - 0.5) * 2000

    // 終端機綠色
    colors[i] = 0
    colors[i + 1] = 1
    colors[i + 2] = 0
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // 創建幾何體動畫
  createGeometries()

  // 添加光線
  const ambientLight = new THREE.AmbientLight(0x00ff00, 0.3)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0x00ff00, 0.5)
  pointLight.position.set(0, 0, 500)
  scene.add(pointLight)

  // 動畫循環
  animate()

  // 處理窗口大小變化
  window.addEventListener('resize', handleResize)
}

const createGeometries = () => {
  // 創建旋轉的立方體
  const cubeGeometry = new THREE.BoxGeometry(50, 50, 50)
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(-200, 100, -500)
  scene.add(cube)
  geometries.push({ mesh: cube, rotationSpeed: { x: 0.01, y: 0.01, z: 0.01 } })

  // 創建旋轉的球體
  const sphereGeometry = new THREE.SphereGeometry(40, 16, 16)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(200, -100, -500)
  scene.add(sphere)
  geometries.push({ mesh: sphere, rotationSpeed: { x: 0.015, y: 0.01, z: 0.005 } })

  // 創建旋轉的環形
  const torusGeometry = new THREE.TorusGeometry(30, 10, 16, 100)
  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })
  const torus = new THREE.Mesh(torusGeometry, torusMaterial)
  torus.position.set(0, 150, -600)
  scene.add(torus)
  geometries.push({ mesh: torus, rotationSpeed: { x: 0.01, y: 0.02, z: 0.01 } })
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (particles) {
    particles.rotation.x += 0.0005
    particles.rotation.y += 0.001

    // 更新粒子位置
    const positions = particles.geometry.attributes.position.array
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.5
    }
    particles.geometry.attributes.position.needsUpdate = true
  }

  // 更新幾何體旋轉
  geometries.forEach(({ mesh, rotationSpeed }) => {
    mesh.rotation.x += rotationSpeed.x
    mesh.rotation.y += rotationSpeed.y
    mesh.rotation.z += rotationSpeed.z
  })

  // 旋轉相機
  camera.position.x = Math.sin(Date.now() * 0.0005) * 100
  camera.position.y = Math.cos(Date.now() * 0.0003) * 100
  camera.lookAt(scene.position)

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

const handleResize = () => {
  if (!container.value || !camera || !renderer) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  
  if (renderer && container.value && renderer.domElement) {
    container.value.removeChild(renderer.domElement)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  geometries.forEach(({ mesh }) => {
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) mesh.material.dispose()
  })
  
  if (particles) {
    if (particles.geometry) particles.geometry.dispose()
    if (particles.material) particles.material.dispose()
  }
}

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.three-background {
  pointer-events: none;
}

.three-background canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

