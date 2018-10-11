attribute float size;

uniform sampler2D image;
uniform sampler2D segments;

uniform float time;

varying vec3 vColor;

void main() {
  vec2 imageCoord = (position.xy) + 0.5;
  vec4 imageData = texture2D(image, imageCoord);
  vec4 segmentData = texture2D(segments, imageCoord);

  vColor = imageData.xyz;
  //vColor.r = 1.0;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  mvPosition.x = mvPosition.x + sin(time + segmentData.b) * 0.05 * segmentData.r + sin(time + segmentData.b) * 0.5 * segmentData.b;
  mvPosition.y = mvPosition.y + cos(time + segmentData.b) * 0.8 * segmentData.g + sin(time + segmentData.r) * 0.08 * segmentData.b;
  mvPosition.z = -2.0 - 1.0 * sin(time) + (segmentData.r + segmentData.g + segmentData.b) * 0.002;
  gl_PointSize = 20.0; //size * (3.0 * 1024.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
