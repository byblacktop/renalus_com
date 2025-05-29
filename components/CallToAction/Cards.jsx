import { asLink } from '@prismicio/client'

import { Container, LinkShell, Section } from '@/components/Compose'
import { Lead, Thread } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import {
	Flex,
	Grid,
	LinkArrow,
	Overlay,
	Spacer,
} from '@/components/UI'
import { bgColor, getTheme } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CtaCards = ({
	img,
	links,
	text,
	dataset,
	items,
	...contentProps
}) => {
	return (
		<Section
			{...dataset}
			className={
				cn()
				// 'overflow-hidden',
				// 'bg-gradient-to-b from-stone-50 via-stone-50 to-indigo',

				// 'from-50% to-50%',
			}
		>
			<Container
				width='lg'
				layout='grid'
				cols={12}
				gap='xl'
				className='__3xs items-end'
			>
				<Spacer size={4} className='col-span-full' />
				<Thread
					as={{ subtitle: 'h6' }}
					className={{
						thread: 'col-span-5',
						title: 'text-white',
						subtitle: '__label text-slate',
					}}
					{...contentProps}
				/>

				<Grid cols='2' gap='sm' className='col-span-7'>
					{items.map(item => (
						<Card key={kn(item)} {...item} />
					))}
				</Grid>
			</Container>

			<CoverImage img={img} className='rounded-4xl overflow-hidden'>
				<Overlay gradient='indigo' blend='hard' />
			</CoverImage>
		</Section>
	)
}

const Card = ({ title, subtitle, link, color }) => {
	return (
		<Flex
			as='dd'
			link={link}
			layout='stack'
			justify='between'
			className={cn(
				[bgColor(color), '/50'].join(''),
				['*:', getTheme(color).text].join(''),
				'group h-full rounded-2xl',
				'backdrop-blur-sm',
			)}
		>
			<LinkShell
				link={link}
				className={cn(
					'px-4 md:px-6 xl:px-8',
					'pt-6 md:pt-8 xl:pt-10',
					'pb-3 md:pb-4 xl:pb-5',
				)}
			>
				<Lead
					title={subtitle}
					subtitle={title}
					layout='stack'
					gap='md'
					as={{ title: 'h6', subtitle: 'h4' }}
					className={{
						title: '__label __xs',
					}}
				>
					<Spacer size={5} />

					<div
						className={cn(
							'border-t border-t-current',
							'p-0 pt-4 md:pt-5',
						)}
					>
						<LinkArrow
							caption={link.text}
							direction='upRight'
							className='__label w-full justify-between'
						/>
					</div>
				</Lead>
			</LinkShell>
		</Flex>
	)
}

export { CtaCards }
