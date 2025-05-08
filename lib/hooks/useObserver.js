import { useCallback, useEffect, useRef, useState } from 'react'

// import { useResizeObserver } from 'hamo'
// import { useDebouncedCallback } from 'use-debounce'

// export const useDebouncedResizeObserver = (domRef, wait) => {
// 	const [size, setSize] = useState({})

// 	const onResize = useDebouncedCallback(setSize, wait, {
// 		maxWait: 2000,
// 	})

// 	useResizeObserver({ ref: domRef, onResize })

// 	return { ...size }
// }

export const useResizeElement = (
	{
		lazy = false,
		debounce = 1000,
		box = 'border-box',
		callback = () => {},
	} = {},
	deps = [],
) => {
	const entryRef = useRef({})
	const [entry, setEntry] = useState({})
	const [element, setElement] = useState()

	useEffect(() => {
		if (!element) return

		const onResize = throttle(([entry]) => {
			entryRef.current = entry

			callback(entry)

			if (!lazy) {
				setEntry(entry)
			}
		}, debounce)

		const resizeObserver = new ResizeObserver(onResize)
		resizeObserver.observe(element, { box })

		return () => {
			resizeObserver.disconnect()
			onResize.cancel()
		}
	}, [element, lazy, debounce, box, ...deps])

	const get = useCallback(() => entryRef.current, [])

	return [setElement, lazy ? get : entry]
}

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

export const usePrev = value => {
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const ref = useRef(null)
	// Store current value in ref
	useEffect(() => {
		ref.current = value

		return () => (ref.current = null)
	}, [value]) // Only re-run if value changes
	// Return previous value (happens before update in useEffect above)
	return ref.current
}

//// Hooks
//
export function useDebounceEffect(fn, waitTime, deps) {
	useEffect(() => {
		const t = setTimeout(() => {
			fn.apply(undefined, deps)
		}, waitTime)

		return () => {
			clearTimeout(t)
		}
	}, deps)
}
