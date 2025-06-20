import Image from 'next/image'
import Link from 'next/link'

import { Shell } from '@/components/Compose'
import { SITE_NAME } from '@/lib/constants'
import { cn, cp } from '@/lib/utils'
// Logo Variants
import LogoDuo from '@/public/logo/LOGO__color.svg'
import LogoPrimary from '@/public/logo/LOGO__filled.svg'
import LogoMono from '@/public/logo/LOGO.svg'

const variants = {
	primary: LogoPrimary,
	duo: LogoDuo,
	mono: LogoMono,
}

const themes = {
	dark: {
		color: 'fill-indigo-900',
		accent: 'var(--color-red)',
	},
	light: {
		color: 'fill-white',
		accent: 'var(--color-red)',
	},
}

const Logo = ({
	variant = 'primary',
	theme = 'dark',
	size = 'w-44 md:w-52 xl:w-60',
	className,
	...props
}) => (
	<figure
		className={cn('relative leading-none', cp(className, 'figure'))}
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
				className={cn(
					'block',
					themes[theme].color,
					cp(className, 'logo', true),
				)}
				style={{ '--color-accent': themes[theme].accent }}
				alt={SITE_NAME}
				{...props}
			/>
		</Link>
	</figure>
)

const Mark = ({ color, className, ...props }) => (
	<Logo className={cn('w-full h-full', className)} {...props} />
)

export { Logo, Mark }
