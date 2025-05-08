import { Button } from '@/components/UI'

const Submit = ({ ...atts }) => (
	<Button as='button' type='submit' name='submit' {...atts} />
)

export { Submit }
