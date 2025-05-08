import { slugify } from '@/lib/helpers'

const RadioNative = ({ id, name, options, required = false }) => {
	name = name ?? id
	id = id ?? name

	return options.map(o => {
		const { label, value } =
			typeof o === 'string' ? { label: o, value: slugify(o) } : o

		return (
			<div key={value} className='flex items-start gap-2'>
				<input
					type='radio'
					name={name}
					id={value}
					value={value}
					required={required}
					className='relative top-1'
				/>
				<label htmlFor={value}>{label}</label>
			</div>
		)
	})
}
export { RadioNative }
