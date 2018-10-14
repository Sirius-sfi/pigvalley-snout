import Vue from 'vue/dist/vue.js' //PROD: import Vue from 'vue'

import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

import { createGrid, createScene, createCamera, createImage } from './scene'

var renderer, scene, camera;
var model, uniforms;

var origin = new THREE.Vector3(0, 0, 0);

init();
animate();

const tools = [
  { key: 'brain', text: 'Hello', image: require('./images/brain.png') },
  { key: 'network', text: 'World', image: require('./images/network.png') }
]

const actions = {
  brain() { console.log('BRAAAAAAINs...') },
  network() { console.log('ping, pong, ping pong') }
}

const defaultAction = action => console.error(`No target for action '{$action}.'`)

var app = new Vue({
  el: '#app',
  data: {
    tools,
    actions
  },
  methods: {
    toolClick(tool) {
      let action = actions[tool] || defaultAction
      action(tool)
    }
  }
})

function init() {
  camera = createCamera()
  scene = createScene()

  let theIt = createImage()
  model = theIt.model
  uniforms = theIt.uniforms

  scene.add(model)
  scene.add(createGrid())

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  var container = document.getElementById('container')
  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = false

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)
}

function animate(time) {
  requestAnimationFrame(animate)
  render(time / 1000.0)
}

var cameraRadius = 1.0;

function render(time) {
  uniforms.time.value = time

/*
  camera.position.x = cameraRadius * Math.cos(time)
  camera.position.y = cameraRadius * Math.sin(time)
  camera.position.z = 4.0
  camera.lookAt(origin)
  camera.up.set(0, 1, 0)
*/

  renderer.render(scene, camera)
}
