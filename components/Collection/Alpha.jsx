import { Fragment } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { asText } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'

import { Section } from '@/components/Compose'
import { Body, ProseSplit } from '@/components/Content'
import { Flex } from '@/components/UI'
import {
	getTheme,
	invalidArrObjectData,
	invalidObjectKeys,
	invalidString,
	validObjectKeys,
} from '@/lib/helpers'
import { gap, spaceY } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'
import DynamicLinks from './DynamicLinks'

const getItems = ({ body }) => {
	if (invalidObjectKeys(body, 'rows')) return {}

	const { rows } = body

	if (invalidArrObjectData(rows)) return {}

	return rows.reduce((acc, row) => {
		const { cells } = row

		if (invalidArrObjectData(cells)) return acc

		const header = cells[0]
		const data = cells[1]

		if (
			invalidObjectKeys(header, 'content') ||
			invalidObjectKeys(data, 'content')
		)
			return acc

		const label = asText(header.content)
		const content = asText(data.content)

		acc[label] = content

		return acc
	}, {})
}

const sortList = list =>
	Object.fromEntries(
		Object.entries(list).sort(([a], [b]) => a.localeCompare(b)),
	)

const CollectionAlpha = ({
	items,
	cols,
	color,
	dataset,
	link,
	text,
	featured,
	...contentProps
}) => {
	const list = sortList(getItems(items))

	// Track alphabetical group
	let group = ''

	return (
		<Section
			container
			layout='stack'
			gap='xl'
			dataset={dataset}
			className={cn(
				'relative z-10 rounded-4xl overflow-hidden',
				'm-4 md:m-6',
				getTheme(color).className,
			)}
		>
			{/* Intro Lead Content */}
			<ProseSplit {...contentProps} />

			{/* List Items */}
			<PopoverGroup
				className={cn(
					'columns-2 sm:columns-3 lg:columns-4',
					gap.prose,
				)}
			>
				{Object.entries(list).map(([label, content]) => {
					const currGroup = label.charAt(0).toUpperCase()
					const heading = currGroup === group ? '' : currGroup
					group = currGroup

					return (
						<Fragment key={label}>
							<GroupHeading heading={heading} />
							<Group
								label={label}
								content={content}
								heading={heading}
							/>
						</Fragment>
					)
				})}
			</PopoverGroup>
		</Section>
	)
}

const GroupHeading = ({ heading }) => {
	if (invalidString(heading)) return null

	return (
		<div className='border-b border-slate/20 pb-2 mb-2 not-first:mt-8'>
			<h4 className='text-slate'>{heading}</h4>
		</div>
	)
}

const Group = ({ label, content, heading }) => {
	return (
		<Popover key={label}>
			<PopoverButton
				key={`${label}__trigger`}
				className={cn(
					'group relative w-[calc(100%+1rem)] -mx-2 px-2 py-0.5',
					'rounded-lg whitespace-nowrap',
					'bg-slate-50/0 hover:bg-slate-50',
					'flex items-center justify-between',
					'focus:outline-none data-focus:outline data-focus:outline-transparent',
					gap['2xs'],
				)}
			>
				<span>{label}</span>
				<PlusIcon
					className={cn(
						'size-4.5 p-0.5 bg-white rounded-full',
						'opacity-0 group-hover:opacity-100',
						'-rotate-90 group-hover:rotate-0',
						'transition-all',
					)}
				/>
			</PopoverButton>

			<PopoverPanel
				key={`${label}__panel`}
				// transition
				anchor='bottom'
				className={cn(
					'p-3 md:p-4',
					'bg-white rounded-2xl shadow-2xl',
					// 'duration-300 ease-out origin-top',
					'data-closed:scale-95 data-closed:opacity-0',
					'[--anchor-gap:--spacing(0.5)] data-closed:-translate-y-1',
				)}
			>
				<div className='w-full max-w-sm'>
					<Body body={content} />
				</div>
			</PopoverPanel>
		</Popover>
	)
}

