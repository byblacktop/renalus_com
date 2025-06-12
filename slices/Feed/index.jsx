import { Container, Section, Shell } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { DynamicFeed } from '@/components/Feed'
import { Backdrop, ButtonGroup } from '@/components/UI'
import {
	getTheme,
	invalidArrObjectData,
	singularize,
	validArrObjectData,
	validString,
} from '@/lib/helpers'
import { spaceY } from '@/lib/tw'
import { cn, getSliceData, resolveProps } from '@/lib/utils'
import { TeamGrid } from '@/team/Grid'

const layouts = {
	default: DynamicFeed,
}

const resolver = {
	type: 'post',
}

const getType = feed => {
	if (validString(feed)) return feed

	if (invalidArrObjectData(feed)) return undefined

	if (feed.length === 1) return singularize(feed[0].type)

	return undefined
}

const qry = {
	post: { pageSize: 5 },
}

const Feed = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	const { dataset, ...props } = getSliceData(slice_type, variation)

	if (variation === 'team')
		return <TeamGrid {...dataset} {...primary} />

	const type = getType(primary?.feed)
	const links = [primary?.links].flat()

	return (
		<Section
			className={getTheme(primary?.color).isDark ? '__dark' : ''}
			{...props}
			{...dataset}
		>
			<Container
				gap='prose'
				className={cn('__lg', primary?.color !== 'None' && 'pb-0')}
			>
				<ProseSplit
					position='Right'
					className={{
						lead: 'grow-1',
						body: 'grow-1',
					}}
					{...resolveProps(
						{
							...primary,
							links: type === 'post' ? undefined : links,
						},
						resolver,
					)}
				/>

				<div className={type === 'post' ? spaceY.xs : undefined}>
					<Shell
						as={layouts[type] ?? layouts.default}
						type={type}
						img={primary?.img}
						qry={qry[type]}
						{...context}
					/>

					{type === 'post' && (
						<ButtonGroup
							links={links}
							justify='end'
							color={['highlight', 'primary']}
							variant={['solid', 'stroke']}
							arrow={[
								{
									direction: 'upRight',
								},
							]}
						/>
					)}
				</div>
			</Container>

			<Backdrop
				color={primary?.color}
				offset='boxed'
				className={
					type === 'post' &&
					validArrObjectData(links) &&
					'bottom-12 md:bottom-16 2xl:bottom-24'
				}
			/>
		</Section>
	)
}

export default Feed
