import { cva } from 'cva'

import { CardArticle, CardUtility } from '@/components/Card'
import { Shell } from '@/components/Compose'
import { Grid } from '@/components/UI'
import { formattedDate } from '@/lib/helpers'
import { gap } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const layouts = {
	default: CardArticle,
	location: CardUtility,
}

const variants = cva('', {
	variants: {
		type: {
			default: 'gap-y-8 md:gap-y-12 xl:gap-y-16',
			location: cn('__light', gap.md),
		},
	},

	defaultVariants: {
		type: 'default',
	},
})

const PostGrid = ({ results, type, cols = 3, ...props }) => {
	return (
		<Grid pack cols={cols} className={variants({ type })}>
			{results.map(r => (
				<Shell
					key={kn(r)}
					as={layouts[type] ?? layouts.default}
					subtitle={formattedDate(r.date)}
					type={type}
					{...r}
				/>
			))}
		</Grid>
	)
}

export { PostGrid }
