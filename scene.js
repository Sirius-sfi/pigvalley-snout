import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

function createImage() {
  const imageWidth = 2048;
  const imageHeight = 2048;

  const vert = require('./vert.glsl')
  const frag = require('./frag.glsl')

  const divisor = 16;

  let uniforms = {
    image: { value: new THREE.TextureLoader().load(require('./kamieneColors.png')) },
    segments: { value: new THREE.TextureLoader().load(require('./kamieneSegments.png')) },
    width: { type: 'i', value: imageWidth },
    height: { type: 'i', value: imageHeight },
    time: { type: 'f', value: 0 }
  }

  let material = new THREE.ShaderMaterial({
    uniforms:       uniforms,
    vertexShader:   vert,
    fragmentShader: frag,
    blending:       THREE.NormalBlending,
    depthTest:      true,
    transparent:    true,
    vertexColors:   true
  })

  let geometry = new THREE.BufferGeometry();
  let positions = new Float32Array((imageHeight / divisor) * (imageWidth / divisor) * 3);
  let p = 0;
  for (let j=0; j < imageHeight; j += divisor) {
    for (let i=0; i < imageWidth; i += divisor) {
      p += 3;
      positions[p    ] = (2.0 * i / imageWidth) - 1.0;
      positions[p + 1] = (2.0 * j / imageHeight) - 1.0;
      positions[p + 2] = 0;
    }
  }

  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
  let model = new THREE.Points(geometry, material)

  return { model, uniforms }
}

function createScene() {
  let scene = new THREE.Scene()
  return scene
}
function createCamera() {
  let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10000)

  camera.position.x = 0.0
  camera.position.y = 0.0
  camera.position.z = 3.0
  camera.lookAt(origin)
  camera.up.set(0, 1, 0)

  return camera
}

module.exports = {
  createScene, 
  createCamera,
  createImage
}
