// 146097 days in 400 years (moment.js:daysToMonths()):
const DAYS_PER_MONTH = 146097 / 400 / 12;

/**
 * Returns val, rounded if it is less than the threshold, otherwise
 * it returns a tombstone value (0).
 */
const thresh = (threshold: number, val: number) => {
  const valRounded = Math.round(val);
  return valRounded < threshold ? valRounded : 0;
};
const pluralize = (n: number, word: string) => (n === 1 ? word : `${word}s`);
const makeHumanizedString = (n: number, singularUnit: string, ago: boolean) =>
  `${n} ${pluralize(n, singularUnit)}${ago ? " ago" : ""}`;

const SECONDS_MS = 1000;
const MINUTES_MS = 60 * SECONDS_MS;
const HOURS_MS = 60 * MINUTES_MS;
const DAYS_MS = 24 * HOURS_MS;
const MONTHS_MS = DAYS_PER_MONTH * DAYS_MS;
const YEARS_MS = 365 * DAYS_MS;

function humanize(durationMs: number) {
  const ago = durationMs < 0;
  const absDurationMs = Math.abs(durationMs);

  let n = thresh(45, absDurationMs / SECONDS_MS);
  if (n !== 0) return makeHumanizedString(n, "second", ago);

  n = thresh(45, absDurationMs / MINUTES_MS);
  if (n !== 0) return makeHumanizedString(n, "minute", ago);

  n = thresh(22, absDurationMs / HOURS_MS);
  if (n !== 0) return makeHumanizedString(n, "hour", ago);

  n = thresh(26, absDurationMs / DAYS_MS);
  if (n !== 0) return makeHumanizedString(n, "day", ago);

  n = thresh(11, absDurationMs / MONTHS_MS);
  if (n !== 0) return makeHumanizedString(n, "month", ago);

  n = thresh(Number.MAX_VALUE, absDurationMs / YEARS_MS);
  if (n !== 0) return makeHumanizedString(n, "year", ago);

  return "now";
}

function fromNow(date: Date | number) {
  const now = new Date().getTime();
  const normalizedDate = date instanceof Date ? date.getTime() : date;
  return humanize(normalizedDate - now);
}

export default Object.assign(fromNow, { humanize });
