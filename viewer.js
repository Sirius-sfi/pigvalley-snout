import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

function createViewer(window) {
  let scene = new THREE.Scene()

  let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10000)
  camera.position.x = 0.0
  camera.position.y = 0.0
  camera.position.z = 3.0
  camera.lookAt(origin)
  camera.up.set(0, 1, 0)

  let renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = false

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)

  function attachToElement(elementId) {
    var container = document.getElementById('container')
    container.appendChild(renderer.domElement)
  }

  return { window, scene, camera, renderer, attachToElement }
}

module.exports = {
  createViewer
}
