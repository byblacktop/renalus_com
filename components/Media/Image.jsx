import { forwardRef } from 'react'
import Image from 'next/image'

import { Cover, Shell } from '@/components/Compose'
import { Parallax } from '@/components/Interactive'
import { getImg } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const CoverImage = forwardRef(
	({ img, plx, className, children, ...atts }, ref) => (
		<Cover
			as='figure'
			className={cn(
				'pointer-events-none',
				cp(className, 'figure', true),
			)}
		>
			<Shell
				as={!!plx ? Parallax : false}
				className={{
					trigger: cn('absolute inset-0', cp(className, 'trigger')),
					target: cn('absolute inset-0', cp(className, 'target')),
				}}
				{...plx}
			>
				<Img
					fill
					img={img}
					ref={ref}
					className={cn(
						'object-cover object-center',
						cp(className, 'img'),
					)}
					{...atts}
				/>
			</Shell>

			{children}
		</Cover>
	),
)

const AspectImage = forwardRef(
	(
		{
			w = 16,
			h = 9,
			aspectW, // Width overrides for responsive images
			aspectH, // Height overrides for responsive images
			className,
			children,
			...props
		},
		ref,
	) => (
		<figure
			className={cn(
				'__aspectImage',
				'relative w-full h-0',
				`aspect-w-${w}`,
				`aspect-h-${h}`,
				aspectW,
				aspectH,
				cp(className, 'figure', true),
			)}
		>
			<Img
				ref={ref}
				className={cp(className, 'img')}
				{...props}
				width={undefined}
				height={undefined}
			/>

			{children}
		</figure>
	),
)

const Img = forwardRef(
	({ img, size, fallback, className, ...props }, ref) => {
		const { escape, src, srcset, ...atts } = getImg(
			img,
			size,
			fallback,
		)

		if (escape) return

		return (
			<Image
				fill
				alt=''
				ref={ref}
				className={cn('object-cover', className)}
				sizes='(min-width: 1920px) 2000px, (min-width: 1400px) 1400px, 100vw'
				// TODO: Implement when stable
				// {...validSrc(img, size)}
				src={src}
				srcSet={srcset}
				{...props}
			/>
		)
	},
)

const ParallaxImage = forwardRef((props, ref) => (
	<CoverImage ref={ref} plx={true} {...props} />
))

export { CoverImage, AspectImage, ParallaxImage }
