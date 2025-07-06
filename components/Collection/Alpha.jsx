import { Fragment } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { asText } from '@prismicio/client'

import { Section } from '@/components/Compose'
import { Body, ProseSplit } from '@/components/Content'
import {
	getTheme,
	invalidArrObjectData,
	invalidObjectKeys,
	invalidString,
} from '@/lib/helpers'
import { gap } from '@/lib/tw'
import { cn } from '@/lib/utils'

const getItems = ({ body }) => {
	if (invalidObjectKeys(body, 'rows')) return {}

	const { rows } = body

	if (invalidArrObjectData(rows)) return {}

	return rows.reduce((acc, row) => {
		const { cells } = row

		if (invalidArrObjectData(cells)) return acc

		const header = cells[0]
		const data = cells[1]

		if (
			invalidObjectKeys(header, 'content') ||
			invalidObjectKeys(data, 'content')
		)
			return acc

		const label = asText(header.content)
		const content = asText(data.content)

		acc[label] = content

		return acc
	}, {})
}

const sortList = list =>
	Object.fromEntries(
		Object.entries(list).sort(([a], [b]) => a.localeCompare(b)),
	)

const CollectionAlpha = ({
	items,
	cols,
	color,
	dataset,
	link,
	text,
	featured,
	...contentProps
}) => {
	const list = sortList(getItems(items))

	// Track alphabetical group
	let group = ''

	return (
		<Section
			container
			layout='stack'
			gap='xl'
			dataset={dataset}
			className={cn(
				'relative z-10 rounded-4xl overflow-hidden',
				'm-4 md:m-6',
				getTheme(color).className,
			)}
		>
			{/* Intro Lead Content */}
			<ProseSplit {...contentProps} />

			{/* List Items */}
			<PopoverGroup
				className={cn(
					'columns-2 sm:columns-3 lg:columns-4',
					gap.prose,
				)}
			>
				{Object.entries(list).map(([label, content]) => {
					const currGroup = label.charAt(0).toUpperCase()
					const heading = currGroup === group ? '' : currGroup
					group = currGroup

					return (
						<Fragment key={label}>
							<GroupHeading heading={heading} />
							<Group
								label={label}
								content={content}
								heading={heading}
							/>
						</Fragment>
					)
				})}
			</PopoverGroup>
		</Section>
	)
}

const GroupHeading = ({ heading }) => {
	if (invalidString(heading)) return null

	return (
		<div className='border-b border-slate/20 pb-2 mb-2 not-first:mt-8'>
			<h4 className='text-slate'>{heading}</h4>
		</div>
	)
}

const Group = ({ label, content }) => {
	return (
		<Popover key={label}>
			<PopoverButton
				key={`${label}__trigger`}
				className={cn(
					'group relative p-2 -mx-2',
					'fs-2xs text-left leading-sm',
					'w-[calc(100%+1rem)] rounded-lg',
					'bg-indigo-500/0 hover:bg-indigo-500/10',
					'flex items-center justify-between',
					'focus:outline-none data-focus:outline data-focus:outline-transparent',
					gap['2xs'],
				)}
			>
				<span>{label}</span>
				<PlusIcon
					className={cn(
						'size-4.5 p-0.5 bg-white rounded-full shrink-0',
						'opacity-0 group-hover:opacity-100',
						'-rotate-90 group-hover:rotate-0',
						'transition-all',
					)}
				/>
			</PopoverButton>

			<PopoverPanel
				key={`${label}__panel`}
				anchor='bottom'
				className={cn(
					'p-3 md:p-4',
					'bg-white rounded-2xl shadow-2xl',
					'data-closed:scale-95 data-closed:opacity-0',
					'[--anchor-gap:--spacing(0.5)] data-closed:-translate-y-1',
				)}
			>
				<div className='w-full max-w-sm fs-xs'>
					<Body body={content} />
				</div>
			</PopoverPanel>
		</Popover>
	)
}

export { CollectionAlpha }
