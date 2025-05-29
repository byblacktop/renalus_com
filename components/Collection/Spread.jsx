'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRect } from 'hamo'

import { Container, Section } from '@/components/Compose'
import { ProseSplit, Title } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Divider, Flex, LinkArrow, Overlay } from '@/components/UI'
import { getLink } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CollectionSpread = ({ items, dataset, ...contentProps }) => {
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
			className='overflow-hidden bg-indigo *:text-white -mb-8 pb-8'
			{...dataset}
		>
			<Container
				className={
					cn()
					// 'border-t border-t-slate-200'
				}
			>
				<ProseSplit align='end' {...contentProps} />
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
					<Flex gap='3xs' className='max-sm:hidden'>
						{items.map((item, idx) => (
							<button
								key={kn(item)}
								onClick={() => scrollTo(idx)}
								data-active={activeIndex === idx ? true : undefined}
								className={cn(
									'size-2.5 rounded-full bg-slate-300',
									'border border-transparent',
									'transition',
									'data-active:bg-slate-400 data-hover:bg-slate-400',
									'forced-colors:data-active:bg-slate forced-colors:data-focus:outline-offset-4',
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
				)}
			>
				<figcaption className='relative z-1 space-y-2 md:space-y-4'>
					<Title
						title={title}
						className='__xl text-balance text-white'
					/>
					<Divider color='Steel 200' />
					<Title title={body} className='text-slate-100' />
				</figcaption>

				<CoverImage
					img={img}
					className={{
						cover: 'z-0',
						img: 'grayscale-0 group-hover:grayscale-80 transition-grayscale',
					}}
				>
					<div className='absolute z-10 bottom-4 right-4'>
						<LinkArrow
							loop
							size='lg'
							direction='upRight'
							className='text-white/50 group-hover:text-white/100'
						/>
					</div>
					<Overlay direction='t' gradient='royal' />
					<Overlay
						direction='t'
						gradient='royal'
						className='opacity-0 group-hover:opacity-100 transition-opacity'
					/>
				</CoverImage>
			</article>
		</Link>
	)
}

export { CollectionSpread }
