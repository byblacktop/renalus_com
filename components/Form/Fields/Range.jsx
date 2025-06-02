import { useFormContext, useWatch } from 'react-hook-form'

import { cn } from '@/lib/utils'

const Range = ({
	id,
	name,
	label,
	min,
	max,
	step,
	prefix,
	suffix,
	wrapperProps,
}) => {
	name = name ?? id
	id = id ?? name

	const { register } = useFormContext()
	const value = useWatch({ name })

	return (
		<div
			className={cn('flex items-center gap-2 mg:gap-3', wrapperProps)}
		>
			<label htmlFor={id} className='sr-only'>
				{label}
			</label>

			{/* Min value */}
			<h6>{[prefix, min, suffix].join('')}</h6>

			<div className='relative grow'>
				{/* Range selector */}
				<input
					id={id}
					type='range'
					min={min}
					max={max}
					step={step}
					className='w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer p-0'
					{...register(name)}
				/>

				{/* Value display */}
				<div
					className='absolute -bottom-10 pointer-events-none'
					style={{
						left: [(value / (max - min)) * 100, '%'].join(''),
					}}
				>
					<h6 className='-translate-x-1/4 font-bold'>
						{[prefix, value, suffix].join('')}
					</h6>
				</div>
			</div>

			{/* Max value */}
			<h6>{[prefix, max, suffix, '+'].join('')}</h6>
		</div>
	)
}
export { Range }
