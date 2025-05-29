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

// Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func, wait) => {
	let timeout

	// This is the function that is returned and will be executed many times
	// We spread (...args) to capture any number of parameters we want to pass
	return function executedFunction(...args) {
		// The callback function to be executed after
		// the debounce time has elapsed

		const later = () => {
			// null timeout to indicate the debounce ended
			timeout = null

			// Execute the callback
			func(...args)
		}
		// This will reset the waiting every function execution.
		// This is the step that prevents the function from
		// being executed because it will never reach the
		// inside of the previous setTimeout
		clearTimeout(timeout)

		// Restart the debounce waiting period.
		// setTimeout returns a truthy value (it differs in web vs Node)
		timeout = setTimeout(later, wait)
	}
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export const throttle = (func, wait, options) => {
	let context, args, result
	let timeout = null
	let previous = 0
	if (!options) options = {}

	const later = function () {
		previous = options.leading === false ? 0 : Date.now()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}

	const cancel = function () {
		if (timeout) clearTimeout(timeout)
	}

	function wrapper() {
		let now = Date.now()
		if (!previous && options.leading === false) previous = now
		let remaining = wait - (now - previous)
		context = this
		args = arguments

		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			result = func.apply(context, args)

			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}

		return result
	}

	wrapper.cancel = cancel

	return wrapper
}
