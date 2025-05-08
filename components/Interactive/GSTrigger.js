'use client'

import { useEffect, useLayoutEffect } from 'react'

import { __TL_CONFIG, GS, GS_TRIGGER } from '@/lib/animations'
import { useLenis } from '@/lib/lenis'

const GSScrollTrigger = ({ markers }) => {
	useLayoutEffect(() => {
		// Globally register ScrollTrigger
		GS.registerPlugin(GS_TRIGGER)

		// ScrollTrigger custom setup
		GS_TRIGGER.clearScrollMemory('manual')
		GS_TRIGGER.defaults({ ...__TL_CONFIG, markers })
	})

	const lenis = useLenis(GS_TRIGGER?.update)
	useEffect(() => GS_TRIGGER?.refresh(), [lenis])

	return null
}

export { GSScrollTrigger }
