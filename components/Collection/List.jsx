import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { Body, Lead, Prose } from '@/components/Content'
import { getTheme } from '@/lib/helpers'
import { cols, gap, spaceY } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		cols,
		listCols: {
			1: 'columns-1',
			2: 'sm:columns-2',
			3: 'sm:columns-2 md:columns-3',
			4: 'columns-2 md:columns-4',
			5: 'sm:columns-2 md:columns-5',
			6: 'sm:columns-2 md:columns-6',
		},
	},
})

const CollectionList = ({
	items,
	cols,
	color,
	dataset,
	link,
	text,
	...contentProps
}) => {
	return (
		<Section
			container
			layout='grid'
			gap='xl'
			dataset={dataset}
			className={cn(
				'relative z-10 rounded-3xl md:rounded-4xl overflow-hidden',
				'm-4 md:m-6',
				getTheme(color).className,
			)}
		>
			{/* Intro Lead Content */}
			<Prose
				{...contentProps}
				links={[{ link, text }]}
				className={{
					subtitle: '__label __brief __sm',
				}}
			/>

			{/* List Items */}
			<dl
				className={cn(
					'grid grid-cols-1 grid-flow-row-dense',
					variants({ cols }),
					gap.xl,
				)}
			>
				{items.map(item => (
					<dd key={kn(item)} className={cn(spaceY.md)}>
						<Lead
							title={item.title}
							subtitle={item.subtitle}
							subtitleAs='h4'
							subtitleProps={cn(
								getTheme(color).isDark
									? 'text-indigo-600'
									: 'text-indigo-200',
							)}
							titleProps='__xs'
							gap='sm'
							className={cn(
								'pb-4 md:pb-8 mb-4 md:mb-8 border-b',
								getTheme(color).isDark
									? 'border-slate-200/20'
									: 'border-indigo-500/20',
							)}
						/>

						<Body
							body={item.body}
							className={cn(
								'duration-400',
								getTheme(color).isDark
									? 'text-slate-300 hover:text-slate-200'
									: 'text-slate-500 hover:text-slate-700',
							)}
						/>

						<Body
							body={item.list}
							role='list'
							className={cn(
								'__lsit',
								variants({ listCols: item.cols }),
								gap.base,
							)}
						/>
					</dd>
				))}
			</dl>
		</Section>
	)
}

export { CollectionList }
