// 146097 days in 400 years (moment.js:daysToMonths()):
const DAYS_PER_MONTH = 146097 / 400 / 12

function first(arr, func) {
	for (let i = 0; i < arr.length; ++i)
		if (func(arr[i])) return arr[i]
}

function thresh(t, val) {
	val = Math.round(val)
	return val < t ? val : 0
}

function humanize(duration) {
	let ago = duration < 0
	duration = Math.abs(duration)
	duration = [
		{ n: thresh(45, duration / 1000), units: 'seconds' },
		{ n: thresh(45, duration / (60 * 1000)), units: 'minutes' },
		{ n: thresh(22, duration / (60 * 60 * 1000)), units: 'hours' },
		{ n: thresh(26, duration / (24 * 60 * 60 * 1000)), units: 'days' },
		{ n: thresh(11, duration / (DAYS_PER_MONTH * 24 * 60 * 60 * 1000)), units: 'months' },
		{ n: thresh(Number.MAX_VALUE, duration / (365 * 24 * 60 * 60 * 1000)), units: 'years' },
		{ n: 'now', units: '' },
	]
	duration = first(duration, part => part.n !== 0)
	ago = ago && duration.n != 'now'
	if (duration.n == 1)
		duration.units = duration.units.replace(/s$/, '')
	duration = duration ? `${duration.n} ${duration.units}${ago ? ' ago' : ''}` : 'just now'
	return duration.trim()
}

function fromNow(date) {
	const now = new Date().getTime()
	if (!(date instanceof Date))
		date = new Date(date)
	return humanize(date.getTime() - now)
}
;(fromNow as any).humanize = humanize
export = fromNow
