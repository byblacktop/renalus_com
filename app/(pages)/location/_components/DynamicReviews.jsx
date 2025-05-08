'use client'

import { Suspense } from 'react'
import Script from 'next/script'

// import axios from 'axios'
import { Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { invalidString } from '@/lib/helpers'

const ReviewList = ({ rid }) => {
	return (
		<>
			<Script
				id='js_jquery'
				src='https://code.jquery.com/jquery-3.5.1.min.js'
				strategy='afterInteractive'
			/>
			<Script
				id='js_doctible'
				src='https://www.doctible.com/v1/widget.js'
				strategy='lazyOnload'
				onReady={() => {
					jQuery(function ($) {
						$('#review-widget').reviewWidget({
							id: `${rid}`,
							format: 'full',
							locationNameColor: 'hsl(214, 67%, 34%)',
							titleBGColor: 'transparent',
							titleColor: 'hsl(202, 60%, 12%)',
						})
					})
				}}
			/>

			<div id='review-widget' />
		</>
	)
}

export { ReviewList }
