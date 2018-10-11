import * as THREE from 'three';

let vert = require('./vert.glsl')
let frag = require('./frag.glsl')

var renderer, scene, camera, stats;
var particleSystem, uniforms, geometry;
var particles = 2048*2048 / 16;

init();
animate();

function init() {
  let imageWidth = 2048;
  let imageHeight = 2048;

  let divisor = 4;

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 2.0;

  scene = new THREE.Scene();
  uniforms = {
    spark: { value: new THREE.TextureLoader().load(require('./spark1.png')) },
    image: { value: new THREE.TextureLoader().load(require('./kamieneColors.png')) },
    segments: { value: new THREE.TextureLoader().load(require('./kamieneSegments.png')) },
    time: { type: 'f', value: 0 }
  };

  var shaderMaterial = new THREE.ShaderMaterial({
    uniforms:       uniforms,
    vertexShader:   vert,
    fragmentShader: frag,
    blending:       THREE.Normal,
    depthTest:      false,
    transparent:    true,
    vertexColors:   true
  });

  geometry = new THREE.BufferGeometry();
  var positions = new Float32Array((imageHeight / divisor) * (imageWidth / divisor) * 3);
  var p = 0;
  for (var j=0; j < imageHeight; j += divisor) {
    for (var i=0; i < imageWidth; i += divisor) {
      p += 3;
      positions[p    ] = (1.0 * i / imageWidth) - 0.5;
      positions[p + 1] = (1.0 * j / imageHeight) - 0.5;
      positions[p + 2] = 0;
    }
  }

  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleSystem = new THREE.Points(geometry, shaderMaterial);

  scene.add(particleSystem);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

//  stats = new Stats();
//  container.appendChild(stats.dom);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  requestAnimationFrame(animate);

  render(time / 1000.0);
}

function render(time) {
  uniforms.time.value = time

  //particleSystem.rotation.z = 0.1 * time;
  renderer.render(scene, camera);
}
