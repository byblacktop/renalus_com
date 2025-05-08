const LoadingDots = ({
	beforeText,
	afterText,
	color = 'white',
	size = 2,
}) => (
	<div>
		{beforeText && <span>{beforeText}</span>}
		<span className='invisible'>•</span>
		<div className='inline-flex text-center items-center space-x-2'>
			<span
				className={`w-${size} h-${size} rounded-full bg-${color} bg-opacity-70 animate-loader`}
			/>
			<span
				className={`w-${size} h-${size} rounded-full bg-${color} bg-opacity-70 animate-loader-delay-200`}
			/>
			<span
				className={`w-${size} h-${size} rounded-full bg-${color} bg-opacity-70 animate-loader-delay-400`}
			/>
		</div>
		<span className='invisible'>•</span>
		{afterText && <span className='btn btn-util'>{afterText}</span>}
	</div>
)

export { LoadingDots }
