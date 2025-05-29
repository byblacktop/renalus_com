import { Skeleton } from '@/components/Skeleton'

const FormSkeleton = () => {
	return (
		<div className='grid grid-cols-1 gap-3 lg:gap-6'>
			<div className='grid grid-cols-1 gap-2 lg:gap-4'>
				<Skeleton className='h-8 w-full rounded-lg lg:h-14' />
				<Skeleton className='h-8 w-full rounded-lg lg:h-14' />
				<div className='grid grid-cols-2 gap-3 lg:gap-6'>
					<Skeleton className='h-8 w-full rounded-lg lg:h-14' />
					<Skeleton className='h-8 w-full rounded-lg lg:h-14' />
					<div />
					<Skeleton className='h-8 w-full rounded-full lg:h-14' />
				</div>
			</div>
		</div>
	)
}

export { FormSkeleton }
