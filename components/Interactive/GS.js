'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import Tempus from 'tempus'

import { GSScrollTrigger } from '@/components/Interactive'
import { registerGSAP } from '@/lib/animations'

export function GSAP({ scrollTrigger = false, markers = false }) {
	useLayoutEffect(() => {
		registerGSAP()

		// Merge rafs
		gsap.ticker.lagSmoothing(0)
		gsap.ticker.remove(gsap.updateRoot)
		Tempus?.add(time => {
			gsap.updateRoot(time / 1000)
		}, 0)
	}, [])

	return scrollTrigger && <GSScrollTrigger markers={markers} />
}
