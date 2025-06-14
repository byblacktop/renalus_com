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
			subtitle: body,
			title: subtitle,
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
		'__label',
		getTheme(color).accent ??
			(getTheme(color).isDark ? 'text-blue-300' : 'text-indigo'),
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
				// title={title}
				// subtitle={
				// 	group === 'Title'
				// 		? body
				// 		: group === 'Body'
				// 			? subtitle
				// 			: null
				// }
				// prose={group === 'Title'}
				// layout={group === 'Body' ? 'reverse' : 'stack'}
				{...lead}
				gap='sm'
				as={{ ...as, subtitle: as?.body }}
				className={{
					lead: cn(
						'flex-1 grow-6 text-pretty',
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
				// title={group !== 'Body' ? contentProps.subtitle : null}
				// subtitle={group !== 'Title' ? contentProps.body : null}
				{...body}
				layout='stack'
				gap='sm'
				wrap={true}
				as={{ title: as?.subtitle, subtitle: as?.body }}
				className={{
					lead: cn('flex-1 grow-4 __sm', cp(className, 'body')),
					title: cn(
						subtitleClass,
						position === 'Right' &&
							group === 'Title' &&
							'place-self-end',
					),
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
