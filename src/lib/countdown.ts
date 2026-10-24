export interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeParts(remainingMs: number): TimeParts {
  if (remainingMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export function formatValue(value: number, minDigits = 2): string {
  const normalized = Math.max(0, Math.trunc(value));
  return String(normalized).padStart(minDigits, "0");
}
