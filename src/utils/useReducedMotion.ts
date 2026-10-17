/**
 * Overridden motion hook.
 *
 * Framer Motion's `useReducedMotion()` reads the OS `prefers-reduced-motion`
 * setting. On machines with Windows animation effects disabled, Chrome reports
 * "reduce" and the entire site turns its animations off. This project is meant
 * to always play its motion effects, so we expose a hook that unconditionally
 * reports `false` (animations enabled) no matter what the OS setting is.
 */
export function useReducedMotion() {
  return false;
}
