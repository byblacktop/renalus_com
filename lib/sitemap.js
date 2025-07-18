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
								text: 'Acute Kidney Injury',
								href: '/acute-kidney-injury',
							},
							{
								text: 'Hypertension',
								href: '/hypertension',
							},
							{
								text: 'Polycystic Kidney Disease',
								href: '/polycystic-kidney-disease',
							},
							{
								text: 'End-Stage Renal Disease',
								href: '/end-stage-renal-disease',
							},
							{
								text: 'Electrolyte & Fluid Imbalances',
								href: '/electrolyte-fluid-imbalances',
							},
							{
								text: 'Glomerular Diseases',
								href: '/glomerular-diseases',
							},
							{
								text: 'Proteinuria & Hematuria',
								href: '/proteinuria-hematuria',
							},
						],
					},

					// Treatment Services
					treatments: {
						label: 'Treatment Services',
						links: [
							{
								text: 'Comprehensive Kidney Care & Disease Management',
								href: '/comprehensive-kidney-care-disease-management',
							},
							{
								text: 'Dialysis Services',
								href: '/dialysis-services',
							},
							{
								text: 'Hypertension Management',
								href: '/hypertension-management',
							},
							{
								text: 'End Stage Renal Disease Education & Support',
								href: '/end-stage-renal-disease-education-support',
							},
							{
								text: 'Kidney Transplant Evaluation & Post-Transplant Care',
								href: '/kidney-transplant-evaluation-post-transplant-care',
							},
							{
								text: 'Outpatient & Inpatient Consultations',
								href: '/outpatient-inpatient-consultations',
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
							text: 'View All Treatment Conditions & Services',
						},
						variant: 'flat',
						color: 'primary',
						className: 'ml-auto',
						arrow: {
							default: true,
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
				cta: [
					{
						link: {
							href: '/locations',
							text: 'View All Locations',
						},
						variant: 'flat',
						color: 'primary',
						className: 'ml-auto',
						arrow: {
							default: true,
						},
					},
				],
			},
		},
		{
			text: 'Resources',
			href: '/resources',
			subnav: {
				layout: 'groups',
				className: 'grid-cols-3',
				links: {
					education: {
						label: 'Healthy Living',
						links: [
							{
								text: 'Kidney Disease Prevention',
								href: '/kidney-disease-prevention',
							},

							{
								text: 'Maintaining a Healthy Lifestyle',
								href: '/maintaining-a-healthy-lifestyle',
							},
							{
								text: 'Kidney Friendly Recipes',
								href: '/recipes',
							},

							{
								text: 'Getting Started',
								href: '/healthy-living',
								variant: 'stroke',
								color: 'blue',
								arrow: {
									default: true,
								},
								className: {
									li: 'mt-auto',
									btn: 'w-auto mt-3',
								},
							},
						],
					},

					kidney101: {
						label: 'Kidney 101',
						links: [
							{
								text: 'How Your Kidneys Work',
								href: '/how-your-kidneys-work',
							},

							{
								text: 'Chronic Kidney Disease Explained',
								href: '/chronic-kidney-disease-explained',
							},
							{
								text: 'Living Well with CKD',
								href: '/living-well-with-ckd',
							},
							{
								text: 'View All Resources',
								href: '/kidney-101',
								variant: 'stroke',
								color: 'blue',
								arrow: {
									default: true,
								},
								className: {
									li: 'mt-auto',
									btn: 'w-auto mt-3',
								},
							},
						],
					},

					patient: {
						label: 'Patient Resources',
						links: [
							{
								text: 'FAQs',
								href: '/faq',
							},
							{
								text: 'New Patients',
								href: '/new-patients',
							},
							{
								text: 'Privacy Notice',
								href: '/privacy',
							},

							{
								href: 'https://www.mymedicallocker.com/mml/login.html',
								text: 'Patient Portal',
								target: '_blank',
								variant: 'stroke',
								color: 'blue',
								arrow: {
									default: true,
								},
								className: {
									li: 'mt-auto',
									btn: 'w-auto mt-3',
								},
							},
						],
					},
				},
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
