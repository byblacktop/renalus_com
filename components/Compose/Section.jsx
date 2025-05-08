import { forwardRef } from 'react'

import { Container } from '@/components/Compose'
import { cp } from '@/lib/utils'

const Section = ({ container = false, ...props }) => {
	return container ? <Segment {...props} /> : <section {...props} />
}

const Segment = forwardRef(
	({ children, className, dataset, ...props }, ref) => (
		<section
			ref={ref}
			className={cp(className, 'section', true)}
			{...dataset}
		>
			<Container className={cp(className, 'container')} {...props}>
				{children}
			</Container>
		</section>
	),
)

export { Section }
