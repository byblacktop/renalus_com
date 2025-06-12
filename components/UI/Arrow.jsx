import {
	ArrowDownIcon,
	ArrowDownLeftIcon,
	ArrowDownRightIcon,
	ArrowLeftIcon,
	ArrowLongDownIcon,
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
	ArrowLongUpIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	ArrowUpLeftIcon,
	ArrowUpRightIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { cva } from 'cva'

import { bgColor, textColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { Title } from '../Content'

const icons = {
	default: ArrowUpRightIcon,
	arrow: {
		up: ArrowUpIcon,
		down: ArrowDownIcon,
		left: ArrowLeftIcon,
		right: ArrowRightIcon,
		upRight: ArrowUpRightIcon,
		downRight: ArrowDownRightIcon,
		downLeft: ArrowDownLeftIcon,
		upLeft: ArrowUpLeftIcon,
	},
	long: {
		up: ArrowLongUpIcon,
		down: ArrowLongDownIcon,
		left: ArrowLongLeftIcon,
		right: ArrowLongRightIcon,
	},
	chevron: {
		up: ChevronUpIcon,
		down: ChevronDownIcon,
		left: ChevronLeftIcon,
		right: ChevronRightIcon,
	},
}

const getIcon = (variant = 'arrow', direction = 'upRight') =>
	icons[variant][direction] ?? ArrowUpRightIcon

const variants = cva('', {
	variants: {
		size: {
			'2xs': 'size-3',
			xs: 'size-3',
			sm: 'size-3.5 sm:size-4',
			md: 'size-4 sm:size-5',
			lg: 'size-4 sm:size-6',
			xl: 'size-5 sm:size-8',
			'2xl': 'size-6 sm:size-10',
			'3xl': 'size-8 md:size-12',
		},

		direction: {
			up: 'group-hover:-translate-y-1',
			down: 'group-hover:translate-y-1',
			left: 'group-hover:-translate-x-1',
			right: 'group-hover:translate-x-1',
			upRight:
				'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
			upLeft:
				'group-hover:-translate-x-0.5 group-hover:-translate-y-0.5',
			downRight:
				'group-hover:translate-x-0.5 group-hover:translate-y-0.5',
			downLeft:
				'group-hover:-translate-x-0.5 group-hover:translate-y-0.5',
		},

		loop: {
			true: 'duration-1000',
			false: 'duration-300',
			parent: '',
		},
	},

	defaultVariants: {
		size: 'sm',
		direction: 'upRight',
		loop: false,
	},

	compoundVariants: [
		{
			variant: 'long',
			size: ['2xs', 'xs', 'sm'],
			className: 'w-4 h-4',
		},
		{
			loop: false,
			direction: 'right',
			className: 'group-hover:translate-x-1',
		},
		{
			loop: false,
			direction: 'left',
			className: 'group-hover:-translate-x-1',
		},
		{
			loop: [true, 'parent'],
			direction: 'right',
			className: 'group-hover:animate-loop',
		},
		{
			loop: [true, 'parent'],
			direction: 'left',
			className: 'group-hover:animate-loop-back',
		},
		{
			loop: [true, 'parent'],
			direction: 'upRight',
			className: 'group-hover:animate-loop-around',
		},
	],
})

const figureVariants = cva('', {
	variants: {
		cta: {
			true: cn(
				'p-2 rounded-full overflow-hidden',
				'bg-green-800 text-green-100',
			),
		},

		loop: {
			true: 'overflow-hidden',
		},
	},
})

const LinkArrow = ({
	caption,
	direction,
	variant,
	size,
	loop,
	cta,
	className,
}) => {
	const Icon = getIcon(variant, direction)

	return (
		<figure
			className={cn(
				'flex gap-1 place-items-center shrink-0 h-full',
				figureVariants({ cta, loop }),
				className,
			)}
		>
			<Title title={caption} as='figcaption' className='__sm h6' />
			<Icon
				className={cn(
					'translate-x-0 tranlate-y-0 transition-all',
					variants({ direction, size, variant, loop }),
				)}
			/>
		</figure>
	)
}

const NavArrow = ({
	size,
	direction,
	circle,
	bg,
	color,
	className,
	...props
}) => (
	<nav
		{...props}
		className={cn(
			'relative z-2 group',
			'flex justify-center items-center shrink-0',
			'size-12 lg:size-14 2xl:size-16',
			'cursor-pointer',
			circle && 'rounded-full overflow-hidden',
			bgColor(bg),
			textColor(color),
			className,
		)}
	>
		<LinkArrow size={size} direction={direction} loop='parent' />
	</nav>
)

export { LinkArrow, NavArrow }
