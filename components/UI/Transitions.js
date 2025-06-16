'use client'

import { forwardRef } from 'react'
import { Transition } from '@headlessui/react'

import { cn, transitions } from '@/lib/utils'

const Transitions = forwardRef(
	({ as, variant, className, children, ...props }, ref) => {
		const transition = transitions[variant] ?? transitions.fade

		return (
			<Transition
				as={as}
				ref={ref}
				{...props}
				className={cn(transition, className)}
			>
				{children}
			</Transition>
		)
	},
)

export { Transitions }
