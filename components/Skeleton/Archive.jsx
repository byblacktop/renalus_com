import { Container, Shell } from '@/components/Compose'
import { Skeleton } from '@/components/Skeleton'
import { cn } from '@/lib/utils'

const ArchiveSkeleton = ({
	rows = 3,
	cols = 4,
	container = true,
}) => (
	<Shell
		as={container ? Section : 'div'}
		className={cn(
			'grid grid-cols-2 gap-4 lg:gap-8',
			cols > 2 && `md:grid-cols-${cols}`,
		)}
	>
		<>
			{Array(rows * cols)
				.fill('_')
				.map((_, i) => (
					<article
						key={i}
						className={cn(
							'grid gap-1',
							cols > 2 && `md:col-span${12 / cols}`,
						)}
					>
						<Skeleton className='aspect-square w-full' />
						<Skeleton className='w-3/4 pb-8' />
					</article>
				))}
		</>
	</Shell>
)

const Section = ({ children, className }) => (
	<section>
		<Container className={className}>{children}</Container>
	</section>
)

export { ArchiveSkeleton }
