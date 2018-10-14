uniform sampler2D image;
uniform sampler2D segments;
uniform float time;

attribute float pindex;

varying vec3 vColor;

void main() {
  float x = mod(pindex, 100.0);
  float y = (pindex - x) / 100.0;

  vec2 imageCoord = vec2(x / 100.0, y / 100.0);

  vec4 imageData = texture2D(image, imageCoord);
  vec4 segmentData = texture2D(segments, imageCoord);

  vColor = imageData.rgb;

  vec3 offset = vec3(2.0 * x / 100.0, 2.0 * y / 100.0, 0.8) - vec3(1.0, 1.0, 0.0);
  vec3 point = position + offset;

  gl_PointSize = 8.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
}
