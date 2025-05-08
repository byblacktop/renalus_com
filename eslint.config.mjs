import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [
	...compat.extends('next/core-web-vitals', 'prettier'),
	{
		files: ['**/*.{js,jsx,ts,tsx}'],

		settings: {
			next: {
				rootDir: ['./'],
			},
		},

		rules: {
			'react/display-name': 0,
			'react/no-unescaped-entities': 0,
			'react-hooks/exhaustive-deps': 0,
		},

		ignores: [
			'node_modules/',
			'.next/',
			'.husky/',
			'*.lock',
			'*-lock*',
			'public/',
			'__*',
			'~*',
		],
	},
]
