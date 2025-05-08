'use client'

import { forwardRef } from 'react'
import { Transition } from '@headlessui/react'

import { transitions } from '@/lib/utils'

const Transitions = forwardRef(
	({ as, variant, children, ...props }, ref) => {
		const transition = transitions[variant] ?? transitions.fade

		return (
			<Transition as={as} ref={ref} {...transition} {...props}>
				{children}
			</Transition>
		)
	},
)

export { Transitions }
