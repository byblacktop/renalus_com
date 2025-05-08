import { Grid } from '@/components/UI'

const LocationGrid = ({ results }) => {
	return (
		<Grid>
			{results.map(result => (
				<Item key={result.id} item={result} />
			))}
		</Grid>
	)
}

const Item = ({ item }) => {
	return <div>{item.title}</div>
}

export { LocationGrid }
