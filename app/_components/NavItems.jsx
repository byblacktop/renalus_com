import { PopoverGroup } from '@headlessui/react'
import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { SubNav } from '@/components/SubNav'
import { Button, Flex } from '@/components/UI'
import { invalidArrData } from '@/lib/helpers'
import { cn, cp, kn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		layout: {
			inline: 'flex items-center gap-0',
			stack: 'flex flex-col',
			cols: 'columns-2 gap-6',
		},

		color: {
			dark: 'text-white/90 hover:text-white',
			light: 'text-indigo hover:text-slate-300',
		},

		cta: {
			inline: 'pl-4 ',
			stack: 'px-4 lg:px-5',
		},
	},

	defaultVariants: {
		layout: 'inline',
	},
})

const NavItems = ({
	links,
	layout,
	color = 'dark',
	hidden = false,
	className,
}) => {
	if (hidden || invalidArrData(links)) return

	return (
		<PopoverGroup
			as='ul'
			className={cn(
				'relative',
				variants({ layout }),
				cp(className, 'ul', true),
			)}
		>
			{links.map(link => (
				<NavItem
					key={kn(link)}
					link={link}
					color={color}
					className={className}
				/>
			))}
		</PopoverGroup>
	)
}

const NavItem = ({ link, color, className }) => {
	return (
		<Flex
			as='li'
			align='center'
			gap='3xs'
			className={cp(className, 'li')}
		>
			<Shell
				as={!!link?.subnav ? SubNav : Button}
				link={link}
				variant='nav'
				className={cn(
					variants({ color, layout: false }),
					cp(className, 'link'),
				)}
			/>
		</Flex>
	)
}

export { NavItems }
