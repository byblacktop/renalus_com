import { CoverImage } from '@/components/Media'
import { Grid } from '@/components/UI'
import { invalidArr } from '@/lib/helpers'
import { kn } from '@/lib/utils'
import { LocationCard } from './Card'

const List = ({ results, img }) => {
	return (
		<Grid cols={2} gap='lg' className='items-start'>
			<Locations locations={results} />

			<div className='relative h-full'>
				<CoverImage
					img={img}
					className='rounded-xl overflow-hidden'
				/>
			</div>
		</Grid>
	)
}

const Locations = ({ locations = [] }) => {
	if (invalidArr(locations)) return

	return (
		<Grid cols={1} gap='0'>
			{locations?.map(r => (
				<LocationCard key={kn(r)} {...r} />
			))}
		</Grid>
	)
}

export { List, Locations }
