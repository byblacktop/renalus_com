//// Dates
//
export const cleanDate = date => {
	if (!date) return new Date()

	if (typeof date === 'string')
		return date.includes('T')
			? new Date(date)
			: new Date(`${date}T00:00:00`)

	return date instanceof Date && !isNaN(date) ? date : new Date()
}

export const parseDate = date => {
	const parts = date.split('-')

	if (parts.length !== 3) return new Date()

	// Create a local date using year, month, day
	const [year, month, day] = parts.map(Number)
	return new Date(year, month - 1, day) // Month is zero-based
}

export const articleDate = date => {
	const fullDate = cleanDate(date)

	return [
		String(fullDate.getUTCMonth() + 1).padStart(2, '0'),
		String(fullDate.getUTCDate()).padStart(2, '0'),
		String(fullDate.getUTCFullYear()),
	].join('-')
}

export const getDateString = date =>
	cleanDate(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: 'America/Chicago',
		// timeZone: 'Asia/Shanghai', // for testing 8 hours ahead
		// timeZone: 'Pacific/Kiritimati', // for testing 14 hours ahead
	})

export const formattedDate = (
	timestamp,
	format = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		timeZone: 'America/Chicago',
	},
) => Intl.DateTimeFormat('en-US', format).format(cleanDate(timestamp))

export const formattedTime = (
	timestamp,
	format = {
		hour: 'numeric',
		minute: '2-digit',
		timeZoneName: 'short',
		timeZone: 'America/Chicago',
	},
) => Intl.DateTimeFormat('en-US', format).format(cleanDate(timestamp))

export const formattedDateTime = (
	timestamp,
	format = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
		timeZone: 'America/Chicago',
	},
) => Intl.DateTimeFormat('en-US', format).format(cleanDate(timestamp))

export const getTime = timestamp => formattedTime(timestamp)

export const getDateTime = timestamp =>
	formattedDateTime(timestamp ?? new Date())

export const getDateTimeQuery = date =>
	date.toISOString().split('.')[0] + 'Z'

export const startOfDay = date => {
	const timestamp = date
		? date.setHours(0, 0, 0, 0)
		: new Date().setHours(0, 0, 0, 0)

	return new Date(timestamp)
}

export const endOfDay = date => {
	const timestamp = date
		? date.setHours(23, 59, 59, 999)
		: new Date().setHours(23, 59, 59, 999)

	return new Date(timestamp)
}

export const getTimeRange = (start, end) =>
	[formattedDateTime(start), formattedTime(end)]
		.filter(Boolean)
		.join(' - ')

export const resourceDate = item =>
	cleanDate(
		!item
			? ''
			: typeof item.times === 'object' && item.times.length > 0
				? item.times[0].startTime
				: item.publication_date,
	)

export const isRange = dates =>
	typeof dates === 'object' && dates.length === 2

export const getYMD = date => {
	const now = getDateString(date)
	const [MM, DD, YYYY] = now.split('/')

	return [YYYY, MM, DD].join('-')
}

export const getTodayYMD = () => getYMD()

export const isDateInRange = (start, end, ref) => {
	if (!ref) ref = getTodayYMD()

	const a = start ? cleanDate(start) : startOfDay()
	const b = cleanDate(ref)
	const c = end ? cleanDate(end) : endOfDay()

	return b >= a && b <= c
}

export const isPast = dates => {
	const range = isRange(dates)
	const now = new Date()
	return range ? now > new Date(dates[0]) : now > new Date(dates)
}

export const transposeYear = (diff, date) => {
	const d = date ? new Date(date) : new Date()
	d.setFullYear(d.getFullYear() + diff)

	return d
}

export const transposeMonth = (diff, date) => {
	const d = date ? new Date(date) : new Date()
	d.setMonth(d.getMonth() + diff)

	return d
}

export const transposeDay = (diff, date) => {
	const d = date ? new Date(date) : new Date()
	d.setDate(d.getDate() + diff)

	return d
}

export const getReleaseTimestamp = date => endOfDay(cleanDate(date))

export const getRelativeDate = (diff = 0) => {
	const now = getTodayYMD()
	const ts = new Date(now)

	// Update date
	ts.setDate(ts.getDate() + diff)

	// YYYY-MM-DD formatted date ignoring date object's time and timezone
	return ts.toISOString().split('T')[0]
}

export const isAgeOver = (date, minAge) => {
	const now = new Date()
	const birth = new Date(date)

	const age = now.getFullYear() - birth.getFullYear()
	const monthDiff = now.getMonth() - birth.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && now.getDate() < birth.getDate())
	)
		return age - 1 >= minAge

	return age >= minAge
}
