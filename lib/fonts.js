import { Geist } from 'next/font/google'
import localFont from 'next/font/local'

export const geist = Geist({
	variable: '--font-geist',
	display: 'swap',
	preload: true,
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const nib = localFont({
	variable: '--font-nib',
	display: 'swap',
	preload: true,
	src: [
		{
			path: '../public/fonts/NibPro-SemiBold.woff2',
			weight: '600',
			style: 'normal',
		},
	],
})
