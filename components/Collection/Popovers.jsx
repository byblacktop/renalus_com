import Image from 'next/image'
import {
	CloseButton,
	Popover,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react'

import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { Button, Grid } from '@/components/UI'
import { gap } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const CollectionPopovers = ({
	title,
	subtitle,
	body,
	items,
	cols = 2,
	dataset,
	position,
	link,
	text,
}) => {
	const layout = {
		content:
			cols > 4
				? 'col-span-4'
				: cols > 2
					? 'col-span-1'
					: 'col-span-2',
		items:
			cols > 4
				? 'col-span-4'
				: cols > 2
					? 'col-span-3'
					: 'col-span-2',
	}

	return (
		<Section className={cn('overflow-hidden')} {...dataset}>
			<Container
				layout='grid'
				cols={4}
				gap={cols > 4 ? 'md' : 'xl'}
				className='__xs items-start max-md:grid-cols-1'
			>
				<Prose
					title={title}
					body={[...subtitle, ...body]}
					bodyProps={{ space: '3xs' }}
					links={[{ link, text }]}
					className={cn(
						'w-full max-w-xl',
						layout.content,
						position === 'Left' && 'order-2 ml-auto',
					)}
				/>
				<Grid cols={cols} gap='xs' className={layout.items}>
					{items.map((item, i) => (
						<Item key={[kn(item), i].join('__')} {...item} />
					))}
				</Grid>
			</Container>
		</Section>
	)
}

const Item = ({ img, cta, ...contentProps }) => {
	return (
		<Popover className='h-full'>
			<PopoverButton
				as='figure'
				className={cn(
					'relative group h-full',
					'flex',
					'p-4 pb-7.25 md:p-8 md:pb-14.5',
					'rounded-2xl overflow-hidden',
					'transition-colors duration-500 ease-in-out',
					'bg-slate-50 hover:bg-slate-100/90',
					'cursor-pointer',
					gap.sm,
				)}
			>
				<Image
					src={img.sm.url}
					width={img.sm.dimensions.width}
					height={img.sm.dimensions.height}
					className={cn(
						'object-contain w-full max-w-full',
						'aspect-16/3',
					)}
					alt=''
				/>

				<figcaption
					className={cn(
						'h6 __label __xs',
						'absolute inset-0 top-auto',
						' text-center',
						'border-t border-slate-200',
					)}
				>
					<Button
						as='button'
						link={{
							text: cta || 'Order Now',
						}}
						variant='flat'
						size='2xs'
						arrow={{ default: true }}
					/>
				</figcaption>
			</PopoverButton>
			<PopoverPanel
				transition
				anchor='top'
				className={cn(
					'p-3 md:p-5 bg-zinc-100',
					'rounded-2xl shadow-2xl',
					'transition duration-300 ease-out origin-bottom',
					'data-closed:scale-95 data-closed:opacity-0',
				)}
			>
				<Prose
					{...contentProps}
					className={{
						prose: '__xs',
						links: {
							group: cn(
								'grid md:grid-cols-2 justify-items-start',
								'mt-1.5 md:mt-3 pt-2 md:pt-4',
								'border-t border-slate-200',
							),
						},
					}}
					gap={{ prose: '3xs' }}
					linkProps={{
						variant: 'stroke',
						size: 'xs',
						arrow: { default: true },
					}}
				/>
			</PopoverPanel>
		</Popover>
	)
}
export { CollectionPopovers }
