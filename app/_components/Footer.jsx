import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Compose'
import { Logo } from '@/components/Media'
import { NavItems } from '@/components/NavItems'
import { Button, Divider, Flex, Grid } from '@/components/UI'
import { NAV } from '@/lib/sitemap'
import { spaceY } from '@/lib/tw'
import { cn } from '@/lib/utils'
import { DynamicItems } from './Dynamic'

const Footer = () => {
	return (
		<footer className='footer __dark bg-indigo-950'>
			<section className='bg-indigo rounded-b-4xl'>
				<Container
					width='lg'
					className={cn('pt-20 lg:pt-28 pb-8 lg:pb-12')}
				>
					<Flex align='start' justify='between' gap='2xl' wrap>
						<Brand />

						<Flex as='div' gap='lg' className='2xl:gap-24'>
							<Sitemap />

							<Locations />
						</Flex>

						<Contact />
					</Flex>
				</Container>
			</section>

			<section>
				<Container className='py-6' layout='flex'>
					<p className='__2xs'>
						&copy; {new Date().getFullYear()} Renalus Center for
						Kidney Care. All rights reserved.
					</p>
					<p className='__2xs'>
						Terms and Conditions • Privacy Policy • Disclaimer
					</p>
				</Container>
			</section>
		</footer>
	)
}

const Brand = () => (
	<div className={cn('w-full max-w-3xs', spaceY.xs)}>
		{/* Logo */}
		<Logo variant='light' />

		{/* Brand Statement */}
		<p className='__sm'>
			Doctors of Optometry bringing clear vision across Northwest
			Florida and Southeast Alabama.
		</p>
	</div>
)

const Sitemap = () => (
	<nav className={spaceY.xs}>
		<h4 className='__xs text-indigo-100'>Explore Renalus</h4>
		<Divider color='indigo-100' className='h-px' />
		<NavItems
			links={NAV.primary.map(({ text, href }) => ({ text, href }))}
			className={{ link: 'pl-0' }}
			layout='stack'
		/>
		{/* Main Nav */}
	</nav>
)

const Locations = () => (
	<nav className={spaceY.xs}>
		<h4 className='__xs text-indigo-100'>Renalus Locations</h4>
		<Divider color='indigo-100' className='h-px' />
		<DynamicItems type='location'>
			{({ results }) => (
				<NavItems
					links={results.map(r => ({ text: r.title, href: r.link }))}
					className={{ link: 'px-0' }}
					layout='cols'
				/>
			)}
		</DynamicItems>
	</nav>
)

const Contact = () => (
	<div className={cn('w-full max-w-3xs self-center', spaceY.md)}>
		<div className={spaceY['4xs']}>
			<h3 className='__sm'>Get In Touch</h3>
			<p className='__sm'>
				Questions • Concerns • Ready for eye care now?
			</p>
		</div>
		<Button
			color='accent'
			cta={true}
			link={{
				href: '/contact',
				text: 'Contact Us',
			}}
			arrow={{
				direction: 'upRight',
				loop: true,
			}}
			className='w-full'
		/>
	</div>
)

export { Footer }
