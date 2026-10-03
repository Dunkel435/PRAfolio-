import { createShader, createProgram, type UniformLocations } from './glHelpers';
import { fragmentShaderSource, vertexShaderSource } from './shaders';
import {
  createContext,
  updateState,
  triggerImpact,
  setPointer,
  setScroll,
  type InteractionContext,
  type InteractionState,
} from './interaction';

export interface UniverseCallbacks {
  onStateChange?: (state: InteractionState) => void;
}

export class LivingCreativeUniverse {
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private uniforms: UniformLocations | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: InteractionContext;
  private rafId = 0;
  private startTime = 0;
  private lastFrameTime = 0;
  private activeSection = -1;
  private totalSections = 5;
  private callbacks: UniverseCallbacks;
  private reducedMotion = false;
  private resizeObserver: ResizeObserver | null = null;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;
  private lastState: InteractionState = 'observing';

  constructor(canvas: HTMLCanvasElement, callbacks: UniverseCallbacks = {}) {
    this.canvas = canvas;
    this.ctx = createContext();
    this.callbacks = callbacks;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  private init() {
    const gl = this.canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      console.warn('WebGL2 not supported — falling back to static background');
      this.canvas.style.background = 'radial-gradient(ellipse at center, #13131c 0%, #08080c 70%)';
      return;
    }
    this.gl = gl;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;
    this.program = program;

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    this.uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uPointer: gl.getUniformLocation(program, 'uPointer'),
      uPointerSmooth: gl.getUniformLocation(program, 'uPointerSmooth'),
      uPointerStrength: gl.getUniformLocation(program, 'uPointerStrength'),
      uFocus: gl.getUniformLocation(program, 'uFocus'),
      uFocusStrength: gl.getUniformLocation(program, 'uFocusStrength'),
      uImpact: gl.getUniformLocation(program, 'uImpact'),
      uImpactStrength: gl.getUniformLocation(program, 'uImpactStrength'),
      uIdle: gl.getUniformLocation(program, 'uIdle'),
      uScroll: gl.getUniformLocation(program, 'uScroll'),
      uReducedMotion: gl.getUniformLocation(program, 'uReducedMotion'),
    };

    this.resize();
    // Debounced resize — avoids mid-scroll canvas rebuilds on mobile
    this.resizeObserver = new ResizeObserver(() => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.resize(), 150);
    });
    this.resizeObserver.observe(this.canvas);

    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.loop();
  }

  private resize() {
    if (!this.gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const newW = Math.max(1, Math.floor(w * dpr));
    const newH = Math.max(1, Math.floor(h * dpr));
    // Skip if size hasn't actually changed — avoids unnecessary viewport updates
    if (this.canvas.width === newW && this.canvas.height === newH) return;
    this.canvas.width = newW;
    this.canvas.height = newH;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private loop = () => {
    this.rafId = requestAnimationFrame(this.loop);
    if (!this.gl || !this.program || !this.uniforms) return;

    const now = performance.now();
    const time = (now - this.startTime) / 1000;
    // Clamp dt to avoid huge jumps after tab switch / frame drops
    const dt = Math.min(0.05, (now - this.lastFrameTime) / 1000);
    this.lastFrameTime = now;

    updateState(this.ctx, now, dt, this.activeSection, this.totalSections);

    if (this.ctx.state !== this.lastState) {
      this.lastState = this.ctx.state;
      this.callbacks.onStateChange?.(this.ctx.state);
    }

    const gl = this.gl;
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    // Normalize scroll to a small range for the shader — raw pixels cause noise jumps
    const scrollNormalized = this.ctx.scroll / Math.max(1, window.innerHeight);

    gl.uniform1f(this.uniforms.uTime, this.reducedMotion ? 0 : time);
    gl.uniform2f(this.uniforms.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uniforms.uPointer, this.ctx.pointer.x, 1.0 - this.ctx.pointer.y);
    gl.uniform2f(this.uniforms.uPointerSmooth, this.ctx.pointerSmooth.x, 1.0 - this.ctx.pointerSmooth.y);
    gl.uniform1f(this.uniforms.uPointerStrength, this.ctx.pointerStrength);
    gl.uniform1f(this.uniforms.uFocus, this.ctx.focus);
    gl.uniform1f(this.uniforms.uFocusStrength, this.ctx.focusStrength);
    gl.uniform2f(this.uniforms.uImpact, this.ctx.impact.x, 1.0 - this.ctx.impact.y);
    gl.uniform1f(this.uniforms.uImpactStrength, this.ctx.impactStrength);
    gl.uniform1f(this.uniforms.uIdle, this.ctx.idle);
    gl.uniform1f(this.uniforms.uScroll, scrollNormalized);
    gl.uniform1f(this.uniforms.uReducedMotion, this.reducedMotion ? 1 : 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  pointerMove(x: number, y: number) {
    setPointer(this.ctx, x, y);
  }

  pointerLeave() {
    this.ctx.pointerStrength = 0;
  }

  click(x: number, y: number) {
    triggerImpact(this.ctx, x, y);
  }

  scroll(scrollY: number) {
    setScroll(this.ctx, scrollY);
  }

  setActiveSection(index: number) {
    this.activeSection = index;
  }

  getState(): InteractionState {
    return this.ctx.state;
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeObserver?.disconnect();
    if (this.gl) {
      if (this.program) this.gl.deleteProgram(this.program);
      if (this.vao) this.gl.deleteVertexArray(this.vao);
    }
  }
}
