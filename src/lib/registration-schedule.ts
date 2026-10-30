export const REGISTRATION_OPENS_AT = "2026-11-01T00:00:00+05:30";

export function getRegistrationCountdown(now = Date.now()) {
  const remaining = Math.max(0, new Date(REGISTRATION_OPENS_AT).getTime() - now);
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor(remaining / 3_600_000) % 24,
    minutes: Math.floor(remaining / 60_000) % 60,
    seconds: Math.floor(remaining / 1_000) % 60,
    isLive: remaining === 0,
  };
}
