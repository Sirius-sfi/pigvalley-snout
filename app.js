import * as THREE from 'three';

let vert = require('./vert.glsl')
let frag = require('./frag.glsl')

var renderer, scene, camera;
var model, uniforms, geometry;

var origin = new THREE.Vector3(0, 0, 0);

init();
animate();

function init() {
  let imageWidth = 2048;
  let imageHeight = 2048;

  let divisor = 2;

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10000)

  scene = new THREE.Scene()
  uniforms = {
    image: { value: new THREE.TextureLoader().load(require('./kamieneColors.png')) },
    segments: { value: new THREE.TextureLoader().load(require('./kamieneSegments.png')) },
    time: { type: 'f', value: 0 }
  }

  var material = new THREE.ShaderMaterial({
    uniforms:       uniforms,
    vertexShader:   vert,
    fragmentShader: frag,
    blending:       THREE.NormalBlending,
    depthTest:      true,
    transparent:    true,
    vertexColors:   true
  })

  geometry = new THREE.BufferGeometry();
  var positions = new Float32Array((imageHeight / divisor) * (imageWidth / divisor) * 3);
  var p = 0;
  for (var j=0; j < imageHeight; j += divisor) {
    for (var i=0; i < imageWidth; i += divisor) {
      p += 3;
      positions[p    ] = (2.0 * i / imageWidth) - 1.0;
      positions[p + 1] = (2.0 * j / imageHeight) - 1.0;
      positions[p + 2] = 0;
    }
  }

  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
  model = new THREE.Points(geometry, material)
  scene.add(model)

  var grid = new THREE.GridHelper(2.0, 20)
  scene.add(grid)

  var directionX = new THREE.Vector3(1, 0, 0)
  var directionY = new THREE.Vector3(0, 1, 0)
  var directionZ = new THREE.Vector3(0, 0, 1)

  scene.add(new THREE.ArrowHelper(directionX, origin, 1.0, 0xff0000))
  scene.add(new THREE.ArrowHelper(directionY, origin, 1.0, 0x00ff00))
  scene.add(new THREE.ArrowHelper(directionZ, origin, 1.0, 0x0000ff))

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  var container = document.getElementById('container')
  container.appendChild(renderer.domElement)

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

  camera.position.x = cameraRadius * Math.cos(time)
  camera.position.y = cameraRadius * Math.sin(time)
  camera.position.z = 4.0
  camera.lookAt(origin)
  camera.up.set(0, 1, 0)

  renderer.render(scene, camera)
}
