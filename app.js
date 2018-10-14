import Vue from 'vue/dist/vue.js' //PROD: import Vue from 'vue'

import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

import { createViewer } from './viewer'
import { createGrid, createImage } from './scene'


var viewer
var updaters = []

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
  viewer = createViewer(window)

  let image = createImage()
  viewer.scene.add(image.object)
  updaters.push(image.update)

  let grid = createGrid();
  viewer.scene.add(grid.object)

  viewer.attachToElement('container')
}

function animate(time) {
  requestAnimationFrame(animate)
  render(time / 1000.0)
}

var cameraRadius = 1.0;

function render(time) {
  updaters.forEach(updater => updater(time))
  viewer.render(time)

/*
  camera.position.x = cameraRadius * Math.cos(time)
  camera.position.y = cameraRadius * Math.sin(time)
  camera.position.z = 4.0
  camera.lookAt(origin)
  camera.up.set(0, 1, 0)
*/
}
