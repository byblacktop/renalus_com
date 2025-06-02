'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAtomValue } from 'jotai'

import { Logo } from '@/components/Media'
import { NavItems } from '@/components/NavItems'
import { Button } from '@/components/UI'
import {
	useBelowBreakpoint,
	useViewport,
} from '@/lib/hooks/useScreen'
import { throttle } from '@/lib/helpers'
import { useLenis } from '@/lib/lenis'
import { NAV } from '@/lib/sitemap'
import { bannerOpen, navOpen } from '@/lib/store'
import { cn } from '@/lib/utils'
import { NavOverlay, OverlayTrigger } from './HeaderOverlay'

// import { NavOverlay, OverlayTrigger } from './HeaderOverlay'

const themes = {
	dark: {
		theme: 'dark',
		logo: 'light',
		isDark: true,
	},
	light: {
		theme: 'light',
		logo: 'primary',
		isDark: false,
	},
}

const bannerDims = {
	height: 48,
	padding: 24,
	breakpoint: 48 + 24,
}

const headerMaxHeight = 95

const Header = () => {
	// Path
	const path = usePathname()

	// State
	const bannerActive = useAtomValue(bannerOpen)
	const [hasScrolled, setHasScrolled] = useState(false)
	const [theme, setTheme] = useState({
		theme: 'dark',
		logo: 'light',
		isDark: false,
	})

	// Breakpoints
	const { width: vw, height: vh } = useViewport()

	// Refs
	const ref = useRef()
	const bannerHeight = useRef(0)

	// Scroll handler
	const handleScroll = throttle(({ scroll, direction }) => {
		if (!ref.current) return
		const breakpoint = ref.current.scrollHeight + bannerHeight.current

		// State
		setHasScrolled(scroll > breakpoint)

		// Directional show/hide
		if (direction === -1) {
			// Scroll up

			ref.current?.style.setProperty(
				'transform',
				`translateY(-${Math.min(bannerHeight.current, scroll)}px)`,
			)
		} else if (scroll <= breakpoint) {
			// Scroll down, but not past the Header

			ref.current?.style.setProperty(
				'transform',
				`translateY(-${Math.min(breakpoint, scroll)}px)`,
			)
		} else if (direction === 1 && scroll > breakpoint) {
			// Scroll down, past the Header

			ref.current?.style.setProperty(
				'transform',
				`translateY(-${breakpoint}px)`,
			)
		}
	}, 25)

	// Scroll trigger
	const lenis = useLenis(handleScroll, [vh, path])

	// Side effects

	useEffect(() => {
		if (lenis) {
			lenis.stop()
			requestAnimationFrame(() => {
				lenis.start()
			})
		}
	}, [path])

	useEffect(() => {
		// Show/hide header
		const hero = document.querySelector('main > section:first-child')

		// Set Hero padding height to header height
		const r = document.querySelector(':root')
		const nav = ref.current.querySelector('article')
		r.style.setProperty(
			'--h-header',
			`${Math.min(nav.clientHeight, nav.scrollHeight, headerMaxHeight)}px`,
		)

		// Update nav to dark theme
		setTheme(
			themes[hero?.dataset?.theme === 'dark' ? 'dark' : 'light'],
		)
	}, [vw, vh, path, ref.current])

	useEffect(() => {
		// Set banner height
		bannerHeight.current = bannerActive ? bannerDims.height : 0
	}, [bannerActive])

	return (
		<header
			ref={ref}
			data-scrolled={hasScrolled}
			data-theme={theme.theme}
			className={cn(
				'header fixed inset-x-0',
				'transition-all duration-500',
				bannerActive ? 'top-[var(--h-banner)]' : 'top-0',
			)}
		>
			<article>
				<HeaderNav theme={theme} hasScrolled={hasScrolled} />
			</article>

			<NavOverlay />
		</header>
	)
}

const HeaderNav = ({ theme, hasScrolled }) => {
	const breakpoint = useBelowBreakpoint('lg')
	const navActive = useAtomValue(navOpen)

	return (
		<nav
			aria-label='Navigation'
			data-theme={theme.theme}
			className={cn(
				'flex items-center justify-between',
				'max-w-(--breakpoint-5xl) mx-auto',
				'px-fluid py-3 md:py-4',
			)}
		>
			{/* Logo */}
			<Logo
				variant={hasScrolled || navActive ? 'primary' : theme.logo}
				size={hasScrolled ? 'w-40 md:w-44 xl:w-52' : undefined}
				className={{
					figure: 'basis-0 grow-1',
				}}
			/>

			{/* Main Nav */}
			<NavItems
				hidden={breakpoint}
				links={NAV.primary}
				color={hasScrolled ? 'light' : theme.theme}
				className={cn(
					'relative z-2',
					'p-1 xl:p-1.75 rounded-l-full',
					'border border-r-0',
					theme.isDark ? 'border-white/15' : 'border-slate-200',
					hasScrolled && 'bg-white/60 backdrop-blur',
				)}
			/>

			<NavSecondary
				isDark={theme.isDark}
				breakpoint={breakpoint}
				hasScrolled={hasScrolled}
			/>
		</nav>
	)
}

const NavSecondary = ({ isDark, hasScrolled, breakpoint }) => {
	return (
		<ul
			className={cn(
				'relative basis-0 lg:grow-1',
				'flex items-center justify-end gap-4',
				'p-1 xl:p-1.75',
				'max-lg:pl-4 max-sm:pr-4',
				'border lg:border-l-0',
				'rounded-full lg:rounded-l-none',
				isDark ? 'border-white/15' : 'border-slate-200',
				hasScrolled && 'bg-white/60 backdrop-blur',
			)}
		>
			<OverlayTrigger
				show={breakpoint}
				className={isDark && !hasScrolled && 'text-white'}
			/>
			{!breakpoint && (
				<>
					<li>
						<Button
							link={NAV.cta.pay}
							color='info'
							variant='stroke'
							target='_blank'
						/>
					</li>

					<li>
						<Button
							link={NAV.cta.portal}
							color='info'
							variant='stroke'
							target='_blank'
						/>
					</li>
				</>
			)}
			<li className='max-sm:hidden'>
				<Button
					link={NAV.cta.primary}
					color='accent'
					size='sm'
					cta={true}
					arrow={{
						loop: true,
					}}
				/>
			</li>
		</ul>
	)
}

export { Header }
