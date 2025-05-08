import { getDoc } from '@/lib/api'
import { validArrObjectData } from '@/lib/helpers'
import { Bio } from '@/team/Bio'
import { Hero } from '@/team/Hero'

const Team = async ({ params }) => {
	const { uid } = await params
	const team = await getDoc('team', uid)

	const { start, education, bio, specialties, media, ...props } = team

	return (
		<>
			<Hero {...props}>
				<Bio
					start={start}
					education={education}
					specialties={specialties}
					media={validArrObjectData(media) ? media[0] : null}
					bio={bio}
				/>
			</Hero>
		</>
	)
}

export default Team
