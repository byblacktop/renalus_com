import Image from 'next/image'
import Link from 'next/link'

import { Shell } from '@/components/Compose'
import { SITE_NAME } from '@/lib/constants'
import { cn, cp } from '@/lib/utils'
// Logo Variants
import Logo00 from '@/public/logo/LOGO__00.png'
import Logo01 from '@/public/logo/LOGO__01.png'
import Logo02 from '@/public/logo/LOGO__02.png'
import Logo03 from '@/public/logo/LOGO__03.png'

const variants = {
	primary: Logo01,
	light: Logo00,
	blank: Logo03,
}

const Logo = ({
	variant = 'primary',
	color = 'indigo',
	size = 'w-44 md:w-52 xl:w-60',
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
			<Image
				src={variants[variant] ?? variants.primary}
				alt={SITE_NAME}
				className={cn('block', cp(className, 'logo', true))}
				width={1025}
				height={300}
				priority
				unoptimized
				{...props}
			/>
		</Link>
	</figure>
)

const Mark = ({ color, className, ...props }) => (
	<Logo className={cn('w-full h-full', className)} {...props} />
)

export { Logo, Mark }
