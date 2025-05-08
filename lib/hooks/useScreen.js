import { useState } from 'react'
import { useWindowSize } from 'hamo'

import { useIsomorphicLayoutEffect } from '@/lib/hooks/useLayout'

const screens = {
	xs: '576px', // added
	sm: '640px', // default
	md: '768px', // default
	lg: '1024px', // default
	xl: '1280px', // default
	'2xl': '1440px', // default
	'3xl': '1560px', // added
	'4xl': '1780px', // added
	'5xl': '1920px', // added
	'6xl': '2080px', // added
}

//// Programatically detecting when the window resizes
export const useViewport = useWindowSize

//// Breakpoint hooks
export const useBreakpoint = breakpoint => {
	const sizes = Object.keys(screens)
	const [size, setSize] = useState(sizes[0])

	useIsomorphicLayoutEffect(() => {
		const updateSize = () => setSize(getCurrentBreakpoint())

		// Add listener
		window.addEventListener('resize', updateSize)

		// Run it
		updateSize()

		// Remove listener -- on unmount
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return size
}

export const useAboveBreakpoint = breakpoint => {
	const [size, setSize] = useState(false)

	useIsomorphicLayoutEffect(() => {
		const updateSize = () => setSize(aboveBreakpoint(breakpoint))

		// Add listener
		window.addEventListener('resize', updateSize)

		// Run it
		updateSize()

		// Remove listener -- on unmount
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return size
}

export const useBelowBreakpoint = breakpoint => {
	const [size, setSize] = useState(false)

	useIsomorphicLayoutEffect(() => {
		const updateSize = () => setSize(belowBreakpoint(breakpoint))

		// Add listener
		window.addEventListener('resize', updateSize)

		// Run it
		updateSize()

		// Remove listener -- on unmount
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return size
}

//// Helper functions
export const getBreakpointValue = value =>
	parseInt(screens[value].replace('px', ''), 10)

export const getCurrentBreakpoint = () => {
	let currentBreakpoint = ''
	let biggestBreakpointValue = 0

	for (const breakpoint of Object.keys(screens)) {
		const breakpointValue = getBreakpointValue(breakpoint)
		if (
			breakpointValue > biggestBreakpointValue &&
			window.innerWidth >= breakpointValue
		) {
			biggestBreakpointValue = breakpointValue
			currentBreakpoint = breakpoint
		}
	}

	return currentBreakpoint
}

export const aboveBreakpoint = breakpoint => {
	let activeBreakpoints = []
	for (const breakpoint of Object.keys(screens)) {
		const breakpointValue = getBreakpointValue(breakpoint)

		if (
			typeof window !== 'undefined' &&
			window.innerWidth >= breakpointValue
		) {
			activeBreakpoints.push(breakpoint)
		}
	}

	return activeBreakpoints.includes(breakpoint)
}

export const belowBreakpoint = breakpoint => {
	let activeBreakpoints = []
	for (const breakpoint of Object.keys(screens)) {
		const breakpointValue = getBreakpointValue(breakpoint)

		if (
			typeof window !== 'undefined' &&
			window.innerWidth < breakpointValue
		) {
			activeBreakpoints.push(breakpoint)
		}
	}

	return activeBreakpoints.includes(breakpoint)
}
