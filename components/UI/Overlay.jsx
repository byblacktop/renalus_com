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
			steel: 'bg-slate',
			stone: 'bg-stone',
			white: 'bg-white',
			indigo: 'bg-indigo',
			blue: 'bg-slate',
			sky: 'bg-slate',
			yellow: 'bg-slate',
			red: 'bg-red',
			green: 'bg-green',
		},

		gradient: {
			black: 'from-black/80 via-black/20 to-black/0',
			smoke: 'from-black/70 via-black/30 to-black/10',
			rich: 'from-indigo-800/100 via-indigo-800/60 to-indigo-800/0 from-20%',
			royal:
				'from-slate-700/100 via-slate-700/50 to-slate-700/0 from-25%',
			dark: 'from-indigo-1000/70 via-indigo-1000/40 to-indigo-1000/0',
			white: 'from-white/70 via-white/30 to-white/0',
			indigo: 'from-indigo-800/80 via-indigo-800/20 to-indigo-800/0',
			blue: 'from-slate-700/90 via-slate-700/50 to-slate-700/30',
			sky: 'from-slate-300/90 via-slate-300/80 to-slate-300/60',
			yellow: 'from-slate-500/70 via-slate-500/30 to-slate-500/0',
			red: 'from-red-800/70 via-red-800/30 to-red-800/0',
			green: 'from-green-800/70 via-green-800/30 to-green-800/0',
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
