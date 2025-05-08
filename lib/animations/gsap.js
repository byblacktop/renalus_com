'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { GS } from '@/lib/animations'

export const useGsapContext = scope =>
	useMemo(() => scope && GS.context(() => {}, scope), [scope])

export const useSelector = scope =>
	useMemo(
		() => scope.current && GS.utils.selector(scope),
		[scope.current],
	)

export const useArrayRef = () => {
	const refs = useRef([])
	refs.current = []

	// Return refs in array
	return [refs, ref => ref && refs.current.push(ref)]
}

export const useStateRef = initial => {
	const [state, setState] = useState(initial)
	const ref = useRef(state)

	const dispatch = useCallback(value => {
		ref.current =
			typeof value === 'function' ? value(ref.current) : value
		setState(ref.current)
	}, [])

	// Returns state, setter, and ref (avoid stale in callbacks)
	return [state, dispatch, ref]
}
