import Link from 'next/link'
import { QueueListIcon } from '@heroicons/react/24/outline'

import { LinkArrow } from '@/components/UI'
import { getFilteredDocs } from '@/lib/api'

const getTeamNav = async curr => {
	const getNext = getFilteredDocs('team', {
		filters: [
			{
				fn: 'numberGreaterThan',
				path: 'my.team.priority',
				value: curr,
			},
			{
				fn: 'at',
				path: 'my.team.team',
				value: 'Doctor',
			},
		],
		pageSize: 1,
		orderings: {
			field: 'my.team.priority',
			direction: 'asc',
		},
		graphQuery: `{
			team {
				name
			}
		}`,
	}).then(d => d?.url)

	const getPrev = getFilteredDocs('team', {
		filters: [
			{
				fn: 'numberLessThan',
				path: 'my.team.priority',
				value: curr,
			},
			{
				fn: 'at',
				path: 'my.team.team',
				value: 'Doctor',
			},
		],
		pageSize: 1,
		orderings: {
			field: 'my.team.priority',
			direction: 'desc',
		},
		graphQuery: `{
			team {
				name
			}
		}`,
	}).then(d => d?.url)

	const [next, prev] = await Promise.all([getNext, getPrev])

	return { next, prev }
}
const Controls = async ({ priority }) => {
	const { next, prev } = await getTeamNav(priority)

	return (
		<aside className='col-span-full lg:col-span-1'>
			<dl className='flex lg:flex-col max-lg:justify-center items-center gap-4 md:sticky md:top-32'>
				<Trigger href={prev}>
					<LinkArrow
						loop={true}
						direction='left'
						variant='long'
						size='lg'
						className='p-4'
					/>
				</Trigger>

				<Trigger href='/about#our-doctors' className='lg:-order-1'>
					<figure className='p-4'>
						<QueueListIcon className='w-6 h-6 ' />
					</figure>
				</Trigger>

				<Trigger href={next}>
					<LinkArrow
						loop={true}
						direction='right'
						variant='long'
						size='lg'
						className='p-4'
					/>
				</Trigger>
			</dl>
		</aside>
	)
}

const Trigger = ({ href, className, children }) =>
	href && (
		<dd className={className}>
			<Link
				href={href}
				className='block group  rounded-full overflow-hidden duration-500 ease-out-smooth text-blue-100 bg-indigo-900 hover:bg-indigo-700'
			>
				{children}
			</Link>
		</dd>
	)

export { Controls }
