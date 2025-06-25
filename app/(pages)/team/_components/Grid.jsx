import Link from 'next/link'
import { filter } from '@prismicio/client'

import { Container, Section, Shell } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { DynamicFeed } from '@/components/Feed'
import { AspectImage } from '@/components/Media'
import { Button, Flex, getBackdrop, Grid } from '@/components/UI'
import { getTheme } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const TeamGrid = ({ title, body, color, team, cols, dataset }) => {
	const isDark = getTheme(color).isDark

	return (
		<Section
			container
			className={{
				section: cn(
					isDark && '__dark',
					getTheme(color).className,
					getBackdrop('default'),
				),
				// container: 'px-fluid-y',
			}}
			dataset={dataset}
		>
			{/* <Container className='px-fluid-y'> */}
			<Grid cols={3} gap={team === 'Staff' ? 'sm' : 'lg'}>
				<Lead
					title={title}
					subtitle={body}
					layout='stack'
					gap='prose'
					className={{
						lead: 'self-start',
						title: cn(
							isDark && 'text-slate-300',
							'after:absolute after:-bottom-5 after:left-0',
							'after:w-16 after:h-1',
							isDark ? 'after:bg-slate-300' : 'after:bg-indigo',
						),
						subtitle: '__sm',
					}}
				/>

				{/* Team Query */}
				<Shell
					as={team === 'Staff' ? 'div' : false}
					className='col-span-2 grid grid-cols-2 gap-4'
				>
					<DynamicFeed
						type='team'
						group={team}
						qry={{
							filters: [filter.at('my.team.team', team)],
						}}
					/>
				</Shell>
			</Grid>
			{/* </Container> */}

			{/* <Backdrop color={color} offset='boxed' /> */}
		</Section>
	)
}

const TeamCards = ({ results, group }) =>
	results.map(result => (
		<Shell
			key={kn(result)}
			as={group === 'Staff' ? Avatar : Card}
			{...result}
		/>
	))

const Card = ({ name, degree, img, link }) => {
	return (
		<Link
			href={link}
			className='__base group space-y-2 md:space-y-4 xl:space-y-6'
		>
			<AspectImage
				img={img}
				w={3}
				h={4}
				className={cn(
					'rounded-xl md:rounded-2xl overflow-hidden',
					'flex items-end justify-center',
				)}
			>
				<div
					className={cn(
						'absolute inset-0',
						'opacity-0 group-hover:opacity-100',
						'bg-gradient-to-t from-slate/100 via-slate/30 to-slate/0',
						'transition-opacity duration-500 ease-out-smooth',
					)}
				>
					<Button
						as='button'
						link={{ text: 'Read Bio' }}
						color='white'
						variant='outline'
						size='xs'
						arrow={{
							direction: 'right',
							variant: 'long',
						}}
						className='btn-reveal absolute bottom-4 left-1/2 -translate-x-1/2'
					/>
				</div>
			</AspectImage>
			<h4 className='flex gap-1.5 items-end leading-none text-indigo-50'>
				<span>{name}</span>
				{degree && (
					<span className='text-red-400/80 fs-base font-main font-medium'>
						{degree}
					</span>
				)}
			</h4>
		</Link>
	)
}

const Avatar = ({ name, position, img }) => (
	<Flex
		items='center'
		className='__dark bg-indigo rounded-xl p-4 md:p-5 lg:p-6'
	>
		<div>
			<AspectImage
				img={img}
				w={1}
				h={1}
				className='size-16 md:size-20 xl:size-24 rounded-full overflow-hidden'
			/>
		</div>

		<Lead
			title={name}
			subtitle={position}
			gap='3xs'
			as={{ title: 'h4', subtitle: 'h6' }}
			className={{
				title: '__xs',
				subtitle: '__label __xs text-slate-300',
			}}
		/>
	</Flex>
)

export { TeamGrid, TeamCards }
