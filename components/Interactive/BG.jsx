'use client'

import { forwardRef, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { CoverImage } from '@/components/Media'
import { invalidRequired } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import img3 from '@/img/03.jpg'

const setScale = (el, dir) =>
	gsap.quickTo(el, dir, { duration: 0.3, ease: 'power2.out' })

const BG = ({ img, color, start = 0.15, end = 1 }) => {
	// Refs
	const ref = useRef()
	const box = useRef()

	useGSAP(
		() => {
			if (invalidRequired([ref, box])) return

			// Setup
			gsap.set(box.current, { scale: start })
			const fig = box.current.querySelector(':scope > figure')
			if (fig) gsap.set(fig, { scale: 1 / start })

			// Tweens
			const [scaleBox, scaleFig] = [box.current, fig].map(el => [
				setScale(el, 'scaleX'),
				setScale(el, 'scaleY'),
			])

			//// Animation Scrub
			//
			const onUpdate = ({ progress }) => {
				const size = gsap.utils.mapRange(0, 1, start, end, progress)

				scaleBox.map(fn => fn(size))
				scaleFig.map(fn => fn(1 / size))
			}

			gsap.timeline({
				scrollTrigger: {
					scrub: 0.3,
					trigger: ref.current,
					start: 'top bottom',
					end: 'top 25%',
					onUpdate,
				},
			})
		},
		{
			scope: ref,
			dependencies: [box.current],
		},
	)

	return (
		<div
			ref={ref}
			className='absolute inset-0 opacity-30 mix-blend-overlay'
		>
			<Window ref={box} img={img3} />
		</div>
	)
}

const Box = forwardRef((props, ref) => (
	<div
		ref={ref}
		className={cn(
			'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
			'aspect-1 w-full bg-indigo-700',
		)}
	/>
))

const Window = forwardRef(({ img }, ref) => (
	<div ref={ref} className='absolute inset-0 overflow-hidden'>
		<CoverImage img={img} className='rotate-18' />
	</div>
))

export { BG }
