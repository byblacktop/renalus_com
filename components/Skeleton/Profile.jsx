import { Container } from '@/components/Compose'
import { Skeleton } from '@/components/Skeleton'

const ProfileSkeleton = () => {
	return (
		<section>
			<Container>
				<div className='grid grid-cols-3 gap-4 lg:gap-8'>
					<div>
						<div className='w-full max-w-xs'>
							<figure className='aspect-w-1 aspect-h-1 overflow-hidden rounded-full'>
								<Skeleton />
							</figure>
						</div>
					</div>
					<div className='col-span-2 grid grid-cols-1 gap-2 lg:gap-4'>
						<Skeleton className='w-8/12' />
						<Skeleton />
						<Skeleton />
						<div className='grid grid-cols-3 gap-4 lg:gap-8'>
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}

export { ProfileSkeleton }
