import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { Body, Lead, Prose } from '@/components/Content'
import { getTheme } from '@/lib/helpers'
import { cols, gap } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		cols,
	},
})

const CollectionColumns = ({
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
			className={cn(
				'relative z-10 rounded-4xl overflow-hidden',
				'm-4 md:m-6 mb-0 md:mb-0',
				getTheme(color).className,
			)}
			{...dataset}
		>
			<Container layout='grid' gap='base' className={cn()}>
				<Prose
					{...contentProps}
					links={[{ link, text }]}
					className={{
						subtitle: '__label __brief __sm',
					}}
				/>
				<dl
					className={cn(
						'grid grid-flow-row-dense',
						'py-fluid __xs pb-0',
						variants({ cols }),
						gap.xl,
					)}
				>
					{items.map(item => (
						<dd key={kn(item)}>
							<Lead
								title={item.title}
								subtitle={item.subtitle}
								subtitleAs='h4'
								subtitleProps='text-green-600'
								titleProps='__xs'
								gap='sm'
								className='pb-4 md:pb-8 mb-4 md:mb-8 border-b border-indigo/20'
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
						</dd>
					))}
				</dl>
			</Container>
		</Section>
	)
}

export { CollectionColumns }
