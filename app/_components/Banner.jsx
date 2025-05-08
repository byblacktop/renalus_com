// import { Transition } from '@headlessui/react'

import { Show } from '@/components/Interactive'
import { Button, Flex } from '@/components/UI'
import { cn } from '@/lib/utils'

const Banner = () => {
	return (
		<Show
			initial={true}
			as='section'
			align='center'
			className={cn(
				'__banner relative isolate sm:before:flex-1',
				'flex align-center',
				'px-3',
				'overflow-hidden bg-green-200/50',
				'transition-all duration-500 ease-in-out-intro',
				'data-[closed]:opacity-0 data-[open]:opacity-100',
				'h-20 data-[closed]:h-0',
			)}
		>
			<Flex align='center' wrap className='pb-8'>
				<p className='__sm'>
					<strong>Now Open in Navarre! </strong>
					Our newest location is ready for business.
				</p>
				<Button
					link={{
						href: '/location/navarre',
						text: 'View Location',
					}}
					size='xs'
					// variant='outline'
					color='highlight'
					arrow={{
						direction: 'upRight',
						size: 'sm',
					}}
				/>
			</Flex>

			{/* Gradient backdrop */}
			<Burst className='left-[max(-7rem,calc(50%-52rem))]' />
			<Burst className='left-[max(45rem,calc(50%+8rem))]' />
		</Show>
	)
}

const Burst = ({ className }) => {
	return (
		<div
			aria-hidden='true'
			className={cn(
				'absolute top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl',
				className,
			)}
		>
			<div
				style={{
					clipPath:
						'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
				}}
				className='aspect-1 w-xl bg-gradient-to-r from-yellow via-green to-blue-300 opacity-50'
			/>
		</div>
	)
}

export { Banner }
