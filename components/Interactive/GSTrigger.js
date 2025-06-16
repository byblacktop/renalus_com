'use client'

import { useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useLenis } from 'lenis/react'

import { __TL_CONFIG } from '@/lib/animations'

export function GSScrollTrigger({ markers }) {
	useLayoutEffect(() => {
		// ScrollTrigger custom setup
		ScrollTrigger.clearScrollMemory('manual')
		ScrollTrigger.defaults({ ...__TL_CONFIG, markers })
	}, [])

	const lenis = useLenis(ScrollTrigger?.update)
	useEffect(() => ScrollTrigger?.refresh(), [lenis])

	return null
}
