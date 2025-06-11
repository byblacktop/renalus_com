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
			href: '/treatment',
			text: 'Treatment',
			subnav: {
				layout: 'groups',
				links: {
					// Conditions We Treat
					conditions: {
						label: 'Conditions We Treat',
						links: [
							{
								text: 'Chronic Kidney Disease',
								href: '/chronic-kidney-disease',
							},
							{
								text: 'Proteinuria and Hematuria',
								href: '/proteinuria-and-hematuria',
							},
							{
								text: 'Glomerular Diseases',
								href: '/glomerular-diseases',
							},
							{
								text: 'Electrolyte and Fluid Imbalances',
								href: '/electrolyte-and-fluid-imbalances',
							},
							{
								text: 'End-Stage Renal Disease',
								href: '/end-stage-renal-disease',
							},
							{
								text: 'Polycystic Kidney Disease',
								href: '/polycystic-kidney-disease',
							},
							{
								text: 'Kidney Stones Hypertension',
								href: '/kidney-stones-hypertension',
							},
							{
								text: 'Acute Kidney Injury',
								href: '/acute-kidney-injury',
							},
						],
					},

					// Treatment Services
					treatments: {
						label: 'Treatment Services',
						links: [
							{
								text: 'Comprehensive Kidney Care & Disease Management',
								href: '/comprehensive-kidney-care-and-disease-management',
							},
							{
								text: 'Dialysis Services (Hemodialysis & Peritoneal Dialysis)',
								href: '/dialysis-services-hemodialysis-and-peritoneal-dialysis',
							},
							{
								text: 'Hypertension Management',
								href: '/hypertension-management',
							},
							{
								text: 'Kidney Stone Prevention & Treatment',
								href: '/kidney-stone-prevention-and-treatment',
							},
							{
								text: 'Home Dialysis Education & Support',
								href: '/home-dialysis-education-and-support',
							},
							{
								text: 'Kidney Transplant Evaluation & Post-Transplant',
								href: '/kidney-transplant-evaluation-and-post-transplant',
							},
							{
								text: 'Care Outpatient & Inpatient Consultations',
								href: '/care-outpatient-and-inpatient-consultations',
							},
							{
								text: 'Nutritional Counseling for Kidney Health',
								href: '/nutritional-counseling-for-kidney-health',
							},
						],
					},
				},
				cta: [
					{
						link: {
							href: '/treatment',
							text: 'View All TreatmentConditions & Services',
						},
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
				layout: 'locations',
				links: [],
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
					{
						href: 'https://www.mymedicallocker.com/mml/login.html',
						text: 'Patient Portal',
						target: '_blank',
					},
				],
			},
		},
	],

	cta: {
		portal: {
			href: 'https://www.mymedicallocker.com/mml/login.html',
			text: 'Patient Portal & Bill Pay',
		},
		primary: {
			href: '/contact',
			text: 'Contact Us',
		},
	},
}
