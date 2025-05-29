import { cva } from 'cva'

import { Title } from '@/components/Content'
import { validContent } from '@/lib/helpers'
import { tw } from '@/lib/tw'
import { cn, cp } from '@/lib/utils'

// Experimental
const variants = cva('__lead text-balance', {
	variants: {
		layout: {
			grid: 'grid grid-cols-1 grid-flow-row-dense',
			flex: 'flex',
			stack: 'flex flex-col',
			reverse: 'flex flex-col-reverse',
			block: '',
		},

		width: {
			xs: 'max-w-xl',
			sm: 'max-w-2xl',
			default: 'lg:max-w-3xl',
			lg: 'max-w-4xl',
			xl: 'max-w-5xl',
			full: 'max-w-none',
			stretch: 'max-w-none p-edge',
		},

		gap: tw.gap,
	},

	defaultVariants: {
		layout: 'reverse',
		width: 'default',
		gap: 'xs',
	},

	compoundVariants: [
		{
			layout: 'reverse',
			gap: undefined,
			className: 'gap-1 lg:gap-2 2xl:gap-3',
		},
	],
})

const helpers = cva('', {
	variants: {
		prose: {
			false: 'max-w-xl',
		},
	},
})

const Lead = ({
	title,
	subtitle,
	as,
	wrap,
	prose = false,
	className,
	children,
	...props
}) => {
	const lines = [title, subtitle].filter(validContent)

	if (lines.length < 1) return

	if (lines.length === 1 && !wrap && !children)
		return (
			<Title
				title={[title, subtitle].find(validContent)}
				// TODO: Maybe a more elegant solution here
				as={cn({
					[cp(as, 'title')]: validContent(title),
					[cp(as, 'subtitle')]: validContent(subtitle),
				})}
				className={cn(
					cp(className, 'lead', true),
					validContent(title) && cp(className, 'title'),
					validContent(subtitle) && cp(className, 'subtitle'),
				)}
			/>
		)

	return (
		<div className={cn(variants(props), cp(className, 'lead', true))}>
			<Title
				title={title}
				as={cp(as, 'title')}
				className={cp(className, 'title')}
			/>
			<Title
				title={subtitle}
				as={cp(as, 'subtitle')}
				className={cn(helpers({ prose }), cp(className, 'subtitle'))}
			/>

			{children}
		</div>
	)
}

const Intro = ({ title, body, isDark = false }) => (
	<Lead
		title={title}
		subtitle={body}
		layout='stack'
		gap='prose'
		className={{
			lead: 'self-start text-pretty',
			title: cn(
				isDark && 'text-slate-300',
				'after:absolute after:-bottom-5 after:left-0',
				'after:w-16 after:h-1',
				isDark ? 'after:bg-slate-300' : 'after:bg-indigo',
			),
			subtitle: '__sm',
		}}
	/>
)

export { Lead, Intro }
