/*
 * Shaders for the hero globe. Everything is lit by one uniform, uSun: the
 * real direction of the sun right now, in world space.
 */

export const uvVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const sphereVertex = /* glsl */ `
varying vec3 vNormalWorld;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vObject;
void main() {
  vObject = position;
  vNormalWorld = normalize(mat3(modelMatrix) * normal);
  vNormalView = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`

export const ocean = {
  vertexShader: sphereVertex,
  fragmentShader: /* glsl */ `
uniform vec3 uSun;
varying vec3 vNormalWorld;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vObject;
const float PI = 3.141592653589793;

void main() {
  float sun = dot(normalize(vNormalWorld), uSun);
  float day = smoothstep(-0.25, 0.35, sun);
  vec3 col = mix(vec3(0.014, 0.03, 0.018), vec3(0.04, 0.11, 0.06), day);

  // graticule every 15 degrees
  vec3 n = normalize(vObject);
  vec2 ll = vec2(atan(n.z, n.x), asin(n.y)) / (PI / 12.0);
  vec2 g = abs(fract(ll + 0.5) - 0.5) / fwidth(ll);
  col += vec3(0.3, 0.5, 0.36) * (1.0 - min(min(g.x, g.y), 1.0)) * 0.07;

  // a leaf-green band where day turns to night
  col += vec3(0.62, 0.8, 0.26) * exp(-pow(sun * 5.5, 2.0)) * 0.1;

  float fresnel = pow(1.0 - max(dot(normalize(vNormalView), normalize(vViewDir)), 0.0), 2.5);
  col += vec3(0.3, 0.62, 0.5) * fresnel * (0.25 + 0.5 * day);

  gl_FragColor = vec4(col, 1.0);
}
`,
}

export const land = {
  vertexShader: /* glsl */ `
attribute float aRand;
uniform vec3 uSun;
uniform float uSize;
uniform float uReveal;
varying float vDay;
varying float vFacing;
varying float vRand;
varying float vShow;

void main() {
  vec3 nWorld = normalize(mat3(modelMatrix) * position);
  vDay = smoothstep(-0.18, 0.28, dot(nWorld, uSun));
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vFacing = dot(normalize(normalMatrix * position), normalize(-mv.xyz));
  vRand = aRand;
  // dots switch on in a random scatter as the globe arrives
  vShow = smoothstep(aRand, aRand + 0.12, uReveal * 1.12);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.8 + 0.2 * vDay) / -mv.z;
}
`,
  fragmentShader: /* glsl */ `
uniform float uTime;
varying float vDay;
varying float vFacing;
varying float vRand;
varying float vShow;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.15, d);

  // one dot in seventeen is a town whose lights come on after dark
  float city = step(0.94, vRand) * (1.0 - vDay);
  float twinkle = 0.7 + 0.3 * sin(uTime * 1.7 + vRand * 80.0);

  vec3 col = mix(vec3(0.21, 0.35, 0.25), vec3(0.7, 0.85, 0.72), vDay);
  col = mix(col, vec3(0.66, 0.95, 0.4), city * twinkle);

  float alpha = soft * smoothstep(0.0, 0.35, vFacing) * mix(0.55, 1.0, max(vDay, city)) * vShow;
  gl_FragColor = vec4(col * alpha, alpha);
}
`,
}

export const atmosphere = {
  vertexShader: sphereVertex,
  fragmentShader: /* glsl */ `
uniform vec3 uSun;
varying vec3 vNormalWorld;
varying vec3 vNormalView;
varying vec3 vViewDir;

void main() {
  // drawn on the back faces: brightest at the limb, gone by the outer edge
  float glow = pow(clamp(-dot(normalize(vNormalView), normalize(vViewDir)), 0.0, 1.0), 2.2) * 1.3;
  float sunSide = smoothstep(-0.4, 0.6, dot(normalize(vNormalWorld), uSun));
  vec3 col = mix(vec3(0.14, 0.4, 0.32), vec3(0.45, 0.85, 0.6), sunSide);
  float a = glow * mix(0.45, 1.0, sunSide);
  gl_FragColor = vec4(col * a, a);
}
`,
}

export const arc = {
  vertexShader: uvVertex,
  fragmentShader: /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uBase;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float x = vUv.x;
  // two comets per route, bright head and a long fading tail
  float s = fract(x * 2.0 - uTime * uSpeed);
  float comet = smoothstep(0.55, 0.98, s) * (1.0 - smoothstep(0.98, 1.0, s));
  float ends = smoothstep(0.0, 0.08, x) * smoothstep(1.0, 0.92, x);
  float a = (uBase + comet * 0.95) * ends;
  gl_FragColor = vec4(uColor * a, a);
}
`,
}

export const packets = {
  vertexShader: /* glsl */ `
attribute vec3 aColor;
attribute float aAlpha;
uniform float uSize;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vColor = aColor;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize / -mv.z;
}
`,
  fragmentShader: /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float core = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
  float a = pow(core, 2.5) * vAlpha;
  gl_FragColor = vec4(vColor * a, a);
}
`,
}

export const ring = {
  vertexShader: uvVertex,
  fragmentShader: /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float r = length(vUv - 0.5) * 2.0;
  float a = 0.0;
  for (int i = 0; i < 2; i++) {
    float t = fract(uTime * 0.4 + float(i) * 0.5);
    a += smoothstep(t - 0.12, t, r) * (1.0 - smoothstep(t, t + 0.03, r)) * (1.0 - t) * 0.9;
  }
  a += (1.0 - smoothstep(0.0, 0.16, r)) * 0.55;
  gl_FragColor = vec4(uColor * a, a);
}
`,
}

export const beam = {
  vertexShader: uvVertex,
  fragmentShader: /* glsl */ `
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float a = (1.0 - vUv.y) * 0.75;
  gl_FragColor = vec4(uColor * a, a);
}
`,
}
