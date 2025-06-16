'use client'

import 'lenis/dist/lenis.css'

import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useTempus } from 'tempus/react'

export function Lenis({ root, options }) {
	const lenisRef = useRef(null)
	const lenis = useLenis()

	useTempus(time => {
		if (lenisRef.current?.lenis) {
			lenisRef.current.lenis.raf(time)
		}
	})

	useEffect(() => {
		lenis?.start()
	}, [lenis])

	return (
		<ReactLenis
			ref={lenisRef}
			root={root}
			options={{
				...options,
				lerp: options?.lerp ?? 0.125,
				autoRaf: false,
				anchors: true,
				prevent: node => node?.nodeName === 'VERCEL-LIVE-FEEDBACK',
			}}
		/>
	)
}
