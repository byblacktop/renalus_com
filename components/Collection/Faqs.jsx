import { Section } from '@/components/Compose'
import { Body, ContentSplitProse } from '@/components/Content'
import {
	ButtonGroup,
	ButtonLink,
	Divider,
	Flex,
	Toggle,
} from '@/components/UI'
import {
	hashify,
	invalidArrObjectData,
	invalidObjectData,
	normalizeByField,
	padZero,
	slugify,
} from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CollectionFaqs = ({ items, ...contentProps }) => {
	const groups = normalizeByField(items, 'group')

	return (
		<>
			<ContentSplitProse
				{...contentProps}
				position='Left'
				group='Body'
				align='end'
				className={{ container: '__sm' }}
			/>
			<Section container layout='grid' cols={12} width='sm'>
				<TogglesNav
					groups={groups}
					className='col-span-4 content-start'
				/>

				<ToggleGroups groups={groups} />
			</Section>
		</>
	)
}

const ToggleGroups = ({ groups }) => {
	return (
		<dl
			className={cn(
				'col-span-8',
				'space-y-6 md:space-y-8 xl:space-y-12',
			)}
		>
			{Object.entries(groups).map(([group, items], idx) => (
				<dd key={kn(group)} id={slugify(group)}>
					<ToggleGroupHeader group={group} idx={idx} />

					{items.map(({ title, body, links }, iidx) => (
						<Toggle
							key={kn({ title })}
							title={title}
							subtitle={`${padZero(iidx + 1)}.`}
						>
							<Body
								body={body}
								className={cn(
									'__sm pb-4',
									'*:text-slate group-hover:*:text-indigo',
								)}
							/>
							<ButtonGroup
								links={links}
								size='sm'
								className='pb-6'
								color={['highlight', 'primary']}
								variant={['solid', 'stroke']}
							/>
						</Toggle>
					))}
				</dd>
			))}
		</dl>
	)
}

const ToggleGroupHeader = ({ group, idx }) => {
	return (
		<Flex
			items='center'
			justify='between'
			className={cn('my-2 md:my-3', idx === 0 && 'md:mt-0')}
		>
			<h6 className='__label shrink-0 text-slate'>{group}</h6>
			<Divider color='Slate 200' size='full' className='h-px' />
		</Flex>
	)
}

export const TogglesNav = ({ groups, className }) => {
	if (invalidObjectData(groups)) return null

	const links = Object.keys(groups).map(group => ({
		text: group,
		href: hashify(group),
	}))

	if (invalidArrObjectData(links)) return null

	return (
		<aside className={cn(className)}>
			<Flex
				as='nav'
				layout='stack'
				gap='sm'
				className={cn(
					'sticky top-24',
					'rounded-xl bg-slate-100/70',
					'p-2 md:p-4 xl:p-6',
					className,
				)}
			>
				{links.map((link, idx) => (
					<ButtonLink
						key={kn(link)}
						link={link}
						className='h6 w-max link'
					>
						{link.text}
					</ButtonLink>
				))}
			</Flex>
		</aside>
	)
}

export { CollectionFaqs }
