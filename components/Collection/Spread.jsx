'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRect } from 'hamo'

import { Container, Section } from '@/components/Compose'
import { ProseSplit, Title } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Divider, Flex, LinkArrow, Overlay } from '@/components/UI'
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
				ref={scrollRef}
				className={cn([
					'flex gap-4',
					'px-[var(--scroll-padding)]',
					'overflow-x-auto overscroll-x-contain scroll-smooth',
					'snap-x snap-mandatory',
					'[--scroll-padding:max(--spacing(6),calc((100vw-(var(--breakpoint-xl)))/2))]',
					'lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--breakpoint-xl)))/2))]',
					'[&::-webkit-scrollbar]:hidden',
					'[scrollbar-width:none]',
				])}
			>
				{items.map((item, idx) => (
					<Card
						key={kn(item)}
						bounds={bounds}
						onClick={() => scrollTo(idx)}
						{...item}
					/>
				))}
				<div className='w-[42rem] shrink-0 sm:w-[54rem]' />
			</div>
			<Container className='pt-6 pb-8'>
				<Flex justify='center'>
					<Flex gap='2xs' className='max-sm:hidden'>
						{items.map((item, idx) => (
							<button
								key={kn(item)}
								onClick={() => scrollTo(idx)}
								data-active={activeIndex === idx ? true : undefined}
								className={cn(
									'size-2.5 rounded-full ',
									'border border-transparent',
									'transition',
									'bg-zinc-300/30 hover:bg-zinc-300/70 data-active:bg-zinc-300',
									'forced-colors:data-active:bg-zinc forced-colors:data-focus:outline-offset-4',
								)}
							/>
						))}
					</Flex>
				</Flex>
			</Container>
		</Section>
	)
}

const Card = ({ img, bounds, title, body, link }) => {
	const ref = useRef(null)

	const computeOpacity = useCallback(() => {
		const element = ref.current
		if (!element || bounds.width === 0) return 1

		const rect = element.getBoundingClientRect()

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

	const opacity = computeOpacity()

	useLayoutEffect(() => {
		// console.log(opacity, computeOpacity())
	}, [computeOpacity, opacity])

	return (
		<Link {...getLink(link)} className='block group'>
			<article
				ref={ref}
				style={{ opacity }}
				className={cn(
					'relative flex flex-col justify-end shrink-0',
					'w-72 sm:w-96 aspect-9/16 sm:aspect-3/4',
					'p-6 md:p-8 xl:p-10',
					'overflow-hidden rounded-3xl',
					'snap-start scroll-ml-[var(--scroll-padding)]',
					'bg-slate-300',
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
