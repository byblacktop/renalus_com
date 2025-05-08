import { AspectImage } from '@/components/Media'
import { Grid } from '@/components/UI'
import { kn } from '@/lib/utils'

const CollectionResults = ({ items, cols }) => {
	return (
		<Grid pack cols={cols} gap='sm' className='items-start'>
			{items.map(({ img, tags }) => {
				return <Item key={kn(img)} img={img} tags={tags} />
			})}
		</Grid>
	)
}

const Item = ({ img, tags }) => {
	return (
		<dd>
			<AspectImage
				w={1}
				h={1}
				img={img}
				className='rounded-xl overflow-hidden'
				data-tags={tags}
			/>
		</dd>
	)
}

export { CollectionResults }
