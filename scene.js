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
  let object = new THREE.Points(geometry, material)

  function update(time) {
    uniforms.time.value = time
    console.log('update', time)
  }

  return { object, update }
}

function createGrid() {
  var origin = new THREE.Vector3(0, 0, 0);

  let object = new THREE.Group()

  var grid = new THREE.GridHelper(2.0, 20)
  object.add(grid)

  var directionX = new THREE.Vector3(1, 0, 0)
  var directionY = new THREE.Vector3(0, 1, 0)
  var directionZ = new THREE.Vector3(0, 0, 1)

  object.add(new THREE.ArrowHelper(directionX, origin, 1.0, 0xff0000))
  object.add(new THREE.ArrowHelper(directionY, origin, 1.0, 0x00ff00))
  object.add(new THREE.ArrowHelper(directionZ, origin, 1.0, 0x0000ff))

  return { object }
}

module.exports = {
  createGrid,
  createImage
}
