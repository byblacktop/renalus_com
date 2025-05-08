import { Section } from '@/components/Compose'
import { Body as Content } from '@/components/Content'
import { cn } from '@/lib/utils'
import { Aside } from './Aside'
import { Gallery } from './Gallery'

const Body = ({ body, imgs, ...asideProps }) => {
	return (
		<Section
			container
			width='sm'
			className={{ container: '__article __xs' }}
		>
			<div
				className={cn(
					'flex max-lg:flex-col justify-between',
					'gap-16',
					' __2xl',
				)}
			>
				<div className='w-full max-w-2xl space-y-14'>
					<Content body={body} />

					<Gallery imgs={imgs} />
				</div>

				<div className='w-full max-w-sm flex flex-col max-lg:gap-4'>
					<Aside {...asideProps} />
				</div>
			</div>
		</Section>
	)
}

export { Body }
