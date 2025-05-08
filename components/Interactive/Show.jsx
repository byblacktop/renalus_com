'use client'

import { useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai'

import { GS } from '@/lib/animations/config'
import { useBrowserLayout } from '@/lib/hooks/useLayout'
import { bannerOpen } from '@/lib/store'

const Show = ({ children, initial = false, ...props }) => {
	const [show, setShow] = useAtom(bannerOpen)
	const heightRef = useRef(0)

	useEffect(() => {
		if (initial) setShow(true)
	}, [initial])

	useBrowserLayout(() => {
		const size = show ? 48 : 0
		const r = document.querySelector(':root')

		GS.to(heightRef, {
			current: size,
			duration: 0.5,
			delay: 0.2,
			ease: 'easeIntro',
			onUpdate: () =>
				r.style.setProperty('--h-banner', `${heightRef.current}px`),
		})
	}, [show])

	return (
		<Transition show={show} appear={true} {...props}>
			{children}
			<div className='flex flex-1 justify-end pb-8'>
				<button
					type='button'
					className='-m-3 p-3 focus-visible:outline-offset-[-4px]'
					onClick={() => setShow(false)}
				>
					<span className='sr-only'>Dismiss</span>
					<XMarkIcon aria-hidden='true' className='size-5' />
				</button>
			</div>
		</Transition>
	)
}

export { Show }
