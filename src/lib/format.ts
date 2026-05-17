/**
 * Locale-independent number formatting — identical output on Node SSR and browser.
 * Avoids toLocaleString() hydration mismatches (e.g. commas vs narrow spaces).
 */

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "0";
  const neg = n < 0;
  const abs = Math.abs(Math.trunc(n));
  const digits = abs.toString();
  const withCommas = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return neg ? `-${withCommas}` : withCommas;
}

export function formatCompact(n: number): string {
  if (!Number.isFinite(n)) return "0";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    return `${sign}${trimTrailingZero(abs / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${trimTrailingZero(abs / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}${trimTrailingZero(abs / 1_000)}K`;
  }
  return formatNumber(n);
}

function trimTrailingZero(value: number): string {
  return value.toFixed(1).replace(/\.0$/, "");
}

/** Full integer with comma thousands separators */
export function formatFull(n: number): string {
  return formatNumber(n);
}
