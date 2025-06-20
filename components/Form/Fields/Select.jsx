'use client'

import { Fragment, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from '@headlessui/react'
import {
	CheckIcon,
	ChevronUpDownIcon,
} from '@heroicons/react/24/outline'
import { useFormContext } from 'react-hook-form'

import { Body } from '@/components/Content'
import { FieldError, Label } from '@/components/Form/Fields'
import {
	compareClean,
	invalidArrData,
	toTitleCase,
	validateOptions,
} from '@/lib/helpers'
import { cn } from '@/lib/utils'

const SelectInput = ({
	name,
	label,
	placeholder = 'Choose One',
	options,
	required,
	className,
	hideLabel = true,
	body,
}) => {
	label = label || toTitleCase(name)
	placeholder = placeholder || label
	options = validateOptions(options)

	const [selected, setSelected] = useState(placeholder)

	// Check URL params for default value
	const param = useSearchParams().get(name)
	const initialValue = param
		? options.find(o => compareClean(o, param))
		: ''

	const {
		register,
		getFieldState,
		setValue,
		formState: { errors },
	} = useFormContext()

	useEffect(() => {
		if (initialValue) setSelected(initialValue)
	}, [initialValue])

	useEffect(() => {
		const { error } = getFieldState(name)
		setValue(name, selected, {
			shouldValidate: error ? true : false,
		})
	}, [selected])

	// Bail if invalid
	if (invalidArrData(options)) return

	return (
		<div className={cn('relative field z-10', className)}>
			<Listbox value={selected} onChange={setSelected}>
				{/* Hidden input to hold form value */}
				<input
					type='hidden'
					id={name}
					{...register(name, {
						validate: {
							selectedValue: v => !placeholder || placeholder !== v,
						},
					})}
				/>

				{/* Label */}
				<Label
					name={name}
					label={label}
					required={required}
					className={hideLabel && 'sr-only'}
				/>

				<ListboxButton
					className={cn('block w-full', errors[name] && 'error')}
				>
					<Selected
						selected={selected}
						placeholder={placeholder}
						required={required}
					/>
				</ListboxButton>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<ListboxOptions
						data-lenis-prevent
						className={cn(
							'absolute left-0 max-h-60',
							'h6 bg-white rounded-lg overflow-y-auto',
							'shadow-lg shadow-slate/20',
							'focus:outline-none focus-visible:outline-none focus-within:outline-none',
						)}
					>
						{options.map((option, i) => (
							<OptionItem key={option} option={option} />
						))}
					</ListboxOptions>
				</Transition>
				<FieldError status={errors[name]} />
			</Listbox>

			{/* Helper Text */}
			<Body body={body} className='__xs' />
		</div>
	)
}

const Selected = ({ selected, placeholder, required }) => {
	return (
		<>
			<span
				className={cn(
					'input truncate w-full text-left normal-case tracking-normal',
					selected === placeholder ? 'text-slate/50' : 'text-fg',
				)}
			>
				{selected}
				{required && selected === placeholder && <em> *</em>}
			</span>

			<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
				<ChevronUpDownIcon
					className='w-5 h-5 text-zinc-400'
					aria-hidden='true'
				/>
			</span>
		</>
	)
}

const OptionItem = ({ option }) => (
	<ListboxOption
		className={({ selected }) =>
			cn(
				'relative',
				'py-2.5 md:py-3 xl:py-4',
				'px-6 md:px-8 xl:px-10',
				'whitespace-nowrap cursor-pointer',
				'border-b border-slate-800/10 last-of-type:border-none',
				'bg-transparent hover:bg-green/10',
				'text-zinc-700',
				'data-active:text-slate-900 data-active:bg-zinc-50',
				selected && 'bg-slate-50/50',
			)
		}
		value={option}
	>
		{({ selected }) => (
			<>
				<span
					className={cn('block truncate', selected && 'font-medium')}
				>
					{option}
				</span>

				{/* Check Icon -- if selected */}
				<ItemSelectedIcon selected={selected} />
			</>
		)}
	</ListboxOption>
)

const ItemSelectedIcon = ({ selected }) =>
	selected && (
		<span
			className={cn('absolute inset-y-0 left-2 flex items-center')}
		>
			<CheckIcon
				className='w-4 h-4 p-0.5 text-white bg-slate-500 rounded-full overflow-hidden'
				aria-hidden='true'
			/>
		</span>
	)

export { SelectInput }
