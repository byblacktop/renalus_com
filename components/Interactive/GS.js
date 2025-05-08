'use client'

import { useLayoutEffect } from 'react'
import Tempus from 'tempus'

import { GSScrollTrigger } from '@/components/Interactive'
import { GS, registerGSAP } from '@/lib/animations'

const GSAP = ({ scrollTrigger = false, markers = false }) => {
	useLayoutEffect(() => {
		registerGSAP()

		// Merge rafs
		GS.ticker.lagSmoothing(0)
		GS.ticker.remove(GS.updateRoot)
		Tempus?.add(time => {
			GS.updateRoot(time / 1000)
		}, 0)
	}, [])

	return scrollTrigger && <GSScrollTrigger markers={markers} />
}

export { GSAP }
