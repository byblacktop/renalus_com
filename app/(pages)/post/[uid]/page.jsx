import { getDoc, getMeta, getStaticParams } from '@/lib/api'
import { Body } from '@/posts/Body'
import { Hero } from '@/posts/Hero'
import { PodcastPlayer } from '@/posts/Podcast'
import { Related } from '@/posts/Related'

const links = {
	media: [{ href: '/articles', text: 'Back to All' }],
	article: [{ href: '/articles', text: 'Back to Latest' }],
}

const post = async ({ params }) => {
	const { uid } = await params
	const { body, ...post } = await getDoc('post', uid)
	const type = ['Podcast', 'Video'].some(tag =>
		post?.tags.includes(tag),
	)
		? 'media'
		: 'article'

	return (
		<>
			<Hero {...post} />

			<Body body={body} />

			<PodcastPlayer />

			<Related id={post?.id} links={links[type]} />
		</>
	)
}

export const generateStaticParams = async () =>
	await getStaticParams('post')

export const generateMetadata = async ({ params }) =>
	await getMeta(params, 'post')

export default post
