import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { EmailForm } from '@/components/Form'
import { Button, Flex, Grid } from '@/components/UI'
import { contact } from '@/lib/forms'
import { invalidArrObjectData } from '@/lib/helpers'
import { gap } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const arrows = {
	default: {
		default: true,
	},
	scroll: {
		direction: 'down',
	},
}

const Contact = ({ items, ...contentProps }) => {
	return (
		<Section className='__hero'>
			{/* Intro Content */}
			<Container width='xs'>
				<Flex gap={0} className='divide-x divide-slate-400/50'>
					<div className='max-w-2xl md:pr-16'>
						<Prose
							leadProps={{ layout: 'reverse' }}
							{...contentProps}
						/>
					</div>

					{/* Separator */}
					{/* <div className='w-full h-px bg-slate-400/50' /> */}

					<Flex layout='stack' gap='base' className='md:pl-16'>
						{items.map((item, i) => (
							<ContactInfo
								key={kn(item)}
								arrow={{
									default: true,
								}}
								{...item}
							/>
						))}
					</Flex>
				</Flex>
			</Container>
		</Section>
	)
}

const ContactInfo = ({ links, title, arrow }) => {
	// if (invalidArrObjectData(links)) return

	return (
		<Flex layout='stack' gap='3xs'>
			<h6 className='__label __xs text-slate/70'>{title}</h6>

			{links?.map((link, i) => (
				<div key={kn(link)}>
					{/* <pre>{JSON.stringify(link, null, 2)}</pre> */}
					{link.url ? (
						<Button link={link} variant='stroke' arrow={arrow} />
					) : (
						<span className='btn btn-stroke btn-primary'>
							{link.text}
						</span>
					)}
				</div>
			))}
		</Flex>
	)
}

export { Contact }
