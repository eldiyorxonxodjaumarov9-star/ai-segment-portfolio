/** Suppresses realtime snapshot echoes right after a local Firestore write */
let guardedUntil = 0;

export function beginWriteGuard(durationMs = 1200): void {
  guardedUntil = Date.now() + durationMs;
}

export function isWriteGuardActive(): boolean {
  return Date.now() < guardedUntil;
}

export function endWriteGuard(): void {
  guardedUntil = 0;
}
