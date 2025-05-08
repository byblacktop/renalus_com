//// Math
//
export const clamp = (min, input, max) => {
	return Math.max(min, Math.min(input, max))
}

export const wrap = (min, max, value) => {
	var v = value - min
	var r = max - min
	return ((r + (v % r)) % r) + min
}

export const mapRange = (in_min, in_max, input, out_min, out_max) => {
	return (
		((input - in_min) * (out_max - out_min)) / (in_max - in_min) +
		out_min
	)
}

export const lerp = (start, end, amt) => (1 - amt) * start + amt * end

export const truncate = (value, decimals) =>
	parseFloat(value.toFixed(decimals))
