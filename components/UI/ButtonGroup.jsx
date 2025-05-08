import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { Button } from '@/components/UI'
import {
	cleanButtonGroup,
	invalidArrObjectData,
	validArr,
	validObjectData,
	validObjectKeys,
} from '@/lib/helpers'
import { tw } from '@/lib/tw'
import { cn, cp, kn } from '@/lib/utils'

const layouts = cva('__btn_group flex flex-wrap', {
	variants: {
		justify: {
			center: 'justify-center',
			left: 'justify-start',
			start: 'justify-start',
			end: 'justify-end',
			right: 'justify-end',
		},

		align: {
			center: 'items-center',
			left: 'items-start',
			end: 'items-start',
			right: 'items-end',
			start: 'items-end',
		},

		offset: {
			true: 'sm:w-11/12 sm:ml-auto',
		},

		gap: tw.gap,
	},

	defaultVariants: {
		gap: 'sm',
		align: 'center',
	},
})

const ctaProps = {
	'Call To Action': {
		color: 'accent',
		size: 'sm',
		cta: true,
		arrow: {
			loop: true,
		},
	},
	article: {
		as: 'button',
		variant: 'stroke',
		arrow: {
			default: true,
		},
	},
}

const getBtnProps = (link, btnProps, idx) => {
	if (
		validObjectKeys(link, 'variant') &&
		validObjectKeys(ctaProps, link.variant)
	) {
		return ctaProps[link.variant]
	}

	return Object.entries(btnProps).reduce((acc, [key, value]) => {
		if (validArr(value) && value.length >= idx + 1)
			return { ...acc, [key]: value[idx] }

		if (
			['string', 'boolean', 'number'].includes(typeof value) ||
			validObjectData(value)
		)
			return { ...acc, [key]: value }

		return acc
	}, {})
}

const ButtonGroup = ({
	as = 'div',
	links = [],
	gap,
	isSection = false,
	offset = false,
	justify,
	align,
	className,
	...btnProps
}) => {
	const btns = cleanButtonGroup(links)

	if (invalidArrObjectData(btns)) return

	return (
		<Shell
			as={as}
			className={cn(
				layouts({ align, justify, gap }),
				cp(className, 'group', true),
			)}
		>
			{btns.map((l, idx) => {
				const props = getBtnProps(l, btnProps, idx)

				return (
					<Button
						key={kn(l)}
						link={l}
						className={cp(className, 'btn')}
						{...props}
					/>
				)
			})}
		</Shell>
	)
}

export { ButtonGroup }
