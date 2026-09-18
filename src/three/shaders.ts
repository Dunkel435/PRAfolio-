// Fragment shader for the Living Creative Universe.
// A cinematic layered noise field with flowing energy ribbons,
// depth-based lighting, and interaction-responsive distortion.
// Deliberately avoids galaxy/sphere/particle clichés.

export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uFocus;
uniform float uFocusStrength;
uniform vec2 uImpact;
uniform float uImpactStrength;
uniform float uIdle;
uniform float uScroll;
uniform float uReducedMotion;

out vec4 fragColor;

// --- Hash / noise ---

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

// --- Flow field ---

float flowField(vec2 uv, float t) {
  vec2 q = uv * 2.5;
  q.x += t * 0.04;
  q.y += t * 0.02;
  float n1 = fbm(q);
  vec2 r = vec2(fbm(q + vec2(1.7, 9.2) + 0.15 * t), fbm(q + vec2(8.3, 2.8) + 0.126 * t));
  float n2 = fbm(q + r);
  return n2;
}

// --- Energy ribbons ---

float ribbons(vec2 uv, float t, float intensity) {
  float accum = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float phase = t * (0.3 + fi * 0.08) + fi * 1.7;
    vec2 dir = vec2(cos(phase * 0.7), sin(phase * 0.5));
    float d = abs(dot(uv - vec2(0.0), dir) - sin(uv.y * 3.0 + phase) * 0.15);
    float ribbon = smoothstep(0.02, 0.0, d) * (0.4 + 0.3 * sin(t + fi));
    accum += ribbon * (1.0 - fi * 0.2);
  }
  return accum * intensity;
}

// --- Palette: warm amber + teal + cream on deep ink ---

vec3 palette(float t) {
  vec3 ink = vec3(0.031, 0.031, 0.047);
  vec3 deep = vec3(0.05, 0.04, 0.07);
  vec3 amber = vec3(0.91, 0.66, 0.22);
  vec3 teal = vec3(0.18, 0.62, 0.50);
  vec3 cream = vec3(0.96, 0.94, 0.91);
  vec3 rust = vec3(0.79, 0.40, 0.28);

  vec3 c1 = mix(ink, deep, smoothstep(0.0, 0.3, t));
  vec3 c2 = mix(c1, teal * 0.4, smoothstep(0.2, 0.5, t));
  vec3 c3 = mix(c2, amber * 0.5, smoothstep(0.4, 0.7, t));
  vec3 c4 = mix(c3, cream * 0.6, smoothstep(0.65, 0.9, t));
  return c4;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  vec2 st = gl_FragCoord.xy / uResolution;

  float t = uTime;

  // Pointer parallax — shifts the field center
  vec2 pointerOffset = (uPointer - 0.5) * uPointerStrength * 0.6;
  vec2 puv = uv + pointerOffset;

  // Scroll adds vertical drift
  puv.y += uScroll * 0.3;

  // Focus pulls energy inward
  float focusPull = uFocusStrength * 0.3;
  puv *= 1.0 - focusPull * 0.1;

  // Base flow
  float flow = flowField(puv, t);
  float flow2 = flowField(puv * 1.5 + 5.0, t * 0.7);

  // Ribbons
  float rib = ribbons(puv, t, 0.5 + uFocusStrength * 0.5);

  // Impact ripple
  vec2 impactUv = uv - (uImpact - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) * 2.0;
  float distImpact = length(impactUv);
  float ripple = sin(distImpact * 30.0 - uTime * 8.0) * 0.5 + 0.5;
  ripple *= smoothstep(0.5, 0.0, distImpact) * uImpactStrength;

  // Combine
  float field = flow * 0.5 + 0.5;
  field += flow2 * 0.15;
  field += rib * 0.3;
  field += ripple * 0.4;

  // Idle breathing
  float breathe = sin(t * 0.3) * 0.5 + 0.5;
  field += uIdle * breathe * 0.05;

  // Vignette
  float vig = 1.0 - smoothstep(0.4, 1.2, length(uv));

  // Color
  vec3 col = palette(field);
  col *= vig;

  // Edge glow from focus
  col += vec3(0.91, 0.66, 0.22) * uFocusStrength * 0.08 * smoothstep(0.3, 1.0, 1.0 - length(uv));

  // Impact flash
  col += vec3(0.96, 0.88, 0.72) * ripple * 0.3;

  // Grain
  float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
  col += grain;

  // Subtle scanline depth
  col *= 0.97 + 0.03 * sin(gl_FragCoord.y * 1.5);

  fragColor = vec4(col, 1.0);
}`;

export const vertexShaderSource = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;
