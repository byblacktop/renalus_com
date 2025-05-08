import { Back } from '@/components/UI'

const NotFound = () => {
	return (
		<section className='__hero bg-bg min-h-[50vh] flex place-content-center place-items-center'>
			<article className='__container pxy text-center space-y-3 md:space-y-5'>
				<h1>Resource Not Found</h1>
				<Back />
			</article>
		</section>
	)
}

export default NotFound
