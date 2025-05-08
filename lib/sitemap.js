import { LOCATIONS } from '@/lib/static'

//// Menu and Navigation
//
export const NAV = {
	primary: [
		{
			href: '/about',
			text: 'About',
			subnav: {
				cols: 1,
				links: [
					{ href: '/about', text: 'Who We Are', id: 1 },
					{
						href: '/about#renalus-values',
						text: 'Our Values',
						id: 2,
					},
					{
						href: '/about#our-doctors',
						text: 'Our Doctors',
						id: 3,
					},
					{ href: '/about#meet-our-staff', text: 'Our Staff', id: 4 },
				],
			},
		},
		{
			href: '/services',
			text: 'Services',
			subnav: {
				cols: 2,
				links: [
					{
						href: '/comprehensive-eye-exams',
						text: 'Comprehensive Eye Exams',
					},
					{
						href: '/specialized-eye-exams',
						text: 'Specialized Eye Exams',
					},
					{
						href: '/contact-lens-fittings',
						text: 'Contact Lens Fittings',
					},
					{
						href: '/eyeglass-prescriptions',
						text: 'Eyeglass Prescriptions',
					},
					{ href: '/pediatric-eye-care', text: 'Pediatric Eye Care' },
					{
						href: '/specialized-testing',
						text: 'Specialized Testing',
					},
					{ href: '/emergency-eye-care', text: 'Emergency Eye Care' },
					{
						link: { href: '/services', text: 'View All Services' },
						variant: 'stroke',
						color: 'primary',
						className: 'w-auto',
						arrow: {
							direction: 'right',
						},
					},
				],
			},
		},
		{
			href: '/products',
			text: 'Products',
			subnav: {
				cols: 1,
				links: [
					{ href: '/products', text: 'Glasses & Accessories' },
					{ href: '/contacts', text: 'Contact Lenses' },
					{ href: '/brands', text: 'Our Brands' },
				],
			},
		},
		{
			href: '/locations',
			text: 'Locations',
			subnav: {
				cols: 2,
				layout: 'locations',
				links: LOCATIONS,
			},
		},
		{
			href: '/patient-information',
			text: 'Resources',
			subnav: {
				cols: 1,
				links: [
					{
						href: '/patient-information',
						text: 'Patient Information',
					},
					{ href: '/media', text: 'Media' },
					{ href: '/latest', text: 'News & Events' },
				],
			},
		},
	],

	cta: {
		portal: {
			href: 'https://www.revolutionphr.com/portal/welcome.htm;jsessionid=083097B222E14931949E358CB1C4BD5',
			text: 'Patient Portal',
		},
		primary: {
			href: '/contact',
			text: 'Contact Us',
		},
	},
}
