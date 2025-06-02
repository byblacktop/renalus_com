import { Suspense } from 'react'

import { Shell } from '@/components/Compose'
import { LoadingDots } from '@/components/UI'
import { PostGrid } from '@/article/Grid'
import { PostHighlights } from '@/article/Highlights'
import { List } from '@/location/List'
import { TeamCards } from '@/team/Grid'
import { DynamicItems } from './Dynamic'

const layouts = {
	location: List,
	post: PostHighlights,
	team: TeamCards,
	articles: PostGrid,
}

const DynamicFeed = ({ type, filter, qry, layout, ...props }) => {
	return (
		<Suspense fallback={<LoadingDots />}>
			<DynamicItems type={type} filter={filter} qry={qry}>
				{({ results }) => (
					<Shell
						as={layouts[layout || type]}
						results={results}
						{...props}
					/>
				)}
			</DynamicItems>
		</Suspense>
	)
}

export { DynamicFeed }
