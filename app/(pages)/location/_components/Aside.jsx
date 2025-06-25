import { Title } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Box, Button, Flex, Grid } from '@/components/UI'
import {
	invalidContent,
	invalidObjectData,
	slugify,
} from '@/lib/helpers'
import { Details, Hours, Info } from './Info'

const Aside = ({ hours, address, phone, faxes }) => (
	<Flex gap='lg' justify='between'>
		<Open hours={hours} />
		<Details title='Contact' icon='phone' data={phone} />

		<Details title='Fax'>
			{faxes.map(f => (
				<Flex key={f.label} layout='stack' gap='2xs'>
					<Info
						icon='fax'
						title={f.number}
						label={f.label}
						size='__sm'
					/>
				</Flex>
			))}
		</Details>
	</Flex>
)

const Open = ({ hours }) => {
	if (invalidObjectData(hours)) return

	return (
		<div className='max-w-2xs space-y-4'>
			<h5 className='__label __sm text-indigo-600'>Hours</h5>
			<Hours hours={hours} />
		</div>
	)
}

export { Aside }
