'use client'

import { useId, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { invalidRequired } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const Window = ({
	start = 'top 90%',
	end = 'top 50%',
	scrub = true,
	scale = 1.2,
	duration = 1,
	variation = 'in',
	animation = {},
	clipPath = 'inset(150px 25% 15% 25%)',
	className,
	children,
}) => {
	// Id
	const id = useId()

	// Refs
	const trigger = useRef()
	const target = useRef()

	useGSAP(
		() => {
			if (invalidRequired([trigger, target])) return

			//// Vars
			//
			const animations = {
				in: {
					frame: [{ scale: 1 / scale }, { scale: 1, duration }],
					pane: [{ scale }, { scale: 1, duration }],
				},
				out: {
					frame: [{ scale: 1 }, { scale: 1 / scale, duration }],
					pane: [{ scale: 1 }, { scale, duration }],
				},
				wide: {
					frame: [
						{ clipPath },
						{ clipPath: 'inset(0% 0% 0% 0%)', duration },
					],
					pane: [{ scale }, { scale: 1, duration }],
				},
				tall: {
					frame: [
						{ clipPath: 'inset(15vh 40vh 15vh 40vh)' },
						{ clipPath: 'inset(0% 0% 0% 0%)', duration },
					],
					pane: [{ scale }, { scale: 1, duration }],
				},
			}

			//// Intro
			//
			gsap
				.timeline({
					defaults: { ease: 'linear' },
					scrollTrigger: {
						id,
						scrub,
						start,
						end,
						once: false,
						trigger: target.current,
						toggleActions: 'play reverse play reverse',
					},
				})
				.fromTo(trigger.current, ...animations[variation].frame)
				.fromTo(target.current, ...animations[variation].pane, '<')
		},
		{
			scope: trigger,
			dependencies: [children],
		},
	)

	return (
		<div
			ref={trigger}
			className={cn(
				'overflow-hidden',
				cp(className, 'trigger', true),
			)}
		>
			<div ref={target} className={cp(className, 'target')}>
				{children}
			</div>
		</div>
	)
}

export { Window }
