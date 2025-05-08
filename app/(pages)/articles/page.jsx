import { filter } from '@prismicio/client'

import { Section } from '@/components/Compose'
import { getLatestDoc } from '@/lib/api'
import { DynamicFeed } from '@/app/_components/Feed'
import { FeaturedArticle } from '@/posts//Featured'

const Articles = async () => {
	const featured = await getLatestDoc('post', 'articles')

	return (
		<>
			{/* Hero — Featured Post */}
			<FeaturedArticle
				subtitle='Latest Renalus Posts'
				color='stone-200'
				{...featured}
			/>

			{/* Articles — Post Grid */}
			<Section container>
				<DynamicFeed
					type='post'
					layout='articles'
					filter='articles'
					qry={{ filters: [filter.not('document.id', featured.id)] }}
				/>
			</Section>
		</>
	)
}

export default Articles
