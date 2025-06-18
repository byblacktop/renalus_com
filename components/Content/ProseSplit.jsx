import { Lead } from '@/components/Content'
import { ButtonGroup, Flex } from '@/components/UI'
import { getTheme, invalidContent } from '@/lib/helpers'
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

const getGrowClass = ({ body, group, accent }) => {
	if (invalidContent(body)) return ['grow-6', 'grow-4']

	if (group === 'Title') return ['grow-6 shrink-0', 'grow-1']

	const grow = accent ? false : body.length > 1 || group === 'Body'

	return grow ? ['grow-4', 'grow-6'] : ['grow-6', 'grow-1']
}

const ProseSplit = ({
	as,
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
			(getTheme(color).isDark ? 'text-blue-200' : 'text-blue-800'),
		cp(className, 'subtitle'),
	)

	const growClass = getGrowClass({ ...contentProps, group, accent })

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
				as={{
					...as,
					subtitle: group === 'Body' ? as?.subtitle : as?.body,
				}}
				className={{
					lead: cn('flex-1', growClass[0], cp(className, 'lead')),
					title: cn(cp(className, 'title')),
					subtitle: cn(
						group === 'Title' && 'text-pretty',
						group === 'Body'
							? subtitleClass
							: group === 'Title'
								? '__sm'
								: null,
					),
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
					lead: cn('flex-1', growClass[1]),
					title: cn(
						subtitleClass,
						position === 'Right' &&
							group === 'Title' &&
							'place-self-end',
					),
					subtitle: cn('__sm', cp(className, 'body')),
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

// const ProseSplit = ({
// 	as,
// 	title,
// 	subtitle,
// 	body,
// 	color,
// 	position,
// 	group,
// 	links,
// 	align = 'start',
// 	accent = false,
// 	children,
// 	className,
// }) => (
// 	<Flex
// 		gap='lg'
// 		align={align}
// 		layout={position === 'Right' ? 'reverse' : undefined}
// 		className={cn(
// 			'gap-2 md:gap-4',
// 			'max-sm:flex-col',
// 			position === 'Right' && 'lg:flex-row-reverse',
// 			cp(className, 'prose', true),
// 		)}
// 	>
// 		<Lead
// 			title={title}
// 			subtitle={group === 'Title' ? body : null}
// 			prose={group === 'Title'}
// 			layout='stack'
// 			gap='sm'
// 			as={{ ...as, subtitle: as?.body }}
// 			className={{
// 				lead: cn('flex-1 grow-6 text-pretty', cp(className, 'lead')),
// 				title: cp(className, 'title'),
// 			}}
// 		>
// 			<ButtonGroup
// 				links={links}
// 				color={['highlight', 'primary']}
// 				variant={['solid', 'stroke']}
// 				arrow={[
// 					{
// 						direction: 'upRight',
// 					},
// 				]}
// 			/>
// 		</Lead>

// 		<Lead
// 			title={subtitle}
// 			subtitle={group !== 'Title' ? body : null}
// 			layout='stack'
// 			gap='sm'
// 			wrap={true}
// 			as={{ title: as?.subtitle, subtitle: as?.body }}
// 			className={{
// 				lead: cn('flex-1 grow-4 __sm', cp(className, 'body')),
// 				title: cn(
// 					position === 'Right' &&
// 						group === 'Title' &&
// 						'place-self-end',
// 					getTheme(color).isDark ? 'text-blue-100' : 'text-blue',
// 					cp(className, 'subtitle'),
// 				),
// 			}}
// 		>
// 			{accent && (
// 				<div className='max-sm:hidden w-20 h-1 bg-yellow-200' />
// 			)}
// 			{children}
// 		</Lead>
// 	</Flex>
// )

export { ProseSplit }
