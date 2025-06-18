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
						color: 'slate',
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
			},
		},
		{
			href: '/resources',
			text: 'Resources',
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
								text: 'Kidney Disease Diet',
								href: '/kidney-disease-diet',
							},
							{
								text: 'Kidney Friendly Recipes',
								href: '/kidney-friendly-recipes',
							},
						],
					},

					kidney101: {
						label: 'Kidney 101',
						links: [
							{
								text: 'Chronic Kidney Disease Info',
								href: '/chronic-kidney-disease-info',
							},
							{
								text: 'CKD - Mineral and Bone Disorder Information',
								href: '/ckd-mineral-bone-disorder-information',
							},
							{
								text: 'Health Tips for People with CKD',
								href: '/health-tips-for-people-with-ckd',
							},
						],
					},

					patient: {
						label: 'Patient Resources',
						links: [
							{ href: '/faqs', text: 'FAQs' },
							{ href: '/new-patients', text: 'New Patients' },
							{
								href: 'https://www.mymedicallocker.com/mml/login.html',
								text: 'Patient Portal',
								target: '_blank',
							},
							{ href: '/privacy', text: 'Privacy Policy' },
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
