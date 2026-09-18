// Minimal WebGL2 helpers — no external dependencies, keeps the bundle light.

export function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export interface UniformLocations {
  uTime: WebGLUniformLocation | null;
  uResolution: WebGLUniformLocation | null;
  uPointer: WebGLUniformLocation | null;
  uPointerStrength: WebGLUniformLocation | null;
  uFocus: WebGLUniformLocation | null;
  uFocusStrength: WebGLUniformLocation | null;
  uImpact: WebGLUniformLocation | null;
  uImpactStrength: WebGLUniformLocation | null;
  uIdle: WebGLUniformLocation | null;
  uScroll: WebGLUniformLocation | null;
  uReducedMotion: WebGLUniformLocation | null;
}
