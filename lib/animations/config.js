import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { CustomEase } from 'gsap/dist/CustomEase'
import { EasePack } from 'gsap/dist/EasePack'

//// Constants
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
const RECIPROCAL_GR = 1 / GOLDEN_RATIO
const DURATION = RECIPROCAL_GR

//// Defaults
export const __TL_CONFIG = {
	delay: 0.01,
	defaults: { duration: DURATION, ease: 'smoothOut' },
}

//// Initialize GSAP
//
export const registerGSAP = callback => {
	//// Plugins
	gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase, EasePack)

	//// Eases
	CustomEase.create('easeOut', '0.175, 0.885, 0.32, 1')
	CustomEase.create('smoothOut', '0.23, 1, 0.32, 1')
	CustomEase.create(
		'shortEaseOut',
		'M0,0 C0.082,0.3 0.138,0.53 0.39,0.776 0.573,0.955 0.66,1 1,1',
	)

	CustomEase.create('easeInOut', 'M0,0 C0.43,0.195 0.02,1 1,1')

	CustomEase.create('easeIntro', '.73,0,.13,1')

	CustomEase.create('dramaticInOut', '.77,0,.175,1')

	//// Callback if necessary
	if (callback) callback()

	return true
}
