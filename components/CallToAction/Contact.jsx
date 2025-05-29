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
			<Container>
				<Grid cols={2} gap='2xl'>
					<div className='max-w-lg mx-auto'>
						<Prose
							leadProps={{ layout: 'reverse' }}
							{...contentProps}
						/>
						{/* Separator */}
						<div className='col-span-12 h-px border-b border-500/20 mb-8 md:mb-10 pb-8 md:pb-10' />

						<div className={cn('grid', gap.prose)}>
							{items.map((item, i) => (
								<ContactInfo
									key={kn(item)}
									arrow={
										i === items.length - 1
											? arrows.scroll
											: arrows.default
									}
									{...item}
								/>
							))}
						</div>
					</div>

					<div className='max-w-xl bg-slate-100 rounded-xl overflow-hidden'>
						<EmailForm
							cols={1}
							className='p-8 md:p-12 h-full'
							{...contact}
						/>
					</div>
				</Grid>
			</Container>
		</Section>
	)
}

const ContactInfo = ({ links, title, arrow }) => {
	if (invalidArrObjectData(links)) return

	return (
		<Flex layout='stack' gap='3xs'>
			<h6 className='__label __xs text-slate/70'>{title}</h6>

			{links.map((link, i) => (
				<div key={kn(link)}>
					<Button link={link} variant='stroke' arrow={arrow} />
				</div>
			))}
		</Flex>
	)
}

export { Contact }
