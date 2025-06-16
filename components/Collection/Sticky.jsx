import { ItemNumber } from '@/components/Cards'
import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { BG } from '@/components/Interactive'
import { Grid } from '@/components/UI'
import { cn, kn } from '@/lib/utils'
import { bgColor, colorShift, getTheme } from '@/helpers/colors'

const CollectionSticky = ({
	items,
	color,
	cols,
	numbered,
	...contentProps
}) => {
	cols = 1

	return (
		<Section className={cn(getTheme(color).className)}>
			<Container
				cols={1}
				gap='lg'
				className='border-indigo-600 md:border-t 3xl:pr-0'
			>
				<ItemsOffset
					items={items}
					cols={cols}
					color={color}
					numbered={numbered}
					{...contentProps}
				/>
			</Container>

			<BG />
		</Section>
	)
}

const Items = ({ items, cols, color, numbered }) => {
	return (
		<Grid cols={1} gap={0}>
			{items.map((item, idx) => (
				<Item
					key={kn(item)}
					idx={idx}
					color={color}
					numbered={true}
					layout='stacked'
					{...item}
				/>
			))}
		</Grid>
	)
}

const ItemsOffset = ({
	items,
	cols,
	color,
	numbered,
	...contentProps
}) => {
	return (
		<Grid
			cols={3}
			gap='2xl'
			className='border-indigo-600 max-md:border-t max-md:pt-12'
		>
			<dd className='3xl:-ml-fluid-x'>
				<Prose
					{...contentProps}
					as={{ subtitle: 'h6' }}
					className={{ title: 'd2 text-indigo-25' }}
				/>
			</dd>
			{items.map((item, idx) => (
				<Item
					key={kn(item)}
					idx={idx}
					color={color}
					numbered={numbered}
					layout='offset'
					{...item}
				/>
			))}
		</Grid>
	)
}

const Item = ({
	img,
	color,
	numbered,
	idx,
	layout,
	...contentProps
}) => {
	return (
		<dd
			className={cn(
				'relative max-w-lg md:mx-auto',

				layout === 'stacked' &&
					cn(
						'py-fluid-x',
						'first:pt-0',
						'border-b',
						'last:border-none',
						colorShift(bgColor(color), -4, 'border'),
					),
			)}
		>
			<ItemNumber
				as='h6'
				idx={idx}
				color={color}
				numbered={numbered}
				className='absolute -top-6 left-0 lg:-left-8 lg:top-[0.25em] 3xl:-left-16'
			/>
			<Prose
				as={{ title: 'h4' }}
				gap={{ prose: 'md', lead: '3xs' }}
				className={{ title: '__sm' }}
				{...contentProps}
			/>
		</dd>
	)
}

export { CollectionSticky }
