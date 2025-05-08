import { asText } from '@prismicio/client'
import { cva } from 'cva'

import { LinkShell } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { ButtonGroup, GridItem } from '@/components/UI'
import { getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import DataIcon from '@/public/icons/data.svg'

const getBG = idx => 'yellow'
// gsap.utils.wrap(['yellow', 'green', 'orange'], idx)

const variants = cva('relative grid gap-4 md:gap-6 xl:gap-8', {
	variants: {
		cols: {
			1: 'grid-cols-1',
			2: 'grid-cols-2',
			3: 'grid-cols-2 lg:grid-cols-3',
			4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
			5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
			6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
		},
	},
})

const linkPosition = cva('', {
	variants: {
		cols: {
			2: 'col-start-2',
			3: 'col-start-3',
			4: 'col-start-4',
			5: 'col-start-5',
			6: 'col-start-6',
		},
	},
})

const IconBoxes = ({
	items = [],
	cols = 3,
	links = [],
	className,
}) => (
	<dl className={cn(variants({ cols }), className)}>
		{items?.map((item, i) => (
			<BoxItem
				key={asText(item.title)}
				className={cn(getTheme(getBG(i)).className)}
				{...item}
			/>
		))}

		<ButtonGroup
			as='dd'
			links={links}
			variants={['solid', 'stroke']}
			arrow={true}
			justify='right'
			className={cn('items-start', linkPosition({ cols }))}
		/>
	</dl>
)

export const BoxItem = ({
	title,
	body,
	img,
	link,
	className,
	children,
}) => {
	return (
		<LinkShell
			link={link}
			className={cn('rounded-lg overflow-hidden', className)}
		>
			<div className='max-w-xs p-2 md:p-3 xl:p-4 flex gap-4'>
				<DataIcon className='w-10 h-10 md:w-12 md:h-12' />

				<Lead title={title} subtitle={body} className='__sm' />
			</div>

			{children}
		</LinkShell>
	)
}

export { IconBoxes }
