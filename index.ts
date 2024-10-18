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
const pluralize = (n: number, unit: Unit) =>
  n === 1 || unit === "ms" ? unit : `${unit}s`;

const SECONDS_MS = 1000;
const MINUTES_MS = 60 * SECONDS_MS;
const HOURS_MS = 60 * MINUTES_MS;
const DAYS_MS = 24 * HOURS_MS;
const MONTHS_MS = DAYS_PER_MONTH * DAYS_MS;
const YEARS_MS = 365 * DAYS_MS;

type Unit = "ms" | "second" | "minute" | "hour" | "day" | "month" | "year";
class Info {
  constructor(
    public count: number,
    public unit: Unit,
    public ago: boolean,
    public ms: number,
  ) {}

  toString() {
    return `${this.count} ${pluralize(this.count, this.unit)}${
      this.ago ? " ago" : ""
    }`;
  }

  static fromMs(durationMs: number) {
    const ago = durationMs < 0;
    const absDurationMs = Math.abs(durationMs);

    let count = thresh(45, absDurationMs / SECONDS_MS);
    if (count !== 0) return new Info(count, "second", ago, absDurationMs);

    count = thresh(45, absDurationMs / MINUTES_MS);
    if (count !== 0) return new Info(count, "minute", ago, absDurationMs);

    count = thresh(22, absDurationMs / HOURS_MS);
    if (count !== 0) return new Info(count, "hour", ago, absDurationMs);

    count = thresh(26, absDurationMs / DAYS_MS);
    if (count !== 0) return new Info(count, "day", ago, absDurationMs);

    count = thresh(11, absDurationMs / MONTHS_MS);
    if (count !== 0) return new Info(count, "month", ago, absDurationMs);

    count = thresh(Number.MAX_VALUE, absDurationMs / YEARS_MS);
    if (count !== 0) return new Info(count, "year", ago, absDurationMs);

    return new Info(absDurationMs, "ms", ago, absDurationMs);
  }
}

function info(durationMs: number) {
  return Info.fromMs(durationMs);
}

function humanize(durationMs: number) {
  const inf = info(durationMs);
  if (inf.unit === "ms") return "now";
  return inf.toString();
}

function fromNow(date: Date | number) {
  const now = new Date().getTime();
  const normalizedDate = date instanceof Date ? date.getTime() : date;
  return humanize(normalizedDate - now);
}

export default Object.assign(fromNow, { humanize, info });
