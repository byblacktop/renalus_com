import { Container, Section } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { Aside } from './Aside'

const Hero = ({ title, subtitle, ...asideProps }) => (
	<Section className='__hero bg-slate-100' data-theme='light'>
		<Container width='xs' className='__xl' gap='base'>
			<Lead
				title={title}
				subtitle={subtitle}
				as={{ subtitle: 'h6' }}
				className={{
					title: 'd2',
					subtitle: '__label __brief __xs',
				}}
			/>

			<div className='w-full h-px bg-slate-200' />

			<Aside {...asideProps} />
		</Container>
	</Section>
)

export { Hero }
