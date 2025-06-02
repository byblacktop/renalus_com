import { LinkShell } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Button, Flex, Overlay } from '@/components/UI'
import { cn } from '@/lib/utils'

const CardPoster = ({ title, subtitle, img, link, featured }) => {
	return (
		<Flex
			as='dd'
			layout='stack'
			justify='end'
			className={cn(
				'group relative',
				'col-span-12 md:col-span-6 lg:col-span-4',
				featured
					? cn(
							'first:col-span-12 md:first:col-span-6 lg:first:col-span-5',
							'first:row-span-2 not-first:aspect-7/5',
						)
					: 'aspect-1',
			)}
		>
			<LinkShell
				href={link}
				className={cn(
					'relative z-1 p-4',
					'flex-1 flex flex-col justify-between',
				)}
			>
				<Trigger />
				<Lead
					title={title}
					subtitle={subtitle}
					as={{ title: 'h4', subtitle: 'p' }}
					className={{
						subtitle: '__2xs font-medium',
					}}
				/>
			</LinkShell>

			<Backdrop img={img} />
		</Flex>
	)
}

const Backdrop = ({ img }) => {
	return (
		<CoverImage
			img={img}
			className={{
				figure: 'rounded-xl overflow-hidden z-0',
				img: 'grayscale-0 group-hover:grayscale-80 transition-zincscale',
			}}
		>
			<Overlay
				gradient='smoke'
				direction='t'
				className='opacity-100 group-hover:opacity-0 transition-opacity'
			/>
			<Overlay
				gradient='sky'
				blend='multiply'
				className='opacity-0 group-hover:opacity-100 transition-opacity'
			/>
		</CoverImage>
	)
}

const Trigger = () => {
	return (
		<div className='self-end opacity-100 group-hover:opacity-100 transition-opacity'>
			<Button
				text='Read More'
				as='button'
				size='2xs'
				color='white'
				variant='outline'
				arrow={{
					direction: 'right',
					variant: 'long',
				}}
			/>
		</div>
	)
}

export { CardPoster }
