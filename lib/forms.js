import { SITE_NAME } from './constants'

export const contact = {
	to: [
		`${SITE_NAME} Webmaster <ralph@blacktop.me>`,
		`${SITE_NAME} Admin <info@renalus.com>`,
	],
	from: `${SITE_NAME} <contact@send.blacktop.me>`,

	fields: [
		{
			type: 'text',
			label: 'Name',
			placeholder: 'John Doe',
			required: true,
		},
		{
			type: 'text',
			label: 'Email',
			placeholder: 'name@mail.com',
			required: true,
		},
		{
			type: 'text',
			label: 'Phone',
			placeholder: '(123) 456-7890',
		},
		{
			type: 'select',
			label: 'Location',
			options: [
				'Palafox',
				'Fairfield',
				'Baptist Hospital',
				'Foley',
				'Milton',
				'Nine Mile Crossing',
				'Navarre',
				'Fairhope',
			],
		},
		{
			type: 'textarea',
			name: 'message',
			label: 'How can we help?',
			placeholder: `Hello, ${SITE_NAME}`,
			stretch: true,
		},
	],
}
