'use client'

import { useId, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import {
	animateBtns,
	animateLines,
	animateWords,
	revealImgs,
	useSelector,
} from '@/lib/animations'
import { invalidArrData, validObjectKeyValue } from '@/lib/helpers'

const validateSplitText = el =>
	validObjectKeyValue(el, 'isSplit', true)

const Section = ({ animate = false, ...props }) => {
	// Refs
	const uid = useId()
	const ref = useRef()
	const __TL = useRef()

	// GSAP helpers
	const q = useSelector(ref)
	const gsProps = animate
		? { 'data-gs-id': uid, 'data-gs-ready': false }
		: {}

	const animateIntro = () => {
		ref.current.dataset.gsReady = true

		if (!animate || !q) return

		//// Parent timeline
		//
		__TL.current = gsap.timeline({ id: uid, paused: true })

		//// Child timelines
		//
		const intros = [
			{
				els: q('.__coverImage'),
				fn: revealImgs,
				id: `${uid}__imgs`,
			},
			{
				els: q(['h1', 'h2', 'h3', 'h4']),
				fn: animateWords,
				id: `${uid}__title`,
			},
			{
				els: q('p'),
				fn: animateLines,
				id: `${uid}__body`,
			},
			{
				els: q('.__btn_group .btn'),
				fn: animateBtns,
				id: `${uid}__cta`,
			},
			{
				els: q(['h5', 'h6']),
				fn: animateWords,
				id: `${uid}__subtitle`,
			},
		]
			.filter(({ els, fn }) => {
				if (
					[invalidArrData(els), typeof fn !== 'function'].some(
						Boolean,
					)
				)
					return false

				return true
			})
			.map(({ els, fn, id }) =>
				__TL.current.add(
					fn({ id, els }),
					id.includes('title') ? '<' : '<30%',
				),
			)

		//// Play sequenced timeline
		//
		__TL.current.play()
	}

	// useGSAP(animateIntro, { scope: ref, dependencies: [q] })

	return <section ref={ref} {...gsProps} {...props} />
}

// DEV: Below will show appear transition on file change
// @refresh reset

export { Section }
