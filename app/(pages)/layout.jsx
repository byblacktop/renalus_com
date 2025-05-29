import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { GSAP } from '@/components/Interactive'
import { Providers } from '@/components/Providers'
import { Lenis } from '@/lib/lenis'

export default function Layout({ children }) {
	return (
		<>
			<Providers>
				{/* Header */}

				<Header />

				{/* Main Page Content */}
				<main className='main'>{children}</main>

				{/* Footer */}
				<Footer />
			</Providers>

			{/* GSAP */}
			<GSAP scrollTrigger={true} markers={false} />

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
