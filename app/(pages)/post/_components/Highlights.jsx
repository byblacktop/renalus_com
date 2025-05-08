import { CardPoster } from '@/components/Card'
import { Grid } from '@/components/UI'
import { formattedDate } from '@/lib/helpers'
import { kn } from '@/lib/utils'

const PostHighlights = ({ results, cols = 13, featured = true }) => {
	return (
		<Grid cols={cols} className='max-md:cols-12'>
			{results.map(r => (
				<CardPoster
					key={kn(r)}
					featured={featured}
					subtitle={formattedDate(r.date)}
					{...r}
				/>
			))}
		</Grid>
	)
}

export { PostHighlights }
