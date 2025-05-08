import { LinkShell, Shell } from '@/components/Compose'
import { Prose } from '@/components/Content'
import {
	invalidArrObjectData,
	validArrObjectData,
} from '@/lib/helpers'
import { cp } from '@/lib/utils'

const GridItems = ({ items, className, ...props }) => (
	<Shell
		as={validArrObjectData(items) && ItemList}
		items={items}
		className={className}
		{...props}
	/>
)

const ItemList = ({ items, className }) => {
	if (invalidArrObjectData(items)) return

	return (
		<>
			{items?.map((item, idx) => (
				<LinkShell
					key={`__item_${idx}`}
					as='dd'
					className={cp(className, 'items', true)}
				>
					<Prose gap='2xs' {...item} />
				</LinkShell>
			))}
		</>
	)
}

export { GridItems }
