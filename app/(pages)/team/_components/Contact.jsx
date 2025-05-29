import { Fragment } from 'react'
import { PrismicLink } from '@prismicio/react'

import { Flex } from '@/components/UI'
import { unslug } from '@/lib/helpers'
import { kn } from '@/lib/utils'

const Contact = ({ locations = [] }) => {
	return (
		<div className='grow place-content-center'>
			<Flex gap='sm'>
				{locations.map(({ location }, idx) => (
					<Location
						key={kn(location)}
						location={location}
						sep={!!idx}
					/>
				))}
			</Flex>
		</div>
	)
}

const Location = ({ location, sep }) => {
	return (
		<>
			{!!sep && <span className='fs-3xs text-slate-200'>•</span>}
			<PrismicLink field={location} className='fs-3xs text-slate-200'>
				{unslug(location.uid)}
			</PrismicLink>
		</>
	)
}

export { Contact }
