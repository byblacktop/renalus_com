import { useEffect, useLayoutEffect, useState } from 'react'

export const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useBrowserLayout = (
	fn,
	deps = [],
	revalidateAfterMount = true,
) => {
	const [mounted, setMounted] = useState(false)

	useIsomorphicLayoutEffect(() => {
		if (typeof window === 'undefined') return

		if (!mounted || revalidateAfterMount) fn()

		if (!mounted) setMounted(true)
	}, deps)

	return mounted
}

//// Vercel Toolbar
//
// Disable smooth scrolling over Vercel comment inbox
export const useWatchToolbar = () => {
	useIsomorphicLayoutEffect(() => {
		// if (process.env.NODE_ENV !== 'preview') return

		const handleToolbar = () => {
			const toolbar = document.querySelector('vercel-live-feedback')

			if (toolbar && !toolbar.dataset.lenisPrevent)
				toolbar.dataset.lenisPrevent = true

			window.removeEventListener('message', onToolbarReady)
		}

		const onToolbarReady = ({ origin, data }) => {
			if (origin === 'https://vercel.live' && data.type === 'ready')
				handleToolbar()
		}

		window.addEventListener('message', onToolbarReady)

		return () => window.removeEventListener('message', onToolbarReady)
	}, [])
}
