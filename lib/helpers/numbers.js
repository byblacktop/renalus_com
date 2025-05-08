//// Numbers
//
export const validNumber = num => typeof num === 'number'

export const invalidNumber = num => !validNumber(num)

export const formatFloat = (value, precision = 2) =>
	Math.floor(value) === value ? value : value.toFixed(precision)

export const getNumeric = qty => {
	if (!qty) return 0

	if (typeof qty === 'number') return qty

	const value = Number(qty.replace(regex.nonNumeric, ''))

	return isNaN(value) ? 0 : value
}

export const quantityNumber = qty => {
	if (!qty) return 0

	if (typeof qty === 'number') return qty

	return Number(qty.replace(',', ''))
}

export const getSum = nums =>
	nums.reduce((a, b) => getNumeric(a ?? 0) + getNumeric(b ?? 0), 0)

export const padZero = num => (num < 10 ? `0${num}` : num)

export const spacingToPx = spacing => spacing * 4

export const spacingToRem = spacing => spacing * 0.25
