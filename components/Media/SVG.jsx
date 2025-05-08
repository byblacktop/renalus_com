'use client'

import { memo, useRef } from 'react'
import InlineSVG from 'react-inlinesvg'

import { slugify } from '@/lib/helpers'

const SVG = memo(
	({ src, preProcessor, onLoad, className, ...props }) => {
		const ref = useRef()

		if (!src) return

		const cleanSVG = svg => svg.replace(/fill=".*?"/g, '')
		// .replace(/width=".*?"/g, '')
		// .replace(/height=".*?"/g, '')

		return (
			<>
				<InlineSVG
					src={[src.url, '?url'].join('')}
					innerRef={ref}
					data-src={slugify(src.url)}
					uniqueHash={slugify(src.url)}
					// cacheRequests={true}
					preProcessor={cleanSVG}
					className={className}
					// fetchOptions={{
					// 	next: { tags: ['svg'] },
					// 	cache: 'force-cache',
					// }}
					{...props}
				/>
			</>
		)
	},
)

export { SVG }
