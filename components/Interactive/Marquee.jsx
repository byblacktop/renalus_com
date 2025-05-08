// import cn from 'clsx'
// import s from './marquee.module.scss'
import { cn } from '@/lib/utils'

const Marquee = ({
	children,
	repeat = 2,
	duration = 5,
	offset = 0,
	inverted = false,
	className,
}) => {
	return (
		<div
			className={cn('marquee', inverted && 'inverted', className)}
			style={{
				'--duration': duration + 's',
				'--offset': (offset % 100) + '%',
			}}
		>
			{new Array(repeat).fill(children).map((_, i) => (
				<div key={i} className='inner'>
					{children}
				</div>
			))}
		</div>
	)
}

export { Marquee }
