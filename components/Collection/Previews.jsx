import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { Body, Lead, Prose, ProseSplit } from '@/components/Content'
import { Flex, TogglePreview } from '@/components/UI'
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

const CollectionPreviews = ({
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
			layout='stack'
			gap='xl'
			dataset={dataset}
			className={cn(
				'relative z-10 rounded-4xl overflow-hidden',
				'm-4 md:m-6',
				getTheme(color).className,
			)}
		>
			{/* Intro Lead Content */}
			<ProseSplit align='end' {...contentProps} />

			{/* List Items */}
			<dl
				className={cn(
					'grid grid-cols-1 grid-flow-row-dense',
					variants({ cols }),
					gap.lg,
				)}
			>
				{items.map(({ list, cols, ...contentProps }) => (
					<dd
						key={kn(contentProps)}
						className='pt-8 border-t border-indigo/20'
					>
						<Flex align='start'>
							<Prose wrap {...contentProps} className='w-1/5' />

							<TogglePreview className='grow'>
								<Body
									body={list}
									className={cn(variants({ listCols: cols }), gap.sm)}
								/>
							</TogglePreview>
						</Flex>
					</dd>
				))}
			</dl>
		</Section>
	)
}

export { CollectionPreviews }
