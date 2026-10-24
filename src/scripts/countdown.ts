import { getTimeParts, formatValue } from "../lib/countdown";

const COUNTDOWN_DAYS = 14;

function initCountdown() {
  const targetTime = Date.now() + COUNTDOWN_DAYS * 24 * 60 * 60 * 1000;
  const units = document.querySelectorAll<HTMLElement>("[data-unit]");

  function update() {
    const remaining = targetTime - Date.now();
    const parts = getTimeParts(remaining);

    units.forEach((unitEl) => {
      const unit = unitEl.dataset.unit;
      let value = "00";

      if (unit === "days") value = formatValue(parts.days);
      if (unit === "hours") value = formatValue(parts.hours);
      if (unit === "minutes") value = formatValue(parts.minutes);
      if (unit === "seconds") value = formatValue(parts.seconds);

      const valueEl = unitEl.querySelector<HTMLElement>(".countdown-value");
      const label = unitEl.getAttribute("aria-label")?.split(":")[0]?.trim() || unit;

      if (valueEl && valueEl.textContent !== value) {
        valueEl.textContent = value;
        unitEl.setAttribute("aria-label", `${label}: ${value}`);
      } else if (valueEl && valueEl.textContent === value) {
        unitEl.setAttribute("aria-label", `${label}: ${value}`);
      } else if (valueEl) {
        valueEl.textContent = value;
        unitEl.setAttribute("aria-label", `${label}: ${value}`);
      }
    });

    if (remaining <= 0) {
      clearInterval(intervalId);
    }
  }

  update();
  const intervalId = setInterval(update, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCountdown);
} else {
  initCountdown();
}
