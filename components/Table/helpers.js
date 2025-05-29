// import {
// 	AddressInput,
// 	CheckboxInput,
// 	DateInput,
// 	PhoneInput,
// 	RadioInput,
// 	Select,
// 	Selection,
// 	SwitchInput,
// 	TextArea,
// 	TextInput,
// 	TextMask,
// } from '@/components/form'
import {
	invalidArrData,
	unslug,
	validArrObjectData,
} from '@/lib/helpers'

// Field Input types
// const inputs = {
// 	default: TextInput,
// 	text: TextInput,
// 	hidden: TextInput,
// 	number: TextInput,
// 	tel: TextInput,
// 	phone: PhoneInput,
// 	address: AddressInput,
// 	email: TextInput,
// 	textarea: TextArea,
// 	select: Select,
// 	selection: Selection,
// 	radio: RadioInput,
// 	checkbox: CheckboxInput,
// 	switch: SwitchInput,
// 	date: DateInput,
// 	mask: TextMask,
// }

// export const getInput = type => inputs[type || 'default']

//// Functions
//
export const getDataCols = cols => {
	if (validArrObjectData(cols)) return cols

	if (invalidArrData(cols)) return []

	if (typeof cols[0] === 'string')
		return cols.map(c => ({ accessorKey: c, label: unslug(c) }))

	return []
}

export const getLabel = (column, label) =>
	label ?? column.columnDef?.label ?? unslug(column.id)

export const pageCount = (rowCount, rowsPerPage) =>
	Math.ceil(rowCount / rowsPerPage)

export const pageList = pages =>
	Array(pages)
		.fill(null)
		.map((_, i) => i + 1)
		.filter((_, i) => (pages < 10 ? true : i < 8 || i > pages - 3))

//// Output Components
//

//// Default Values
//
// const dbParams = {
// 	text: { type: 'text', default: '' },
// 	date: { type: 'date', default: new Date().toISOString() },
// 	number_0: {
// 		type: 'text',
// 		default: 0,
// 		dbFormat: value => Number(value),
// 	},
// 	number_1: {
// 		type: 'text',
// 		default: 1,
// 		dbFormat: value => Number(value),
// 	},
// 	hidden: {
// 		type: 'hidden',
// 		default: 1,
// 		dbFormat: value => Number(value),
// 		props: {
// 			type: 'hidden',
// 		},
// 	},
// }

// export const requiredValues = {
// 	projects: {
// 		name: dbParams.text,
// 		bid_date: dbParams.date,
// 	},

// 	quotes: {
// 		name: dbParams.text,
// 		bid_date: dbParams.date,
// 	},

// 	contact_companies: {
// 		name: dbParams.text,
// 		type_id: dbParams.hidden,
// 	},

// 	contact_people: {
// 		first_name: dbParams.text,
// 		last_name: dbParams.text,
// 	},

// 	inventory_items: {
// 		number: dbParams.text,
// 		name: dbParams.text,
// 		// vendor_id: dbParams.number_0,
// 	},

// 	invoices: {
// 		order_number: dbParams.text,
// 		job_name: dbParams.text,
// 		// contact_company_id: dbParams.number_0,
// 	},

// 	purchase_orders: {
// 		invoice_number: dbParams.text,
// 		order_number: dbParams.text,
// 		// vendor_id: dbParams.number_0,
// 	},

// 	inventory_returns: {
// 		contact_company_id: dbParams.number_0,
// 		warehouse_id: dbParams.number_1,
// 	},

// 	item_templates: {
// 		model: dbParams.text,
// 		name: dbParams.text,
// 	},

// 	office_events: {
// 		title: dbParams.text,
// 		start_at: dbParams.date,
// 		end_at: dbParams.date,
// 		all_day: dbParams.number_0,
// 	},
// }

export const getRequiredProps = model =>
	model in requiredValues ? requiredValues[model] : {}

export const getRequiredFields = model => {
	const fields = Object.entries(getRequiredProps(model))

	return {
		defaultValues: fields.reduce(
			(acc, [key, field]) => ({ ...acc, [key]: field.default }),
			{},
		),
		fields: fields.map(([key, field]) => ({ key, ...field })),
	}
}

//// Export utilities
//
//// TODO: See if these are helpful
// export const getCsv = (data, header, fileName) => {
//   const contentHeader = (header ? `${header.map(e => e.name).join(';')}\n` : '');
//   const content = `${contentHeader}${data.map(e => Utilities.concat.csv(e)).join('\n')}`;

//   return {
//     content,
//     type: 'text/csv',
//     name: `${fileName || document.title}.csv`,
//   };
// };

// const getExcel = (data, header, fileName) => {
//   const contentHeader = (header ? `<thead><tr><td>${header.map(e => e.name).join('</td><td>')}</td><tr></thead>` : '');
//   const contentBody = data.map(e => Utilities.concat.excel(e));
//   const content = `<table>${contentHeader}<tbody>${contentBody.join('')}</tbody></table>`;

//   return {
//     content,
//     type: 'application/vnd.ms-excel',
//     name: `${fileName || document.title}.xls`,
//   };
// };

// const getPrint = (data, header) => {
//   const { content } = excel(data, header);

//   const style = '\n' +
//     'body, table { \n' +
//     'font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; \n' +
//     'font-size:12px \n' +
//     '}\n' +
//     'table {\n' +
//     'width: 100%;\n' +
//     '}\n' +
//     'thead {\n' +
//     'font-weight: bold;\n' +
//     '}';
//   return `<style>${style}</style>${content}`;
// };
