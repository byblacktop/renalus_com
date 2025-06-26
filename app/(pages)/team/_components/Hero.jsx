import { Suspense } from 'react'

import { Container, Section } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Backdrop, Button, Flex } from '@/components/UI'
import { gap } from '@/lib/tw'
import { cn } from '@/lib/utils'
import { Contact } from '@/team/Contact'
import { Controls } from '@/team/Controls'

const Hero = ({
	img,
	name,
	team,
	degree,
	locations,
	priority,
	children,
}) => {
	return (
		<>
			<Section className='__hero' data-theme='dark'>
				<Container
					as='div'
					gap='none'
					className={cn(
						'md:grid-cols-12 overflow-clip',
						'max-lg:gap-x-4 max-lg:gap-y-10',
					)}
				>
					{/* 4 Cols Image */}
					<Avatar img={img} />

					{/* 7 Cols */}
					<div className='md:col-span-8 lg:col-span-7 md:px-4 xl:px-8'>
						<div className='__xs flex flex-col gap-2 lg:pt-fluid lg:h-[330px]'>
							{/* Name */}
							<Flex layout='reverse' gap='xl' className=''>
								<h1 className='flex gap-1.5 items-center leading-none text-indigo-50'>
									<span>{name}</span>
									{degree && (
										<span className='text-red-400/80 fs-3xl font-main font-medium'>
											{degree}
										</span>
									)}
								</h1>

								<h6 className='__label text-blue-300'>
									Meet the Doctor
								</h6>
							</Flex>

							{/* Titles */}
							<Contact locations={locations} />
						</div>

						{children}
					</div>

					{/* 1 Col */}
					<Suspense>
						<Controls priority={priority} team={team} />
					</Suspense>
				</Container>

				{/* Backdrop -- Large screen */}
				<Backdrop
					layer
					color='indigo 900'
					className='h-[545px] overflow-hidden'
				/>
			</Section>
		</>
	)
}

const Avatar = ({ img }) => (
	<div className='relative md:col-span-4 max-md:pt-6'>
		<div
			className={cn(
				'relative z-2 md:sticky md:top-24',
				'md:pt-0 md:pb-16',
				'max-w-2xs md:max-w-96',
				'flex flex-col items-center',
				gap.md,
			)}
		>
			<AspectImage
				priority
				img={img}
				className={{
					figure: 'md:aspect-w-3 md:aspect-h-4',
					img: 'rounded-full md:rounded-xl',
				}}
			/>

			<Button
				link={{ href: '/team', text: 'Back to Team' }}
				variant='flat'
				size='sm'
				className='__label'
				arrow={{
					direction: 'left',
					size: 'lg',
					variant: 'long',
					className: '-order-1',
				}}
			/>
		</div>
	</div>
)

export { Hero }
