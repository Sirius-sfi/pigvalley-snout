import Vue from 'vue/dist/vue.js' //PROD: import Vue from 'vue'

import { createViewer } from './viewer'
import factory from './scene'

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
      let action = this.$data.actions[tool] || defaultAction
      action(tool)
    }
  }
})

function setupViewer() {
  let viewer = createViewer(window)

  viewer.addItem(factory.cloud())
  viewer.addItem(factory.grid())

  viewer.attachToElement('container')

  return viewer
}

function animate(animationTime) {
  requestAnimationFrame(animate)
  const modelTime = animationTime / 1000.0
  viewer.update(modelTime)
  viewer.render(modelTime)
}

const viewer = setupViewer()
animate();
