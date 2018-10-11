uniform sampler2D spark;
uniform float time;

varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
  gl_FragColor = gl_FragColor * texture2D(spark, gl_PointCoord);
}
