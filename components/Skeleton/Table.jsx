import { Shell } from '@/components/Compose'
import { Skeleton } from '@/components/Skeleton'

const TableSkeleton = ({ rows = 10, section = false }) => (
	<Shell as={section && 'section'}>
		<div className='flex w-full flex-col gap-2'>
			{Array(rows)
				.fill('_')
				.map((_, i) => (
					<article key={i} className='flex w-full gap-2'>
						<Skeleton className='w-1/2 pb-6' />
						<Skeleton className='w-1/4 pb-6' />
						<Skeleton className='w-1/4 pb-6' />
					</article>
				))}
		</div>
	</Shell>
)

export { TableSkeleton }
