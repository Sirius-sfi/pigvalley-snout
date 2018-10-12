attribute float size;

uniform sampler2D image;
uniform sampler2D segments;

uniform float time;

varying vec3 vColor;

void main() {
  vec2 imageCoord = 0.5 * (position.xy) + 0.5;

  vec4 imageData = texture2D(image, imageCoord);
  vec4 segmentData = texture2D(segments, imageCoord);

  vColor = imageData.rgb;

  vec3 point = position;
  point.z = dot(segmentData.rgb, vec3(0.3, 0.2, 0.1));

  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
}
