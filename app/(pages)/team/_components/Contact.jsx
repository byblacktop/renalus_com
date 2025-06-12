import { PrismicLink } from '@prismicio/react'

import { Flex } from '@/components/UI'
import { unslug } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const Contact = ({ locations = [] }) => {
	return (
		<Flex gap='xs'>
			{locations.map(({ location }, idx) => (
				<Location
					key={kn(location)}
					location={location}
					sep={!!idx}
				/>
			))}
		</Flex>
	)
}

const Location = ({ location, sep }) => {
	return (
		<>
			{!!sep && (
				<span className='fs-xs leading-none text-blue-500'>•</span>
			)}
			<PrismicLink
				field={location}
				className={cn(
					'block fs-3xs leading-none',
					'text-blue-300 hover:text-blue-200',
				)}
			>
				{unslug(location.uid)}
			</PrismicLink>
		</>
	)
}

export { Contact }
