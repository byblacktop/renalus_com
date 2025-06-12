import { getDoc } from '@/lib/api'
import { validArrObjectData } from '@/lib/helpers'
import { Bio } from '@/team/Bio'
import { Hero } from '@/team/Hero'

const Team = async ({ params }) => {
	const { uid } = await params
	const team = await getDoc('team', uid)

	const { bio, affiliations, ...props } = team

	return (
		<>
			<Hero {...props}>
				<Bio bio={bio} affiliations={affiliations} />
			</Hero>
		</>
	)
}

export default Team
