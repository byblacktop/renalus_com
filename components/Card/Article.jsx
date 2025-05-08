import { LinkShell } from '@/components/Compose'
import { Lead, Title } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Button, Flex } from '@/components/UI'
import { spaceY } from '@/lib/tw'
import { cn } from '@/lib/utils'

const CardArticle = ({ url, title, subtitle, img, tags }) => {
	const handleScroll = e => {
		e.currentTarget.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<LinkShell
			href={url}
			className={cn(
				'__article group flex h-full flex-col',
				spaceY.sm,
			)}
		>
			<AspectImage
				img={img}
				h={10}
				sizes='(min-width: 1680px) 720px, (min-width: 960px) 480px, (min-width: 680px) 340px, 100vw'
				className='overflow-hidden rounded-2xl'
				config={{
					widths: [340, 480, 720],
					fallback: true,
				}}
			/>

			<Flex
				layout='stack'
				justify='between'
				gap='2xs'
				className='px-4 grow'
			>
				<Lead
					title={tags.filter(Boolean).join(' • ')}
					subtitle={title}
					layout='stack'
					wrap={true}
					gap='2xs'
					as={{ title: 'h6', subtitle: 'h4' }}
					className={{
						lead: '__xs grow',
						title: 'text-blue',
					}}
				/>

				<PostFooter subtitle={subtitle} />
			</Flex>
		</LinkShell>
	)
}

const PostFooter = ({ subtitle }) => {
	return (
		<footer
			className={cn(
				'flex items-center justify-between',
				'border-b border-indigo-300',
			)}
		>
			<Title
				title={subtitle}
				as='h6'
				className='__label __xs justify-self-end text-indigo-500'
			/>

			<Button
				as='span'
				text='Read More'
				size='xs'
				variant='flat'
				color='util'
				arrow={{ default: true }}
			/>
		</footer>
	)
}

export { CardArticle }
