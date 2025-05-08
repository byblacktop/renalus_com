'use client'

import { useState } from 'react'

import { Button } from '@/components/UI'
import { cn } from '@/lib/utils'

const TogglePreview = ({ children, className }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={cn('relative', className)}>
			<div
				className={cn(
					'overflow-hidden pb-12',
					'transition-all duration-700 ease-in-out',
					isOpen ? 'max-h-screen' : 'max-h-36',
				)}
			>
				{children}
			</div>

			<div
				className={cn(
					'absolute bottom-0 z-2',
					'w-full text-center pt-18',
					isOpen && 'pointer-events-none',
					!isOpen &&
						'bg-gradient-to-t from-steel-100/100 via-steel-100/80 to-steel-100/0',
				)}
			>
				<Button
					onClick={() => setIsOpen(!isOpen)}
					as='button'
					variant='outline'
					size='xs'
					link={{ text: isOpen ? 'See Less -' : 'See All +' }}
					className='pointer-events-auto'
				/>
			</div>
		</div>
	)
}

export { TogglePreview }
