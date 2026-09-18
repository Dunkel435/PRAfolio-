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
  private activeSection = -1;
  private totalSections = 8;
  private callbacks: UniverseCallbacks;
  private reducedMotion = false;
  private resizeObserver: ResizeObserver | null = null;

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

    // Full-screen quad
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
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas);

    this.startTime = performance.now();
    this.loop();
  }

  private resize() {
    if (!this.gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.canvas.width = Math.max(1, Math.floor(w * dpr));
    this.canvas.height = Math.max(1, Math.floor(h * dpr));
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private loop = () => {
    this.rafId = requestAnimationFrame(this.loop);
    if (!this.gl || !this.program || !this.uniforms) return;

    const now = performance.now();
    const time = (now - this.startTime) / 1000;

    updateState(this.ctx, now, this.activeSection, this.totalSections);

    if (this.ctx.state !== this.lastState) {
      this.lastState = this.ctx.state;
      this.callbacks.onStateChange?.(this.ctx.state);
    }

    const gl = this.gl;
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    gl.uniform1f(this.uniforms.uTime, this.reducedMotion ? 0 : time);
    gl.uniform2f(this.uniforms.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uniforms.uPointer, this.ctx.pointer.x, 1.0 - this.ctx.pointer.y);
    gl.uniform1f(this.uniforms.uPointerStrength, this.ctx.pointerStrength);
    gl.uniform1f(this.uniforms.uFocus, this.ctx.focus);
    gl.uniform1f(this.uniforms.uFocusStrength, this.ctx.focusStrength);
    gl.uniform2f(this.uniforms.uImpact, this.ctx.impact.x, 1.0 - this.ctx.impact.y);
    gl.uniform1f(this.uniforms.uImpactStrength, this.ctx.impactStrength);
    gl.uniform1f(this.uniforms.uIdle, this.ctx.idle);
    gl.uniform1f(this.uniforms.uScroll, this.ctx.scroll);
    gl.uniform1f(this.uniforms.uReducedMotion, this.reducedMotion ? 1 : 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  private lastState: InteractionState = 'observing';

  // Public API

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
    if (index >= 0) {
      setPointer(this.ctx, this.ctx.pointer.x, this.ctx.pointer.y);
    }
  }

  getState(): InteractionState {
    return this.ctx.state;
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    if (this.gl) {
      if (this.program) this.gl.deleteProgram(this.program);
      if (this.vao) this.gl.deleteVertexArray(this.vao);
    }
  }
}
