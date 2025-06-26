'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
// import {
// 	ChevronLeftIcon,
// 	ChevronRightIcon,
// } from '@heroicons/react/24/outline'
import { useRect } from 'hamo'

import { Container, Section } from '@/components/Compose'
import { ProseSplit, Title } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import {
	Divider,
	Flex,
	LinkArrow,
	NavArrow,
	Overlay,
} from '@/components/UI'
import { getLink, getTheme } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CollectionSpread = ({
	items,
	color,
	dataset,
	...contentProps
}) => {
	// Refs
	const scrollRef = useRef(null)

	// State
	const [activeIndex, setActiveIndex] = useState(0)

	// Side effects
	const [setSizeRef, bounds] = useRect({ debounce: 100 }, [])

	function scrollTo(index) {
		const gap = 32
		const width = scrollRef.current.children[0].offsetWidth
		scrollRef.current.scrollTo({ left: (width + gap) * index })
	}

	const handleNext = () => {
		setActiveIndex(Math.min(activeIndex + 1, items.length - 1))
	}
	const handlePrev = () => {
		setActiveIndex(Math.max(activeIndex - 1, 0))
	}

	const handleDot = idx => {
		setActiveIndex(idx)
	}

	useLayoutEffect(() => {
		scrollTo(activeIndex)
	}, [activeIndex])

	return (
		<Section
			ref={setSizeRef}
			className={cn(
				'overflow-hidden-mb-8 pb-8',
				getTheme(color).className,
			)}
			dataset={dataset}
		>
			<Container>
				<ProseSplit color={color} align='end' {...contentProps} />
			</Container>

			<div
				className={cn(
					'relative',
					'[--scroll-padding:max(--spacing(6),calc((100vw-(var(--breakpoint-xl)))/2))]',
					'lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--breakpoint-xl)))/2))]',
				)}
			>
				<div
					ref={scrollRef}
					className={cn([
						'flex gap-4',
						'px-[var(--scroll-padding)]',
						'overflow-x-auto overscroll-x-contain scroll-smooth',
						'snap-x snap-mandatory',

						'[&::-webkit-scrollbar]:hidden',
						'[scrollbar-width:none]',
					])}
				>
					{items.map((item, idx) => (
						<Card
							key={kn(item)}
							bounds={bounds}
							onClick={() => scrollTo(idx)}
							activeIndex={activeIndex}
							{...item}
						/>
					))}
				</div>

				<div className='pointer-events-none'>
					<div
						className={cn(
							'absolute right-3 top-0 h-full',
							'flex justify-center items-center',
							// 'pointer-events-auto cursor-pointer',
						)}
					>
						<NavArrow
							onClick={handleNext}
							bg='indigo-900'
							color='slate'
							direction='right'
							variant='chevron'
							circle
							className='pointer-events-auto cursor-pointer'
						/>
					</div>
					<div
						className={cn(
							'absolute left-[calc(var(--scroll-padding)-4rem)] top-0 h-full',
							'flex justify-center items-center',
						)}
					>
						<NavArrow
							onClick={handlePrev}
							bg='indigo-900'
							color='slate'
							direction='left'
							variant='chevron'
							circle
							className={cn(
								'pointer-events-auto',
								activeIndex === 0
									? 'opacity-30 cursor-not-allowed'
									: 'opacity-100 cursor-pointer',
							)}
						/>
					</div>
				</div>
			</div>
			<Container className='pt-6 pb-8'>
				<Flex justify='center'>
					<Flex gap='2xs' className='max-sm:hidden'>
						{Array.from({ length: items.length - 2 }).map(
							(_, idx) => (
								<button
									key={idx}
									onClick={() => handleDot(idx)}
									data-active={activeIndex === idx ? true : undefined}
									className={cn(
										'size-2.5 rounded-full ',
										'border border-transparent',
										'transition',
										'bg-zinc-300/30 hover:bg-zinc-300/70 data-active:bg-zinc-300',
										'forced-colors:data-active:bg-zinc forced-colors:data-focus:outline-offset-4',
									)}
								/>
							),
						)}
					</Flex>
				</Flex>
			</Container>
		</Section>
	)
}

const Card = ({ img, bounds, title, body, link, activeIndex }) => {
	const ref = useRef(null)
	const [opacity, setOpacity] = useState(1)

	const computeOpacity = useCallback(() => {
		const element = ref.current
		if (!element || bounds.width === 0) return 1

		const rect = element.getBoundingClientRect()

		console.log(element, rect, bounds)

		if (rect.left < bounds.left) {
			const diff = bounds.left - rect.left
			const percent = diff / rect.width

			return Math.max(0.5, 1 - percent)
		} else if (rect.right > bounds.right) {
			const diff = rect.right - bounds.right
			const percent = diff / rect.width

			return Math.max(0.5, 1 - percent)
		} else {
			return 1
		}
	}, [ref, bounds.width, bounds.left, bounds.right])

	useLayoutEffect(() => {
		setOpacity(computeOpacity())
	}, [activeIndex])

	return (
		<Link
			{...getLink(link)}
			className={cn('block group bg-slate-900', 'rounded-3xl')}
		>
			<article
				ref={ref}
				style={{ opacity }}
				className={cn(
					'relative flex flex-col justify-end shrink-0',
					'w-72 sm:w-96 aspect-9/16 sm:aspect-3/4',
					'p-6 md:p-8 xl:p-10',
					'overflow-hidden rounded-3xl',
					'snap-start scroll-ml-[var(--scroll-padding)]',
					'transition-opacity',
				)}
			>
				<figcaption className='relative z-1 space-y-2 md:space-y-4'>
					<Title
						title={title}
						className='__lg text-balance text-white'
					/>
					<Divider color='Red' className='h-0.5' />
					<Title title={body} className='__sm text-zinc-200' />
				</figcaption>

				<CoverImage
					img={img}
					className={{
						cover: 'z-0',
						img: 'grayscale-0 group-hover:grayscale-80',
					}}
				>
					<div className='absolute z-10 bottom-4 right-4'>
						<LinkArrow
							loop
							size='lg'
							direction='upRight'
							className='text-zinc-100/50 group-hover:text-zinc-100'
						/>
					</div>
					<Overlay
						direction='t'
						gradient='indigo'
						blend='multiply'
						className='from-35% to-80%'
					/>
					<Overlay
						direction='t'
						gradient='indigo'
						blend='multiply'
						className='opacity-0 group-hover:opacity-100 transition-opacity'
					/>
					<Overlay
						color='sky'
						blend='color'
						className='opacity-0 group-hover:opacity-30 transition-opacity'
					/>
				</CoverImage>
			</article>
		</Link>
	)
}

export { CollectionSpread }
