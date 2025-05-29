import {
	Popover,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { asText } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'

import { Section } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { Flex } from '@/components/UI'
import {
	getTheme,
	invalidArrObjectData,
	invalidObjectKeys,
	validObjectKeys,
} from '@/lib/helpers'
import { gap, spaceY } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'
import DynamicLinks from './DynamicLinks'

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
		const tags = asText(data.content)
			.split(',')
			.map(tag => tag.trim())

		if (validObjectKeys(acc, label)) {
			acc[label] = [...(acc[label] || []), ...tags]
		} else {
			acc[label] = tags
		}

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

			<Flex gap='lg'>
				<div className={cn('w-1/5 shrink-0', spaceY['2xs'])}>
					{featured.map(({ img, link }) => (
						<PrismicNextLink
							field={link}
							key={kn(img)}
							className='block'
						>
							<figure>
								<PrismicNextImage
									field={img}
									alt=''
									className='rounded-xl'
								/>
							</figure>
						</PrismicNextLink>
					))}
				</div>

				{/* List Items */}
				<dl
					// as='dl'
					className={cn('grow sm:columns-2 lg:columns-3', gap.prose)}
				>
					{Object.entries(list).map(([label, tags]) => {
						const currGroup = label.charAt(0).toUpperCase()
						const heading = currGroup === group ? '' : currGroup
						group = currGroup

						return (
							<Group
								key={label}
								label={label}
								tags={tags}
								heading={heading}
							/>
						)
					})}
				</dl>
			</Flex>
		</Section>
	)
}

const Group = ({ label, tags, heading }) => {
	return (
		<>
			{heading && (
				<dd className='border-b border-slate-100 pb-2 mb-2 not-first:mt-8'>
					<h4 className='text-slate'>{heading}</h4>
				</dd>
			)}

			<Popover as='dd'>
				<PopoverButton
					className={cn(
						'group w-[calc(100%+1rem)] -mx-2 px-2 py-0.5',
						'rounded-lg whitespace-nowrap',
						'bg-slate-50/0 hover:bg-slate-50',
						'flex items-center justify-between',
						gap['2xs'],
					)}
				>
					<span>{label}</span>
					<PlusIcon
						className={cn(
							'size-4.5 p-0.5 bg-white rounded-full',
							'opacity-0 group-hover:opacity-100',
							'-rotate-90 group-hover:rotate-0',
							'transition-all',
						)}
					/>
				</PopoverButton>

				<PopoverPanel
					transition
					anchor='bottom start'
					className={cn(
						'p-3 md:p-4',
						'bg-white rounded-2xl shadow-2xl',
						'ransition duration-300 ease-out origin-top',
						'data-closed:scale-95 data-closed:opacity-0',
					)}
				>
					<div className='w-max space-y-2 md:space-y-3'>
						<h6 className='__sm'>Available at: </h6>
						<DynamicLinks
							items={tags}
							className={cn(
								'grid md:grid-cols-2 justify-items-start',
								'mt-1.5 md:mt-3 pt-2 md:pt-4',
								'border-t border-slate-200',
							)}
						/>
					</div>
				</PopoverPanel>
			</Popover>
		</>
	)
}

export { CollectionAlpha }
