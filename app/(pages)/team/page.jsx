import { Section } from '@/components/Compose'
import { AspectImage } from '@/components/Media'
import { Grid } from '@/components/UI'
import { getDocs } from '@/lib/api'
import { normalizeDoc } from '@/lib/helpers'

const TeamPage = async () => {
	const team = await getDocs('team', {
		orderings: [
			{
				field: 'my.team.priority',
				direction: 'asc',
			},
		],
		// fetchLinks: ['my.team.locations.location.title'],
		graphQuery: `{
			team {
				...teamFields
				locations {
					location {
						uid
						title
					}
				}
			}
		}`,
	}).then(r =>
		r.map(item => ({
			...item,
			locations: item.locations.map(l => normalizeDoc(l.location)),
		})),
	)

	return (
		<Section container>
			<Grid>
				{team.map(item => (
					<div key={item.id}>
						<AspectImage img={item.img} w={1} h={1} />
						<h4>
							{item.name} {item.degree}
						</h4>
						<pre>{JSON.stringify(item, null, 2)}</pre>
						{/* <p>
							{item.locations
								.map(location => location.uid)
								.join(' • ')}
						</p> */}
					</div>
				))}
			</Grid>
		</Section>
	)
}

export default TeamPage
