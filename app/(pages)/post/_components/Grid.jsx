import { CardArticle } from '@/components/Card'
import { Grid } from '@/components/UI'
import { formattedDate } from '@/lib/helpers'
import { kn } from '@/lib/utils'

const PostGrid = ({ results, cols = 3 }) => {
	return (
		<Grid
			pack
			cols={cols}
			className='gap-y-8 md:gap-y-12 xl:gap-y-16'
		>
			{results.map(r => (
				<CardArticle
					key={kn(r)}
					subtitle={formattedDate(r.date)}
					{...r}
				/>
			))}
		</Grid>
	)
}

export { PostGrid }
