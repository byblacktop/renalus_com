import { SITE_NAME } from './constants'

export const contact = {
	to: [
		`${SITE_NAME} <ralph@blacktop.me>`,
		'Terreza Optical Admin <kat@terrezzaoptical.com>',
		'Terreza Optical Marketing <3125communications@gmail.com>',
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
				'Nine Mile Crossing',
				'Palafox',
				'Fairfield',
				'Baptist Hospital',
				'Milton',
				'Foley',
				'Fairhope',
				'Navarre',
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
