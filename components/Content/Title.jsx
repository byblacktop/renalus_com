import { PrismicRichText } from '@prismicio/react'

import { Shell } from '@/components/Compose'
import { invalidContent, invalidContentObject } from '@/lib/helpers'

const headings = {
	h1: 'heading1',
	h2: 'heading2',
	h3: 'heading3',
	h4: 'heading4',
	h5: 'heading5',
	h6: 'heading6',
	p: 'paragraph',
}

const Title = ({ title, as, wrap = false, className, children }) => {
	if (invalidContent(title)) return

	if (typeof title === 'string')
		return (
			<Shell as={as || 'h2'} className={className}>
				<Shell as={wrap}>{title}</Shell>
				{children}
			</Shell>
		)

	if (invalidContentObject(title)) return

	// Adds classes to dom (if necessary)
	// Avoids creating unnecessary wrapper div
	const renderTitle = (type, node, text, children, key) => {
		const [tag] =
			Object.entries(headings).find(([_, value]) => value === type) ??
			[]

		if (!tag) return null

		return (
			<Shell as={tag} className={className}>
				<Shell as={wrap && 'span'}>{children}</Shell>
			</Shell>
		)
	}

	// Set tag in case we're trying to overwrite it
	if (as) title.map(t => (t.type = headings[as] ?? t.type))

	return (
		<PrismicRichText
			field={title}
			components={(wrap || className) && renderTitle}
		/>
	)
}

export { Title }
