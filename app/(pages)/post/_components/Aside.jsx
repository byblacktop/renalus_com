import { Box, Flex } from '@/components/UI'

const Aside = ({ links }) => (
	<Flex as='aside' layout='stack' gap='sm'>
		<Box>
			<h4>Links</h4>
		</Box>
		<Box>
			<h4>Categories</h4>
		</Box>
	</Flex>
)

export { Aside }