const items = [
	{
		title: 'Access',
		content:
			'in dialysis, the point on the body where a needle or catheter is inserted. See arteriovenous fistula graft, vascular access, and catheter.',
	},

	{
		title: 'ACE Inhibitor',
		content:
			'a medication that lowers blood pressure. ACE stands for angiotensin-converting enzyme. This medication also slows down kidney damage.',
	},

	{
		title: 'Acute',
		content:
			'a condition that happens suddenly and is brief in appearance. This condition is the opposite of chronic conditions.',
	},

	{
		title: 'Acute Kidney Injury',
		content: 'a sudden and temporary loss of kidney function.',
	},

	{
		title: 'Acute Tubular Necrosis (ATN)',
		content:
			'a severe form of acute kidney injury that develops when a person is a victim of a severe illness, infection, or has low blood pressure. Kidney function usually improves if the underlying disease is treated properly.',
	},

	{
		title: 'Antidiuretic Hormone (ADH)',
		content:
			'a natural body chemical that slows down the body’s production of urine. Sometimes children lack normal amounts of this hormone leading to bed wetting.',
	},

	{
		title: 'Albumin',
		content:
			'the major protein in blood. Large amounts of this protein in your urine may be a sign of chronic kidney disease. See urine albumin-to-creatinine ratio.',
	},

	{
		title: 'Albuminuria',
		content:
			'a condition in which your urine has more than the normal amounts of albumin. This may be a sign of kidney disease.',
	},

	{
		title: 'Allograft',
		content:
			'an organ or tissue transplant from one human to another.',
	},

	{
		title: 'Alport Syndrome',
		content:
			'a genetic disorder that affects the cell membranes of your kidneys. It usually develops during early childhood. The condition can lead to end-stage renal disease. Symptoms are chronic blood and protein in urine.',
	},

	{
		title: 'Amino Acids',
		content: 'the basic building blocks of proteins.',
	},

	{
		title: 'Amyloidosis',
		content:
			'a condition in which a protein-like material builds up in one or more organs. In kidneys, amyloidosis can lead to proteinuria, nephrotic syndrome, and kidney failure.',
	},

	{
		title: 'Analgesic-Associated Kidney Disease',
		content:
			'loss of kidney function that results from long-term use of pain-relieving medications.',
	},

	{
		title: 'Anemia',
		content:
			'a condition in which the number of red blood cells is lower than average. This results in less oxygen being carried to the body’s cells and can cause extreme fatigue.',
	},

	{
		title: 'Angiotensin',
		content:
			'a substance in your blood that causes blood vessels to constrict, raising your blood pressure.',
	},

	{
		title: 'Antibiotic',
		content: 'a medication that kills bacteria.',
	},

	{
		title: 'Anuria',
		content: 'a condition in which your body stops making urine.',
	},

	{
		title: 'Angiotensin Receptor Blocker (ARB)',
		content: 'an oral medication that lowers your blood pressure.',
	},

	{
		title: 'Arteriovenous (AV) Fistula',
		content:
			'surgical connection of an artery directly to a vein for people who will need hemodialysis. AV fistula causes the vein to grow thicker, allowing the repeated needle insertions required for hemodialysis. This is the primary method of vascular access. See hemodialysis under dialysis for more information.',
	},

	{
		title: 'Arteriovenous (AV) Graft',
		content:
			'in hemodialysis, surgical connection of an artery to a vein using a soft, flexible tube, which can be used for repeated needle sticks. See hemodialysis under dialysis for more information.',
	},

	{
		title: 'Artery',
		content:
			'a large blood vessel that carries blood with oxygen from the heart to all parts of the body.',
	},

	{
		title: 'Artificial Kidney',
		content: 'another name for a dialyzer.',
	},

	{
		title: 'Autoimmune Disease',
		content:
			'a disorder in which the body’s immune system attacks and destroys body tissue instead of protecting the body from foreign substances, as it normally does. Examples are Goodpasture Syndrome and lupus erythematosus. See lupus nephritis.',
	},

	{
		title: 'Bacteria',
		content: 'tiny organisms that cause infection or disease.',
	},

	{
		title: 'Biopsy',
		content:
			'a procedure in which a tiny piece of tissue, such as from the kidney or bladder, is removed for examination with a microscope.',
	},

	{
		title: 'Bladder',
		content:
			'the balloon-shaped organ inside the pelvis that holds urine.',
	},

	{
		title: 'Blood Pressure',
		content:
			'the force of blood exerted on the inside walls of blood vessels. Blood pressure is expressed as two numbers. For example, a blood pressure result of 120/80 is said as “120 over 80.” The first number is systolic pressure, or the pressure when the heart pushes blood out into the arteries. The second number is the diastolic pressure, or the pressure when the heart rests.',
	},

	{
		title: 'Blood Urea Nitrogen (BUN)',
		content:
			'a waste product in the blood that comes from the breakdown of protein. The kidneys filter blood to remove urea. As kidney function decreases, the BUN level increases.',
	},

	{
		title: 'Bruit',
		content:
			'a whooshing sound made when blood flows through a narrow vessel. A bruit in your abdomen may be a sign of renal artery stenosis.',
	},

	{
		title: 'Calcitriol',
		content:
			'a hormone produced by the kidneys to help the body absorb dietary calcium into the blood and bones.',
	},

	{
		title: 'Calcium',
		content:
			'a mineral the body needs for strong bones and teeth. Under certain conditions, calcium may form stones in the kidney.',
	},

	{
		title: 'Calcium Oxalate Stone',
		content: 'a kidney stone made from calcium and oxalate.',
	},

	{
		title: 'Catheter',
		content:
			'a tube inserted through the skin into a blood vessel or cavity to draw out body fluid or infuse fluid. In peritoneal dialysis, a catheter is used to infuse dialysis solution into the abdominal cavity and drain it out again.',
	},

	{
		title: 'Chronic',
		content:
			'refers to disorders that last a long time, often years. Chronic kidney disease may develop over many years and lead to end-stage renal disease. Chronic is the opposite of acute, or brief.',
	},

	{
		title: 'Chronic Kidney Disease (CKD)',
		content:
			'any condition that causes reduced kidney function over a period of time. CKD is present when a patient’s glomerular filtration rate remains below 60 milliliters per minute for more than 3 months or when a patient’s urine albumin-to-creatinine ratio is over 30 milligrams of albumin for each gram of creatinine. CKD may develop over many years and lead to end-stage renal disease.',
	},

	{
		title:
			'Chronic Kidney Disease-Mineral and Bone Disorder (CKD-MBD)',
		content:
			'abnormal bone hormone levels caused by the failure of the diseased kidneys to maintain the proper levels of calcium and phosphorus in the blood. CKD-MBD results in weak bones, a condition known as renal osteodystrophy. CKD-MBD is a common problem in people with kidney disease and affects almost all patients receiving dialysis.',
	},

	{
		title: 'Congenital Nephrotic Syndrome',
		content:
			'a genetic kidney disease that develops before birth or in the first few months of life. Congenital nephrotic syndrome usually leads to end-stage renal disease and the need for dialysis or a kidney transplant by the second or third year of life.',
	},

	{
		title: 'Creatinine',
		content:
			'a waste product from protein in the diet and from the normal breakdown of muscles in the body. Creatinine is removed from blood by the kidneys; as kidney disease progresses, the level of creatinine in the blood increases.',
	},

	{
		title: 'Creatinine Clearance',
		content:
			'a test that measures how efficiently the kidneys remove creatinine from the blood. Low creatinine clearance indicates impaired kidney function.',
	},

	{
		title: 'Cross-Matching',
		content:
			'before a transplant, the donor’s blood is tested with the recipient’s blood to see whether they are compatible.',
	},

	{
		title: 'Cyst',
		content:
			'an abnormal sac containing gas, fluid, or a semisolid material. Cysts may form in the kidneys or in other parts of the body. See medullary sponge kidney, renal cysts, and polycystic kidney disease.',
	},

	{
		title: 'Cystine Stone',
		content:
			'a rare form of kidney stone consisting of the amino acid cystine.',
	},

	{
		title: 'Cystinuria',
		content:
			'a condition in which urine contains high levels of the amino acid cystine. If cystine does not dissolve in the urine, it can build up to form kidney stones.',
	},

	{
		title: 'Cystitis',
		content:
			'inflammation of the bladder, causing pain and a burning feeling in the pelvis or urethra.',
	},

	{
		title: 'Cystoscope',
		content:
			'a tubelike instrument used to look inside the urethra and bladder. The procedure is called cystoscopy.',
	},
]

export { CollectionAlpha }
