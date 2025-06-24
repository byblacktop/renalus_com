import { Container, Section, Shell } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { DynamicFeed } from '@/components/Feed'
import { Backdrop, ButtonGroup } from '@/components/UI'
import {
	bgColor,
	getTheme,
	invalidArrObjectData,
	singularize,
	validArrObjectData,
	validString,
} from '@/lib/helpers'
import { spaceY } from '@/lib/tw'
import { cn, getSliceData, resolveProps } from '@/lib/utils'
import { TeamGrid } from '@/team/Grid'

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
	const { dataset, ...props } = getSliceData(
		slice_type,
		variation,
		primary?.color,
	)

	console.log(dataset)

	if (variation === 'team')
		return <TeamGrid dataset={dataset} {...primary} />

	const type = getType(primary?.feed)
	const links = [primary?.links].flat()

	return (
		<Section
			dataset={dataset}
			className={cn(
				getTheme(primary?.color).isDark ? '__dark' : '',
				'relative z-10 rounded-3xl md:rounded-4xl overflow-hidden',
				'm-4 md:m-6',
				bgColor(primary?.color),
			)}
			{...props}
		>
			<Container gap='prose'>
				<ProseSplit
					position='Right'
					color={primary?.color}
					className={{
						prose: getTheme(primary?.color).isDark
							? 'text-white'
							: '',
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
					<DynamicFeed
						variation={variation}
						type={type}
						img={primary?.img}
						qry={qry[type]}
						{...primary}
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
		</Section>
	)
}

export default Feed
