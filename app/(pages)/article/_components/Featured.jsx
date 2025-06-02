import { Container, LinkShell, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Backdrop } from '@/components/UI'
import { getExcerpt, getTheme } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const FeaturedArticle = ({
	img,
	title,
	subtitle,
	body,
	link,
	color,
	className,
}) => {
	return (
		<Section
			className={cn('__hero', cp(className, 'section', true))}
			data-theme={getTheme(color).scheme}
		>
			<Container layout='grid' cols={2} className='pb-0'>
				<LinkShell href={link} className='group'>
					<AspectImage
						img={img}
						h={12}
						className={{ img: 'rounded-4xl' }}
						priority
					/>
				</LinkShell>

				<LinkShell href={link} className='group'>
					<Prose
						wrap
						layout='flex'
						title={title}
						subtitle={subtitle}
						body={getExcerpt(body)}
						gap={{ prose: '2xs' }}
						as={{ title: 'h1', subtitle: 'h5' }}
						links={[
							{ href: link, text: 'Read More', variant: 'article' },
						]}
						className={{
							prose: 'h-full items-between pb-28',
							lead: 'grow',
							subtitle: cn('mb-auto', getTheme(color).accent),
							body: 'max-w-md',
						}}
					/>
				</LinkShell>
			</Container>

			<Backdrop layer color={color} className='bottom-12' />
		</Section>
	)
}

export { FeaturedArticle }
