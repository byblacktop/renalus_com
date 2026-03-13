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
					<strong>Now Open in Freeport! </strong>
					Our newest location is ready for business.
				</p>
				<Button
					link={{
						href: '/location/freeport',
						text: 'View Location',
					}}
					size='xs'
					color='highlight'
					arrow={{
						direction: 'upRight',
						size: 'sm',
					}}
				/>
			</Flex>

			{/* Gradient backdrop */}
			<Burst className='left-[7%] -scale-x-100' />
			<Burst className='right-[7%]' />
		</Show>
	)
}

const Burst = ({ className }) => {
	return (
		<div
			aria-hidden='true'
			className={cn(
				'absolute w-[40%] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl',
				className,
			)}
		>
			<div
				className='aspect-1 bg-gradient-to-r from-blue-200/70 via-red-200 to-green-300/90 opacity-70'
			/>
		</div>
	)
}

export { Banner }
