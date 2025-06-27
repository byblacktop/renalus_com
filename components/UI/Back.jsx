'use client'

// TODO: See why this throws errors on not-found
import { useRouter } from 'next/navigation'

import { Button } from '@/components/UI'

// TODO: Review const vs function on Next.js update after 13.5.3
// Ref: https://github.com/vercel/next.js/issues/46734#issuecomment-1691214107
const Back = () => {
	// TODO: Assign better back propery with router
	const router = useRouter()

	return (
		<Button
			as='button'
			text='Go Back'
			arrow={{
				direction: 'left',
				variant: 'long',
				size: 'lg',
				className: '-order-1',
			}}
			onClick={() => router.back()}
		/>
	)
}

export { Back }
