'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Transition, TransitionChild } from '@headlessui/react'
import {
	Bars2Icon,
	Bars3BottomRightIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'

import { Shell } from '@/components/Compose'
import { CoverImage, Logo } from '@/components/Media'
import { Button } from '@/components/UI'
import { NAV } from '@/lib/sitemap'
import { navOpen } from '@/lib/store'
import { cn, kn } from '@/lib/utils'

// import Mark from '@public/logo/mark.svg'

const img =
	'https://images.prismic.io/terrezza/Z8_WHhsAHJWomTrT_optometry-vision-and-optometrist-hand-with-glasse-2023-11-27-05-18-45-utc.jpg?auto=format,compress'

const NavOverlay = ({ offset }) => {
	// Path
	const path = usePathname()

	// State
	const [open, setOpen] = useAtom(navOpen)

	// Side effects
	useEffect(() => {
		setOpen(false)
	}, [path])

	return (
		<Transition show={open} as='section' className='relative z-30'>
			<TransitionChild
			// enter='ease-out duration-100'
			// enterFrom='opacity-0'
			// enterTo='opacity-100'
			// leave='ease-in duration-100'
			// leaveFrom='opacity-100'
			// leaveTo='opacity-0'
			>
				<div className='fixed inset-0 bg-indigo-800/70 backdrop-blur' />
			</TransitionChild>

			<TransitionChild
			// enter='ease-out duration-300 origin-top'
			// enterFrom='opacity-0 scale-90'
			// enterTo='opacity-100 scale-100'
			// leave='ease-in duration-200 origin-top'
			// leaveFrom='opacity-100 scale-100'
			// leaveTo='opacity-0 scale-90'
			>
				<section className={cn('fixed inset-0 p-1.5')}>
					{/* Main Nav */}
					<article className='bg-white px-4 rounded-2xl overflow-hidden shadow-2xl'>
						{/* Spacer */}
						<div style={{ height: 'var(--h-header)' }} />

						<div className='divide-y divide-gray-500/10 grid grid-cols-2'>
							{/* Nav Items */}
							<nav>
								{NAV.primary.map(item => (
									<Button
										key={kn(item)}
										variant='flat'
										link={item}
										size='lg'
										className='block py-1.5'
									/>
								))}
							</nav>

							<Link
								href='/contact'
								className='relative block p-6 -mr-4'
							>
								<div className='relative z-10'>
									<h3 className='text-white'>
										Start your Clear Vision Journey
									</h3>
									<div className='aspect-w-16 aspect-h-6' />
									<Button
										as='button'
										text='Request Appointment'
										variant='stroke'
										size='lg'
										color='accent'
										arrow={{
											default: true,
										}}
									/>
								</div>

								<CoverImage
									img={img}
									// className='grayscale-100 mix-blend-multiply'
									className={{
										figure: cn(
											'@container z-1 bg-slate-400',
											'rounded-tl-6xl',
										),
										img: cn(
											'z-2',
											'mix-blend-multiply grayscale-100',
										),
									}}
								/>
								<Deco />
							</Link>
						</div>
					</article>
				</section>
			</TransitionChild>
		</Transition>
	)
}

const Deco = () => (
	<figure className='absolute -inset-4 z-0'>
		{/* <Mark className='h-full w-full scale-125 absolute inset-0 fill-none stroke-white/70 stroke-[4px]' /> */}
	</figure>
)

const OverlayTrigger = ({ show, className }) => {
	// State
	const [open, setOpen] = useAtom(navOpen)

	// Bail if not visible
	if (!show) return

	return (
		<li className='flex'>
			<button
				type='button'
				className={cn(
					'inline-flex flex-row-reverse items-center justify-center',
					'p-2.5 -m-2.5 gap-1.5',
					'rounded-md text-indigo',
					className,
					open && 'text-indigo',
				)}
				onClick={() => setOpen(!open)}
			>
				<span className='h6 uppercase'>Menu</span>
				<figure className='size-7.5'>
					<Shell
						as={open ? XMarkIcon : Bars2Icon}
						aria-hidden='true'
					/>
				</figure>
			</button>
		</li>
	)
}

export { NavOverlay, OverlayTrigger }
