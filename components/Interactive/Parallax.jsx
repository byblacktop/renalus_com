'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useWindowSize } from 'hamo'

import { mapRange } from '@/lib/helpers'
import { cp } from '@/lib/utils'

const Parallax = ({
	className,
	children,
	speed = 1,
	id = 'parallax',
	position,
}) => {
	const trigger = useRef()
	const target = useRef()

	const { width: windowWidth } = useWindowSize()

	useGSAP(
		() => {
			const y = windowWidth * speed * 0.1

			const setY = gsap.quickSetter(target.current, 'y', 'px')
			const set3D = gsap.quickSetter(target.current, 'force3D')

			gsap.timeline({
				scrollTrigger: {
					id,
					scrub: true,
					trigger:
						position === 'top' ? document.body : trigger.current,
					start: position === 'top' ? 'top top' : 'top bottom',
					end: position === 'top' ? '+=100%' : 'bottom top',
					onUpdate: e => {
						if (position === 'top') {
							setY(e.progress * y)
						} else {
							setY(-mapRange(0, 1, e.progress, -y, y))
						}

						set3D(e.progress > 0 && e.progress < 1)
					},
				},
			})
		},
		{
			scope: trigger,
			dependencies: [id, speed, position, windowWidth],
		},
	)

	return (
		<div ref={trigger} className={cp(className, 'trigger')}>
			<div ref={target} className={cp(className, 'target', true)}>
				{children}
			</div>
		</div>
	)
}

export { Parallax }
