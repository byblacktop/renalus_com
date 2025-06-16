import { Lead } from '@/components/Content'
import { ButtonGroup, Flex } from '@/components/UI'
import { getTheme } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const getProse = ({ title, subtitle, body, group }) => {
	if (group === 'Title')
		return [
			{
				title,
				subtitle: body,
				prose: true,
				layout: 'stack',
			},
			{
				title: subtitle,
				subtitle: null,
			},
		]

	if (group === 'Body')
		return [
			{
				title,
				subtitle,
				layout: 'reverse',
			},
			{
				title: null,
				subtitle: body,
			},
		]

	return [
		{
			title,
		},
		{
			title: subtitle,
			subtitle: body,
		},
	]
}

const ProseSplit = ({
	as,
	// title,
	// subtitle,
	// body,
	color,
	position,
	group,
	links,
	align = 'start',
	accent = false,
	children,
	className,
	...contentProps
}) => {
	const subtitleClass = cn(
		'__label __brief __xs',
		getTheme(color).accent ??
			(getTheme(color).isDark ? 'text-indigo-100' : ''),
		cp(className, 'subtitle'),
	)

	const [lead, body] = getProse({ ...contentProps, group })

	return (
		<Flex
			gap='lg'
			align={align}
			layout={position === 'Right' ? 'reverse' : undefined}
			className={cn(
				'gap-2 md:gap-4',
				'max-sm:flex-col',
				position === 'Right' && 'lg:flex-row-reverse',
				cp(className, 'prose', true),
			)}
		>
			<Lead
				{...lead}
				gap='sm'
				as={{ ...as, subtitle: as?.body }}
				className={{
					lead: cn(
						'flex-1 grow-6 text-balance',
						cp(className, 'lead'),
					),
					title: cp(className, 'title'),
					subtitle: group === 'Body' ? subtitleClass : null,
				}}
			>
				<ButtonGroup
					links={links}
					color={['highlight', 'primary']}
					variant={['solid', 'stroke']}
					arrow={[
						{
							direction: 'upRight',
						},
					]}
				/>
			</Lead>

			<Lead
				{...body}
				layout='stack'
				gap='sm'
				wrap={true}
				as={{ title: as?.subtitle, subtitle: as?.body }}
				className={{
					lead: cn('flex-1 grow-4'),
					title: cn(
						subtitleClass,
						position === 'Right' &&
							group === 'Title' &&
							'place-self-end',
					),
					subtitle: cp(className, 'body'),
				}}
			>
				{accent && (
					<div className='max-sm:hidden w-20 h-1 bg-indigo-400' />
				)}
				{children}
			</Lead>
		</Flex>
	)
}

export { ProseSplit }
