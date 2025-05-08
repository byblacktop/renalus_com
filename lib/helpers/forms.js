import { validArrData } from './arrays'

//// Form helpers
//
export const getOption = o =>
	typeof o === 'string' ? { label: o, value: o } : o

export const validateOptions = options => {
	if (validArrData(options)) return options

	if (typeof options === 'string' && options.includes(','))
		options.split(',').map(trim)

	return []
}

//// Form progress
//
export const getProgress = (curr, total) =>
	((curr + 1) / Math.max(0.1, total)) * 100

//// US states
//
export const US_STATES_KEYS = {
	AL: 'Alabama',
	AK: 'Alaska',
	AS: 'American Samoa',
	AZ: 'Arizona',
	AR: 'Arkansas',
	CA: 'California',
	CO: 'Colorado',
	CT: 'Connecticut',
	DE: 'Delaware',
	DC: 'District Of Columbia',
	FM: 'Federated States Of Micronesia',
	FL: 'Florida',
	GA: 'Georgia',
	GU: 'Guam',
	HI: 'Hawaii',
	ID: 'Idaho',
	IL: 'Illinois',
	IN: 'Indiana',
	IA: 'Iowa',
	KS: 'Kansas',
	KY: 'Kentucky',
	LA: 'Louisiana',
	ME: 'Maine',
	MH: 'Marshall Islands',
	MD: 'Maryland',
	MA: 'Massachusetts',
	MI: 'Michigan',
	MN: 'Minnesota',
	MS: 'Mississippi',
	MO: 'Missouri',
	MT: 'Montana',
	NE: 'Nebraska',
	NV: 'Nevada',
	NH: 'New Hampshire',
	NJ: 'New Jersey',
	NM: 'New Mexico',
	NY: 'New York',
	NC: 'North Carolina',
	ND: 'North Dakota',
	MP: 'Northern Mariana Islands',
	OH: 'Ohio',
	OK: 'Oklahoma',
	OR: 'Oregon',
	PW: 'Palau',
	PA: 'Pennsylvania',
	PR: 'Puerto Rico',
	RI: 'Rhode Island',
	SC: 'South Carolina',
	SD: 'South Dakota',
	TN: 'Tennessee',
	TX: 'Texas',
	UT: 'Utah',
	VT: 'Vermont',
	VI: 'Virgin Islands',
	VA: 'Virginia',
	WA: 'Washington',
	WV: 'West Virginia',
	WI: 'Wisconsin',
	WY: 'Wyoming',
}

export const US_STATES_VALUES = Object.entries(US_STATES_KEYS).reduce(
	(acc, [key, value]) => ({ ...acc, [value]: key }),
	{},
)
export const US_STATES = Object.entries(US_STATES_KEYS).map(
	([value, label]) => ({ label, value }),
)
