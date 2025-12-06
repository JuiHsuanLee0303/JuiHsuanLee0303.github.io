<template>
  <div ref="container" class="interactive-3d w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps({
  type: {
    type: String,
    default: 'paper', // 'paper', 'conference', 'default'
    validator: (value) => ['paper', 'conference', 'default'].includes(value)
  },
  autoRotate: {
    type: Boolean,
    default: true
  },
  rotationSpeed: {
    type: Number,
    default: 0.01
  }
})

const container = ref(null)
let scene = null
let camera = null
let renderer = null
let controls = null
let mesh = null
let animationId = null

const initThree = () => {
  if (!container.value) return

  // 創建場景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  // 創建相機
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 200)

  // 創建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 創建控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = true
  controls.enablePan = false
  controls.autoRotate = props.autoRotate
  controls.autoRotateSpeed = props.rotationSpeed * 100

  // 添加光線
  const ambientLight = new THREE.AmbientLight(0x00ff00, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0x00ff00, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // 根據類型創建不同的3D模型
  createModel()

  // 動畫循環
  animate()

  // 處理窗口大小變化
  window.addEventListener('resize', handleResize)
}

const createModel = () => {
  let geometry, material

  switch (props.type) {
    case 'paper':
      // 論文圖標 - 使用文字幾何體或平面
      geometry = new THREE.PlaneGeometry(80, 100)
      material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      })
      mesh = new THREE.Mesh(geometry, material)
      break

    case 'conference':
      // 研討會圖標 - 使用圓柱體
      geometry = new THREE.CylinderGeometry(30, 30, 60, 32)
      material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      })
      mesh = new THREE.Mesh(geometry, material)
      break

    default:
      // 默認 - 使用八面體
      geometry = new THREE.OctahedronGeometry(50)
      material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      })
      mesh = new THREE.Mesh(geometry, material)
  }

  scene.add(mesh)

  // 添加懸停效果
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const onMouseMove = (event) => {
    const rect = container.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(mesh)

    if (intersects.length > 0) {
      mesh.scale.set(1.1, 1.1, 1.1)
      material.opacity = 0.9
    } else {
      mesh.scale.set(1, 1, 1)
      material.opacity = 0.6
    }
  }

  container.value.addEventListener('mousemove', onMouseMove)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (controls) {
    controls.update()
  }

  if (mesh && !props.autoRotate) {
    mesh.rotation.y += props.rotationSpeed
  }

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
  
  if (controls) {
    controls.dispose()
  }
  
  if (renderer && container.value && renderer.domElement) {
    container.value.removeChild(renderer.domElement)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (mesh) {
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) mesh.material.dispose()
  }
}

watch(() => props.type, () => {
  if (mesh) {
    scene.remove(mesh)
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) mesh.material.dispose()
  }
  createModel()
})

watch(() => props.autoRotate, (newVal) => {
  if (controls) {
    controls.autoRotate = newVal
  }
})

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.interactive-3d {
  position: relative;
}

.interactive-3d canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

