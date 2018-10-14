import * as THREE from 'three'

function image() {
  const imageWidth = 2048;
  const imageHeight = 2048;

  const vert = require('./imagevert.glsl')
  const frag = require('./imagefrag.glsl')

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
  }

  return { object, update }
}

function cloud() {
  const vert = require('./cloudvert.glsl')
  const frag = require('./cloudfrag.glsl')

  let uniforms = {
    image: { value: new THREE.TextureLoader().load(require('./kamieneColors.png')) },
    segments: { value: new THREE.TextureLoader().load(require('./kamieneSegments.png')) },
    time: { type: 'f', value: 0 }
  }

  let material = new THREE.ShaderMaterial({
    uniforms:       uniforms,
    vertexShader:   vert,
    fragmentShader: frag,
    blending:       THREE.NormalBlending,
    side:           THREE.DoubleSide,
    depthTest:      true,
    transparent:    true,
    vertexColors:   true
  })

  let positions = new Float32Array([
    0.025, -0.025, 0,
    -0.025, 0.025, 0,
    0, 0, 0.025
  ])

  let instances = 100*100
  let index = new Float32Array(instances)
  for (let i=0; i < instances; i++) {
    index[i] = i
  }

  var geometry = new THREE.InstancedBufferGeometry()
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.addAttribute('pindex', new THREE.InstancedBufferAttribute(index, 1))

  let object = new THREE.Mesh(geometry, material)
  return { object }
}

var origin = new THREE.Vector3(0, 0, 0);
function grid() {
  let object = new THREE.Group()

  let grid = new THREE.GridHelper(2.0, 20)
  object.add(grid)

  let directionX = new THREE.Vector3(1, 0, 0)
  let directionY = new THREE.Vector3(0, 1, 0)
  let directionZ = new THREE.Vector3(0, 0, 1)

  object.add(new THREE.ArrowHelper(directionX, origin, 1.0, 0xff0000))
  object.add(new THREE.ArrowHelper(directionY, origin, 1.0, 0x00ff00))
  object.add(new THREE.ArrowHelper(directionZ, origin, 1.0, 0x0000ff))

  return { object }
}

module.exports = {
  cloud,
  image,
  grid
}
