'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { Container, Shell } from '@/components/Compose'
import { Body, Lead } from '@/components/Content'
import { Parallax } from '@/components/Interactive/Parallax'
import { AspectImage, CoverImage } from '@/components/Media'
import { useArrayRef } from '@/lib/animations'
import { invalidRef, invalidRefArrData } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const Stack = ({ items, layout }) => {
	const ref = useRef()
	const [panels, setPanel] = useArrayRef()

	useGSAP(
		() => {
			if (invalidRef(ref) || invalidRefArrData(panels)) return

			// Don't run on small screens
			gsap.matchMedia().add('(min-width: 768px)', () => {
				//// Intro
				//
				panels.current?.map((panel, idx) => {
					gsap.fromTo(
						panel,
						{
							autoAlpha: 1,
							scale: 1,
						},
						{
							autoAlpha: 0.5,
							scale: 0.97,
							scrollTrigger: {
								scrub: 0.8,
								ease: 'out.2',
								trigger: panel,
								start: 'top top',
								end: 'bottom top',
								toggleActions: 'play reverse play reverse',
							},
						},
					)
				})
			})
		},
		{
			scope: ref,
			dependencies: [items, panels],
		},
	)

	return (
		<dl
			ref={ref}
			className='divide-y divide-slate-200 border-t border-slate-200 bg-indigo'
		>
			{items.map(item => (
				<Panel
					setPanel={setPanel}
					key={kn(item)}
					layout={layout}
					{...item}
				/>
			))}
		</dl>
	)
}

const Panel = ({ setPanel, img, layout, title, subtitle, body }) => {
	const plx = layout === 'collection'

	return (
		<dd className={cn('md:sticky md:top-0', 'bg-indigo')}>
			<div ref={setPanel} className='relative z-2 bg-bg'>
				<div className='grid grid-cols-12 md:gap-12 xl:gap-20'>
					<div
						className={cn(
							'relative p-fluid-x',
							'border-r border-slate-200',
							'col-span-12 md:col-span-5',
						)}
					>
						<Shell
							as={plx ? Deco : AspectImage}
							img={img}
							w={12}
							h={16}
						/>
					</div>

					<Container
						width='3xs'
						className={cn(
							'__2xl __base max-md:py-fluid-x ',
							'col-span-12 md:col-span-7',
							'space-y-8 md:space-y-12 xl:space-y-16',
						)}
					>
						<div className='space-y-1'>
							<Lead
								title={title}
								subtitle={subtitle}
								layout={plx && 'reverse'}
							/>
						</div>

						<Body body={body} />
					</Container>
				</div>
			</div>
		</dd>
	)
}

const Deco = ({ img }) => (
	<Parallax
		speed={-1}
		variant='bg'
		className={{
			trigger: 'relative w-full h-full min-h-50vh overflow-hidden',
			target: cn(
				'absolute inset-0',
				'-bottom-[10%] -top-[10%]',
				'xl:-bottom-[15%] xl:-top-[15%]',
			),
		}}
	>
		<CoverImage img={img} />
	</Parallax>
)

export { Stack }
