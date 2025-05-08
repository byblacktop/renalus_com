/** @type {import('next').NextConfig} */
import vercelToolbar from '@vercel/toolbar/plugins/next'

import { LOCATIONS } from './lib/static.mjs'

const withVercelToolbar = vercelToolbar()

const nextConfig = {
	//// Image patterns
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '**.prismic.io' },
			{ protocol: 'https', hostname: '**.unsplash.com' },
			{ protocol: 'https', hostname: '**.cdninstagram.com' },
			{ protocol: 'https', hostname: '**.ytimg.com' },
		],
	},

	//// Turbopack
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				issuer: /\.js$/,
				as: '*.js',
			},
		},
	},

	//// Webpack
	//// TOODO: Remove if turbopack is working
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: {
					not: [...fileLoaderRule.resourceQuery.not, /url/],
				}, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			},
		)

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},

	//// Redirects
	async redirects() {
		return LOCATIONS.map(({ href }) => ({
			source: href.replace('/location', ''),
			destination: href,
			permanent: true,
		}))
	},
}

export default withVercelToolbar(nextConfig)
