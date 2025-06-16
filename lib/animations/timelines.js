import gsap from 'gsap'

import { validObjectKeyValue } from '../helpers'

//// Helpers
//
export const getSplitText = (els, type = 'lines, words') =>
	validObjectKeyValue(els, 'isSplit', true) ? els : els
// new GS_SPLIT(els, {
// 		type,
// 		tag: 'span',
// 		linesClass: '__l',
// 		wordsClass: '__w',
// 		charsClass: '__c',
// 	})

//// Words
//
export const animateWords = ({ id, els, ...props }) => {
	const splitted = getSplitText(els)

	gsap.set(splitted.words, { y: 60, autoAlpha: 0 })

	const __TL = gsap.timeline({
		id,
		defaults: { duration: 1, ease: 'easeInOut' },
		...props,
	})

	__TL.to(splitted.words, {
		y: 0,
		autoAlpha: 1,
		stagger: 0.06,
		// onComplete: () => splitted.revert(),
	})

	return __TL
}

//// Lines
//
export const animateLines = ({ id, els, ...props }) => {
	const splitted = getSplitText(els, 'lines')

	gsap.set(splitted.lines, { y: 60, autoAlpha: 0 })

	const __TL = gsap.timeline({
		id,
		defaults: { duration: 1, ease: 'easeInOut' },
		...props,
	})

	__TL.to(splitted.lines, {
		y: 0,
		autoAlpha: 1,
		stagger: 0.06,
		// onComplete: () => splitted.revert(),
	})

	return __TL
}

//// Images
//
export const animateImgs = ({ id, els, ...props }) => {
	gsap.set(els, { autoAlpha: 0, y: 40 })

	const __TL = gsap.timeline({
		id,
		defaults: { duration: 1, ease: 'smoothOut' },
		...props,
	})

	__TL.to(els, {
		autoAlpha: 1,
		y: 0,
		stagger: 0.15,
	})

	return __TL
}

export const revealImgs = ({ id, els, ...props }) => {
	// const { valid, triggers } = cleanTriggers(img, 'img')
	// if (!valid) return

	const { wraps, imgs } = els.reduce(
		(acc, el) => {
			const img = el.querySelector('img')
			const wrap =
				el.querySelector('.__reveal') ??
				document.createElement('span')

			// Add revealer if not already connected to document
			if (!wrap.isConnected) {
				wrap.classList.add('__reveal')

				wrap.classList.add(props?.color ?? 'bg-indigo')

				el.insertBefore(wrap, img)
			}

			// Add to array triggers
			acc.imgs.push(img)
			acc.wraps.push(wrap)

			// Return merge object
			return acc
		},
		{ imgs: [], wraps: [] },
	)

	gsap.set([...imgs, ...wraps], {
		scaleX: 0,
		transformOrigin: 'left',
	})

	const tween = gsap
		.timeline({
			id,
			defaults: { duration: 0.5, ease: 'easeInOut' },
		})
		.to(wraps, {
			scaleX: 1,
			overwrite: 'auto',
			// TODO: Find out why stagger breaks everything
			stagger: 0.08,
		})
		.set(wraps, { transformOrigin: 'right' })
		.set(imgs, { scaleX: 1 })
		.to(
			wraps,
			{
				scaleX: 0,
				// TODO: Find out why stagger breaks everything
				stagger: 0.1,
			},
			'>0.15',
		)

	return tween
}

//// Elements
//
export const animateBtns = ({ els, ...props }) => {
	els.map(el => el.classList.add('__gs'))

	const onComplete = () => els.map(el => el.classList.remove('__gs'))

	return animateEls({ els, onComplete, ...props })
}

export const animateEls = ({ id, els, ...props }) => {
	gsap.set(els, { autoAlpha: 0, y: 40 })

	const __TL = gsap.timeline({
		id,
		defaults: { duration: 0.7, ease: 'smoothOut' },
		...props,
	})

	__TL.to(els, {
		autoAlpha: 0.8,
		y: 0,
		stagger: 0.06,
	})

	return __TL
}
