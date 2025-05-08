import Link from 'next/link'

import { Shell } from '@/components/Compose'
import { SITE_NAME } from '@/lib/constants'
import { cn, cp } from '@/lib/utils'
// Logo Variants
import LogoPrimary from '@/public/logo/logo__blue.svg'
import LogoMark from '@/public/logo/logo__mark.svg'
import LogoLight from '@/public/logo/logo__white+yellow.svg'
import LogoBlank from '@/public/logo/logo.svg'

const variants = {
	primary: LogoPrimary,
	light: LogoLight,
	blank: LogoBlank,
	mark: LogoMark,
}

const Logo = ({
	variant = 'primary',
	color = 'indigo',
	size = 'w-28 md:w-32 xl:w-36',
	className,
	...props
}) => (
	<figure
		className={cn('relative leading-none', cp(className, 'figure'))}
		data-theme={color}
		data-variant={variant}
	>
		<Link
			href='/'
			className={cn(
				'relative inline-block transition-all duration-300',
				cp(className, 'link'),
				size,
			)}
		>
			<span className='sr-only'>{SITE_NAME} Logo</span>
			<Shell
				as={variants[variant] ?? variants.primary}
				className={cn('block', cp(className, 'logo', true))}
				{...props}
			/>
		</Link>
	</figure>
)

const Mark = ({ color, className, ...props }) => (
	<LogoMark className={cn('w-full h-full', className)} {...props} />
)

export { Logo, Mark }
