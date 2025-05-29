'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { Prose } from '@/components/Content'
import { AspectImage, CoverImage } from '@/components/Media'
import { GS, useArrayRef } from '@/lib/animations'
import { invalidRef, invalidRefArrData } from '@/lib/helpers'
import { tw } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const Panels = ({ items, children }) => {
	const ref = useRef()
	const [panels, setPanel] = useArrayRef()
	const [imgs, setImgs] = useArrayRef()

	useGSAP(
		() => {
			if (
				invalidRef(ref) ||
				invalidRefArrData(panels) ||
				invalidRefArrData(imgs)
			)
				return

			//// Intro
			//
			GS.timeline({
				scrollTrigger: {
					scrub: 0.75,
					ease: 'smoothOut',
					trigger: panels.current[0],
					start: 'top 125%',
					end: 'top 66%',
				},
			})
				.fromTo(
					imgs.current[0].parentElement,
					{ scale: 1 / 1.2 },
					{ scale: 1 },
				)
				.fromTo(imgs.current[0], { scale: 1.2 }, { scale: 1 }, '<')

			//// More sections
			//
			imgs.current?.slice(1).map(img => {
				GS.set(img, { autoAlpha: 0, scale: 1.2 })
			})

			panels.current?.slice(1).map((panel, idx) => {
				GS.fromTo(
					panel,
					{
						autoAlpha: 0,
						scale: 0.95,
					},
					{
						autoAlpha: 1,
						scale: 1,
						duration: 0.66,
						ease: 'easeOut',
						scrollTrigger: {
							trigger: panel,
							start: 'top 80%',
							end: 'bottom 80%',
							onEnter: () => {
								GS.to(imgs.current[idx + 1], {
									autoAlpha: 1,
									scale: 1,
									duration: 1,
									ease: 'smoothOut',
								})
							},
							onLeaveBack: () => {
								GS.to(imgs.current[idx + 1], {
									autoAlpha: 0,
									scale: 1.2,
									duration: 1,
									ease: 'smoothOut',
								})
							},
						},
					},
				)
			})
		},
		{
			scope: ref.current,
			dependencies: [items, imgs.current, panels.current],
		},
	)

	return (
		<>
			<PanelImages items={items} setImgs={setImgs} />
			<div
				ref={ref}
				className={cn(
					'relative z-2',
					'bg-white',
					'mt-[33vh]',
					'rounded-2xl px-fluid',
					tw.spaceY['3xl'],
				)}
			>
				<h5 className='text-slate-300'>Services</h5>
				<dl
					className={cn(
						'max-w-2xl mx-auto',
						'divide-y divide-slate-100',
					)}
				>
					{items.map(item => (
						<Panel setPanel={setPanel} key={kn(item)} {...item} />
					))}
				</dl>
			</div>
		</>
	)
}

const Panel = ({ title, subtitle, body, setPanel }) => (
	<dd
		ref={setPanel}
		className={cn('py-12 sm:py-16 xl:py-24 last:pb-0 first:pt-0')}
	>
		<Prose
			gap='md'
			title={title}
			subtitle={subtitle}
			body={body}
			className={{
				body: '__lg text-indigo-200',
			}}
		/>
	</dd>
)

const PanelImages = ({ items, setImgs }) => {
	return (
		<AspectImage
			ref={setImgs}
			img={items[0].img}
			w={12}
			h={16}
			className={{
				figure:
					'sticky top-8 mb-64 w-[130%] rounded-2xl overflow-hidden',
				img: 'rounded-2xl overflow-hidden',
			}}
		>
			{items.slice(1).map(({ img }) => (
				<CoverImage ref={setImgs} img={img} key={kn(img)} />
			))}
		</AspectImage>
	)
}

export { Panels, PanelImages }
