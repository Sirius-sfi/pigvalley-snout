import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

function createViewer(window) {
  let scene = new THREE.Scene()

  let renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  let updaters = []

  let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10000)
  camera.position.x = 0.0
  camera.position.y = 0.0
  camera.position.z = 3.0
  camera.lookAt(origin)
  camera.up.set(0, 1, 0)

  var cameraRadius = 1.0;
  function cameraUpdate(time) {
    /*
    camera.position.x = cameraRadius * Math.cos(time)
    camera.position.y = cameraRadius * Math.sin(time)
    camera.position.z = 4.0
    camera.lookAt(origin)
    camera.up.set(0, 1, 0)
    */
  }
  updaters.push(cameraUpdate)

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

  function addItem(item) {
    if (item.object) { scene.add(item.object) }
    if (item.update) { updaters.push(item.update) }
  }

  function update(time) {
    updaters.forEach(updater => updater(time))
  }

  function render(time) {
    renderer.render(scene, camera)
  }

  return { window, scene, camera, renderer, attachToElement, addItem, update, render }
}

module.exports = {
  createViewer
}
