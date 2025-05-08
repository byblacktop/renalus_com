import { createClient as baseCreateClient } from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

import config from './slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
	process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
// TODO: Update the routes array to match your project's route structure.
const routes = [
	// Home page
	{
		type: 'page',
		uid: 'home',
		path: '/',
	},

	// Pages/Content with /slug
	{
		type: 'page',
		path: '/:uid',
	},
	{
		type: 'location',
		path: '/location/:uid',
	},
	{
		type: 'post',
		path: '/post/:uid',
	},
	{
		type: 'team',
		path: '/team/:uid',
	},
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {prismic.ClientConfig} config - Configuration for the Prismic client.
 */
const fetchOptions =
	process.env.NODE_ENV === 'production'
		? { next: { tags: ['prismic'] }, cache: 'force-cache' }
		: { next: { revalidate: 5 } }

export const createClient = (config = {}) => {
	const client = baseCreateClient(repositoryName, {
		routes,
		fetchOptions,
		...config,
	})

	enableAutoPreviews({
		client,
		previewData: config.previewData,
		req: config.req,
	})

	return client
}
