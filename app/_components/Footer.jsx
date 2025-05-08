import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Compose'
import { Logo } from '@/components/Media'
import { NavItems } from '@/components/NavItems'
import { Button, Divider, Flex, Grid } from '@/components/UI'
import { NAV } from '@/lib/sitemap'
import { spaceY } from '@/lib/tw'
import { cn } from '@/lib/utils'
import affiliateCareCredit from '@/img/affiliate__CareCredit.webp'
import affiliateVSP from '@/img/affiliate__VSP.jpg'
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

						<Grid as='div' cols={2} gap='sm'>
							<Sitemap />

							<Locations />
						</Grid>

						<Appointment />
					</Flex>
				</Container>
			</section>

			<section>
				<Container className='py-6 text-blue-50' layout='flex'>
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

const Affiliates = () => (
	<Flex items='center' justify='center'>
		<Link href='https://www.carecredit.com/apply/' target='_blank'>
			<Image
				unoptimized
				src={affiliateCareCredit}
				alt='Affiliate Care Credit'
				className='rounded-lg'
			/>
		</Link>
		<Link
			href='https://www.saveonvision.com/l/TERREZZAOP88/'
			target='_blank'
		>
			<Image
				unoptimized
				src={affiliateVSP}
				alt='Affiliate VSP Vision Plans'
				className='rounded-lg'
			/>
		</Link>
	</Flex>
)

const Newsletter = () => (
	<div className='max-w-5xl mx-auto'>
		<div className='grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8'>
			<h3 className='max-w-xl lg:col-span-7'>
				Want product news and updates? Sign up for our newsletter.
			</h3>
			<form className='w-full max-w-md lg:col-span-5 lg:pt-2 space-y-2'>
				<input
					type='hidden'
					name='ref'
					value='https://renalusoptical.com/'
				/>
				<div className='flex gap-x-2'>
					<label htmlFor='emailAddr' className='sr-only'>
						Email address
					</label>
					<input
						id='emailAddr'
						name='emailAddr'
						type='email'
						required
						placeholder='Enter your email'
						autoComplete='email'
						className='min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
					/>
					<button
						type='submit'
						className='flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
					>
						Subscribe
					</button>
				</div>

				<p className='__xs text-steel-400'>
					We care about your data. Read our{' '}
					<Link href='/privacy' className='font-semibold text-white'>
						privacy policy
					</Link>
					.
				</p>
			</form>
		</div>
	</div>
)

const Brand = () => (
	<div className={cn('w-full max-w-3xs', spaceY.xs)}>
		{/* Logo */}
		<Logo variant='light' size='w-24 md:w-32 xl:w-36' />

		{/* Brand Statement */}
		<p className='__sm'>
			We are a leading provider of comprehensive kidney care
			solutions, offering expert consultation, personalized treatment
			plans, and dialysis services.
		</p>
	</div>
)

const Sitemap = () => (
	<nav className={spaceY.xs}>
		<h4 className='__xs text-blue-50'>Explore Renalus</h4>
		<Divider color='blue-50' className='h-px' />
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
		<h4 className='__xs text-blue-50'>Renalus Locations</h4>
		<Divider color='blue-50' className='h-px' />
		<DynamicItems type='location'>
			{({ results }) => (
				<NavItems
					links={results.map(r => ({ text: r.title, href: r.link }))}
					className={{ link: 'pl-0' }}
					layout='cols'
				/>
			)}
		</DynamicItems>
	</nav>
)

const Appointment = () => (
	<div className={cn('w-full max-w-3xs self-center', spaceY.md)}>
		<div className={spaceY['4xs']}>
			<h3 className='__sm'>Get In Touch</h3>
			<p className='__sm'>
				Questions • Concerns • Appointment Request?
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
