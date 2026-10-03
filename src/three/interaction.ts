// Interaction state machine for the Living Creative Universe.
// Five states: OBSERVING, EXPLORING, FOCUS, IMPACT, IDLE.
// Tracks pointer and scroll with smoothed, frame-rate-independent interpolation.

export type InteractionState = 'observing' | 'exploring' | 'focus' | 'impact' | 'idle';

export interface InteractionContext {
  state: InteractionState;
  pointer: { x: number; y: number };
  pointerSmooth: { x: number; y: number };
  pointerStrength: number;
  focus: number;
  focusStrength: number;
  impact: { x: number; y: number; time: number };
  impactStrength: number;
  idle: number;
  scroll: number;
  scrollTarget: number;
  lastActivity: number;
}

export function createContext(): InteractionContext {
  const now = performance.now();
  return {
    state: 'observing',
    pointer: { x: 0.5, y: 0.5 },
    pointerSmooth: { x: 0.5, y: 0.5 },
    pointerStrength: 0,
    focus: 0,
    focusStrength: 0,
    impact: { x: 0.5, y: 0.5, time: 0 },
    impactStrength: 0,
    idle: 0,
    scroll: 0,
    scrollTarget: 0,
    lastActivity: now,
  };
}

const IDLE_THRESHOLD = 4000;

export function registerActivity(ctx: InteractionContext) {
  ctx.lastActivity = performance.now();
  if (ctx.state === 'idle') {
    ctx.state = 'observing';
  }
}

// Frame-rate-independent damping: converges at `rate` per second
function damp(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * dt);
}

export function updateState(
  ctx: InteractionContext,
  now: number,
  dt: number,
  activeSection: number,
  totalSections: number
): boolean {
  const elapsed = now - ctx.lastActivity;
  const prevState = ctx.state;
  let changed = false;

  if (ctx.impactStrength > 0.05) {
    if (ctx.state !== 'impact') { ctx.state = 'impact'; changed = true; }
  } else if (elapsed > IDLE_THRESHOLD) {
    if (ctx.state !== 'idle') { ctx.state = 'idle'; changed = true; }
  } else if (ctx.focusStrength > 0.3) {
    if (ctx.state !== 'focus') { ctx.state = 'focus'; changed = true; }
  } else if (ctx.pointerStrength > 0.05) {
    if (ctx.state !== 'exploring') { ctx.state = 'exploring'; changed = true; }
  } else {
    if (ctx.state !== 'observing') { ctx.state = 'observing'; changed = true; }
  }

  // Impact decay — frame-rate independent
  if (ctx.impactStrength > 0) {
    ctx.impactStrength *= Math.exp(-3.7 * dt);
    if (ctx.impactStrength < 0.01) ctx.impactStrength = 0;
  }

  if (ctx.state === 'idle') {
    ctx.idle = Math.min(1, ctx.idle + 0.3 * dt);
  } else {
    ctx.idle = Math.max(0, ctx.idle - 1.2 * dt);
  }

  // Pointer strength easing
  const pointerTarget = ctx.state === 'exploring' ? 1 : ctx.state === 'focus' ? 0.3 : 0;
  ctx.pointerStrength += (pointerTarget - ctx.pointerStrength) * damp(3.0, dt);

  // Smoothed pointer with inertia — eases toward actual pointer position
  const pointerEase = damp(2.4, dt);
  ctx.pointerSmooth.x += (ctx.pointer.x - ctx.pointerSmooth.x) * pointerEase;
  ctx.pointerSmooth.y += (ctx.pointer.y - ctx.pointerSmooth.y) * pointerEase;

  // Scroll smoothing — interpolate toward target, never jump
  const scrollEase = damp(5.0, dt);
  ctx.scroll += (ctx.scrollTarget - ctx.scroll) * scrollEase;

  // Focus strength easing
  const focusTarget = activeSection >= 0 ? 1 : 0;
  ctx.focusStrength += (focusTarget - ctx.focusStrength) * damp(1.8, dt);
  ctx.focus = activeSection >= 0 ? activeSection / Math.max(1, totalSections - 1) : 0;

  return changed || prevState !== ctx.state;
}

export function triggerImpact(ctx: InteractionContext, x: number, y: number) {
  ctx.impact = { x, y, time: performance.now() };
  ctx.impactStrength = 1;
  registerActivity(ctx);
}

export function setPointer(ctx: InteractionContext, x: number, y: number) {
  ctx.pointer.x = x;
  ctx.pointer.y = y;
  registerActivity(ctx);
}

export function setScroll(ctx: InteractionContext, scrollY: number) {
  ctx.scrollTarget = scrollY;
  // Intentionally do NOT call registerActivity —
  // scrolling should not prevent the idle state from triggering
}
