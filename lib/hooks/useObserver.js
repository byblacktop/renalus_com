import { useCallback, useEffect, useRef, useState } from 'react'

import { throttle } from '@/lib/helpers'

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
