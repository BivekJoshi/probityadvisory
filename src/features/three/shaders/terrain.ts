import { noiseGlsl } from './noise'

export const terrain = {
  vertexShader: /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying float vHeight;
varying vec3 vWorld;
varying float vDepth;

${noiseGlsl}

float relief(vec2 xz) {
  // sampling further back in noise space over time carries the ridges toward the camera
  vec3 q = vec3(xz.x * 0.28, (xz.y - uTime * 0.18) * 0.28, 0.0);
  float envelope = smoothstep(-7.0, 7.0, xz.x) * 0.65 + smoothstep(3.0, -6.0, xz.y) * 0.55;
  return ridged(q) * uAmp * (0.3 + envelope);
}

void main() {
  vec3 pos = position;
  float h = relief(pos.xz);
  pos.y += h;
  vHeight = h;

  vec4 world = modelMatrix * vec4(pos, 1.0);
  vWorld = world.xyz;
  vec4 mv = viewMatrix * world;
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,
  fragmentShader: /* glsl */ `
uniform vec2 uBuffer;
uniform float uLeftFade;
varying float vHeight;
varying vec3 vWorld;
varying float vDepth;

void main() {
  float bands = vHeight * 9.0;
  float dist = abs(fract(bands + 0.5) - 0.5);
  float line = 1.0 - smoothstep(0.0, fwidth(bands) * 1.5, dist);
  float major = 1.0 - step(0.5, mod(floor(bands + 0.5), 5.0));

  // a faint survey grid laid over the ground
  vec2 g = abs(fract(vWorld.xz + 0.5) - 0.5) / fwidth(vWorld.xz);
  float grid = 1.0 - min(min(g.x, g.y), 1.0);

  float fog = 1.0 - smoothstep(4.0, 13.0, vDepth);
  float near = smoothstep(0.8, 2.6, vDepth);
  float mask = mix(1.0, smoothstep(0.22, 0.78, gl_FragCoord.x / uBuffer.x), uLeftFade);

  vec3 minor = vec3(0.33, 0.5, 0.68);
  vec3 gold = vec3(0.86, 0.7, 0.28);
  vec3 col = mix(minor, gold, major);

  float alpha = line * mix(0.2, 0.62, major) + grid * 0.045;
  alpha += smoothstep(0.95, 1.7, vHeight) * 0.05;
  alpha *= fog * near * mask;

  gl_FragColor = vec4(col * alpha, alpha);
}
`,
}
