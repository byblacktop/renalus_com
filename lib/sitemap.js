import { PATIENT_PORTAL_URL } from '@/lib/constants'
import { LOCATIONS } from '@/lib/static'

//// Menu and Navigation
//
export const NAV = {
	primary: [
		{
			href: '/about',
			text: 'About',
		},
		{
			href: '/team',
			text: 'Team',
		},
		{
			href: '/expertise',
			text: 'Expertise',
			subnav: {
				className: 'columns-2',
				links: [
					{
						href: '/comprehensive-eye-exams',
						text: 'Comprehensive Eye Exams',
					},
					{
						href: '/contact-lens-fittings',
						text: 'Contact Lens Fittings',
					},
					{ href: '/emergency-eye-care', text: 'Emergency Eye Care' },
					{
						href: '/eyeglass-prescriptions',
						text: 'Eyeglass Prescriptions',
					},
					{ href: '/pediatric-eye-care', text: 'Pediatric Eye Care' },
					{
						href: '/specialized-eye-exams',
						text: 'Specialized Eye Exams',
					},
					{
						href: '/specialized-testing',
						text: 'Specialized Testing',
					},
					{
						link: { href: '/expertise', text: 'View All Services' },
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
			href: '/locations',
			text: 'Locations',
			subnav: {
				className: 'columns-2',
				layout: 'locations',
				links: LOCATIONS,
			},
		},
		{
			href: '/resources',
			text: 'Resources',
			subnav: {
				links: [
					{
						href: '/resources',
						text: 'Patient Information',
					},
					{ href: '/faqs', text: 'FAQs' },
					{ href: '/new-patients', text: 'New Patients' },
					{ href: PATIENT_PORTAL_URL, text: 'Patient Portal' },
				],
			},
		},
	],

	cta: {
		pay: {
			href: 'https://www.mymedicallocker.com/mml/login.html',
			text: 'Bill Pay',
		},
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
