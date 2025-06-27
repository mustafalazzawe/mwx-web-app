uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  float dist = distance(vUv, vec2(0.5));
  
  // Soft edge
  float circle = smoothstep(0.5, 0.3, dist);
  
  // Pulsing edge
  float pulse = 0.25 + 0.75 * abs(sin(uTime * 3.0));
  float glow = smoothstep(0.5, 0.3 - pulse * 0.05, dist);

  vec3 finalColor = mix(vec3(0.0), uColor, glow);
  
  gl_FragColor = vec4(finalColor, circle * uOpacity);
}