// Interaction state machine for the Living Creative Universe.
// Five states: OBSERVING, EXPLORING, FOCUS, IMPACT, IDLE.

export type InteractionState = 'observing' | 'exploring' | 'focus' | 'impact' | 'idle';

export interface InteractionContext {
  state: InteractionState;
  pointer: { x: number; y: number };
  pointerStrength: number; // 0..1 how much pointer affects the scene
  focus: number; // 0..1 which area is focused (section index normalized)
  focusStrength: number; // 0..1 intensity of focus
  impact: { x: number; y: number; time: number }; // last click/tap position + time
  impactStrength: number; // 0..1 decaying ripple
  idle: number; // 0..1 how idle the user is
  scroll: number; // accumulated scroll for parallax
}

export function createContext(): InteractionContext {
  return {
    state: 'observing',
    pointer: { x: 0.5, y: 0.5 },
    pointerStrength: 0,
    focus: 0,
    focusStrength: 0,
    impact: { x: 0.5, y: 0.5, time: 0 },
    impactStrength: 0,
    idle: 0,
    scroll: 0,
  };
}

let lastActivity = performance.now();
const IDLE_THRESHOLD = 4000; // ms before idle state begins

export function registerActivity(ctx: InteractionContext) {
  lastActivity = performance.now();
  if (ctx.state === 'idle') {
    ctx.state = 'observing';
  }
}

export function updateState(
  ctx: InteractionContext,
  now: number,
  activeSection: number,
  totalSections: number
): boolean {
  let changed = false;
  const elapsed = now - lastActivity;

  // Determine state
  const prevState = ctx.state;

  if (ctx.impactStrength > 0.05) {
    if (ctx.state !== 'impact') {
      ctx.state = 'impact';
      changed = true;
    }
  } else if (elapsed > IDLE_THRESHOLD) {
    if (ctx.state !== 'idle') {
      ctx.state = 'idle';
      changed = true;
    }
  } else if (ctx.focusStrength > 0.3) {
    if (ctx.state !== 'focus') {
      ctx.state = 'focus';
      changed = true;
    }
  } else if (ctx.pointerStrength > 0.05) {
    if (ctx.state !== 'exploring') {
      ctx.state = 'exploring';
      changed = true;
    }
  } else {
    if (ctx.state !== 'observing') {
      ctx.state = 'observing';
      changed = true;
    }
  }

  // Decay impact
  if (ctx.impactStrength > 0) {
    ctx.impactStrength *= 0.94;
    if (ctx.impactStrength < 0.01) ctx.impactStrength = 0;
  }

  // Idle ramps up slowly
  if (ctx.state === 'idle') {
    ctx.idle = Math.min(1, ctx.idle + 0.005);
  } else {
    ctx.idle = Math.max(0, ctx.idle - 0.02);
  }

  // Pointer strength eases toward target
  const pointerTarget = ctx.state === 'exploring' ? 1 : ctx.state === 'focus' ? 0.3 : 0;
  ctx.pointerStrength += (pointerTarget - ctx.pointerStrength) * 0.05;

  // Focus strength eases toward target based on active section
  const focusTarget = activeSection >= 0 ? 1 : 0;
  ctx.focusStrength += (focusTarget - ctx.focusStrength) * 0.03;
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
  ctx.scroll = scrollY;
  registerActivity(ctx);
}
