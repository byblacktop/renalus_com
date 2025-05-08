import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { Prose, ProseSplit } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Button, Overlay } from '@/components/UI'
import {
	bgColor,
	contrastUtil,
	getTheme,
	validArrObjectData,
} from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		layout: {
			0: cn(
				'max-md:rounded-b-4xl md:rounded-tl-3xl xl:rounded-tl-4xl',
			),
			1: cn(
				'max-md:rounded-t-4xl md:rounded-tr-3xl xl:rounded-tr-4xl',
			),
		},

		img: {
			0: 'absolute max-w-sm left-1/2 right-0 -translate-x-1/2 opacity-70 -scale-x-100',
			1: 'absolute left-[25%] right-0',
		},
	},
})

const CtaSplit = ({ items, dataset, ...contentProps }) => {
	const { title, subtitle, body } = contentProps
	const hasIntro = [title, subtitle, body].some(validArrObjectData)

	return (
		<Section
			className={cn(
				'sm:px-fluid pt-5 lg:pt-10',
				'rounded-4xl md:rounded-5xl overflow-hidden',
			)}
			{...dataset}
		>
			{hasIntro && (
				<Container className='__sm pb-8'>
					<ProseSplit {...contentProps} />
				</Container>
			)}

			<Container
				layout='grid'
				gap='0'
				cols={2}
				className={cn(
					'max-w-(--breakpoint-4xl)',
					'p-0 max-md:flex max-md:flex-col-reverse',
				)}
			>
				{items.map((item, idx) => (
					<CtaItem key={kn(item)} idx={idx} {...item} />
				))}
			</Container>
		</Section>
	)
}

const CtaItem = ({ img, link, color, idx, ...contentProps }) => {
	return (
		<div
			className={cn(
				'relative p-12 lg:p-fluid-y pb-12',
				'flex flex-col justify-between',
				'overflow-hidden',
				getTheme(color).className,
				variants({ layout: idx }),
			)}
		>
			<Prose
				wrap={true}
				className={{
					prose: cn(
						'__lg relative z-10',
						'max-w-xl',
						idx === 0 && 'mx-auto',
					),
					lead: 'max-w-sm',
					subtitle: '__label',
					body: cn(
						'text-pretty',
						idx === 0 ? 'max-w-xs' : 'max-w-md',
					),
				}}
				{...contentProps}
			/>

			<div className='aspect-w-16 aspect-h-9' />

			<div
				className={cn(
					'relative z-1 w-full max-w-xl',
					idx === 0 && 'mx-auto',
				)}
			>
				<Button
					link={link}
					variant='stroke'
					size='lg'
					color={contrastUtil(color)}
				/>
			</div>

			<div
				className={cn(
					'top-[22%] bottom-[20%]',
					'z-1',
					bgColor(color),
					variants({ img: idx }),
				)}
			>
				<CoverImage img={img}>
					<Overlay
						gradient='indigo'
						direction='b'
						className='opacity-70'
					/>
				</CoverImage>
			</div>
		</div>
	)
}

export { CtaSplit }
