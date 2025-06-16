import { cva } from 'cva'

import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		direction: {
			t: 'bg-linear-to-t',
			r: 'bg-linear-to-r',
			b: 'bg-linear-to-b',
			l: 'bg-linear-to-l',
			tl: 'bg-linear-to-tl',
			tr: 'bg-linear-to-tr',
			bl: 'bg-linear-to-bl',
			br: 'bg-linear-to-br',
		},

		color: {
			black: 'bg-black',
			slate: 'bg-slate',
			zinc: 'bg-zinc',
			stone: 'bg-stone',
			indigo: 'bg-indigo',
			soft: 'bg-indigo-500',
			blue: 'bg-blue',
			sky: 'bg-blue-500',
			red: 'bg-red',
			green: 'bg-green',
			white: 'bg-white',
		},

		gradient: {
			black: 'from-black/80 via-black/20 to-black/0',
			smoke: 'from-slate-900/80 via-slate-900/35 to-slate-900/5',
			rich: 'from-indigo-900/100 via-indigo-900/60 to-indigo-900/10 from-20%',
			royal:
				'from-slate-700/100 via-slate-700/50 to-slate-700/0 from-25%',
			dark: 'from-indigo-950/80 via-indigo-950/40 to-indigo-950/20',
			white: 'from-white/70 via-white/30 to-white/0',
			indigo: 'from-indigo-700/90 via-indigo-700/40 to-indigo-700/0',
			blue: 'from-blue-700/80 via-blue-700/50 to-blue-700/30',
			red: 'from-red-500/70 via-red-500/30 to-red-500/0',
			green: 'from-green-300/70 via-green-300/30 to-green-300/0',
		},

		blend: {
			multiply: 'mix-blend-multiply',
			darken: 'mix-blend-darken',
			screen: 'mix-blend-screen',
			lighten: 'mix-blend-lighten',
			overlay: 'mix-blend-overlay',
			luminosity: 'mix-blend-luminosity',
			color: 'mix-blend-color',
			difference: 'mix-blend-difference',
			exclusion: 'mix-blend-exclusion',
			hue: 'mix-blend-hue',
			hard: 'mix-blend-hard-light',
			soft: 'mix-blend-soft-light',
		},
	},

	compoundVariants: [
		{
			gradient: ['black', 'white', 'dark'],
			direction: undefined,
			className: 'bg-linear-to-t',
		},
		{
			color: undefined,
			direction: undefined,
			className: 'bg-linear-to-t',
		},
	],
})

const Overlay = ({
	direction,
	color,
	gradient,
	blend,
	className,
}) => {
	return (
		<div
			className={cn(
				'absolute inset-0',
				variants({ direction, gradient, color, blend }),
				className,
			)}
		/>
	)
}

export { Overlay }
