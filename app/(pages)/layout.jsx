import { ReactTempus } from 'tempus/react'

import { Footer } from '@/components/Footer'
import { GSAP } from '@/components/Interactive'
import { Header } from '@/components/Nav/Header'
import { Providers } from '@/components/Providers'
import { Lenis } from '@/lib/lenis'

export default function Layout({ children }) {
	return (
		<>
			<Providers>
				<ReactTempus patch />

				{/* Header */}
				<Header />

				{/* Main Page Content */}
				<main className='main'>{children}</main>

				{/* Footer */}
				<Footer />
			</Providers>

			{/* Animations */}
			<GSAP />

			{/* Lenis Smooth Scroll */}
			<Lenis
				root
				// autoRaf={false}
				options={{
					// default lerp 0.1 (0-1 value range)
					// Lower value means less friction (smoother, but more delayed response from users interaction)
					// 1 = Fully native scroll timing (no smoothness)
					lerp: 0.09,
					wheelMultiplier: 1.5,
				}}
			/>
		</>
	)
}
