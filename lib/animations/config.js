import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/dist/CustomEase'
import { EasePack } from 'gsap/dist/EasePack'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// import { SplitText } from 'gsap/dist/SplitText'

//// Export global core & plugins
//
export const GS = gsap
export const GS_TRIGGER = ScrollTrigger
// export const GS_SPLIT = SplitText
export const MM = GS.matchMedia()

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
	GS.registerPlugin(useGSAP, CustomEase, EasePack)

	//// Effects
	GS.registerEffect({
		name: 'pulse',
		effect(targets) {
			return GS.fromTo(
				targets,
				{ scale: 1 },
				{
					scale: 1.5,
					repeat: 1,
					ease: 'bounce',
					yoyoEase: 'power3',
				},
			)
		},
	})

	GS.registerEffect({
		name: 'spin',
		effect(targets) {
			return GS.to(targets, {
				rotation: (i, el) =>
					GS.utils.snap(360, GS.getProperty(el, 'rotation') + 360),
			})
		},
	})

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
	if (callback) return callback()

	return true
}
