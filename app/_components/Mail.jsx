import { SITE_NAME } from '@/lib/constants'
import { unCamel, unslug } from '@/lib/helpers'

const styles = {
	fontReset: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '0px',
		textAlign: 'left',
		letterSpacing: 'normal',
		direction: 'ltr',
		wordBreak: 'break-word',
	},
	background: {
		background: '#ffffff',
		backgroundColor: '#ffffff',
	},
	shell: {
		padding: '20px',
	},
	text: {
		dark: { color: '#2d2d36' },
		gray: { color: '#47474b' },
		light: { color: '#55575d' },
	},
	spacing: {
		sm: { margin: '10px' },
		mg: { margin: '20px' },
		lg: { margin: '30px' },
	},
}

const EmailHTML = ({ fields }) => {
	return (
		<EmailTemplate>
			<div>
				<h3 style={{ ...styles.text.dark }}>
					Message to {SITE_NAME}
				</h3>
				<p style={{ ...styles.text.gray }}>
					Here's a recap of the info sent
				</p>
				<ul style={{ ...styles.spacing.sm }}>
					{Object.entries(fields).map(([key, value]) => (
						<li
							key={key}
							style={{ ...styles.text.dark, ...styles.spacing.sm }}
						>
							<strong>{unCamel(unslug(key))}:</strong> {value}
						</li>
					))}
				</ul>
			</div>
		</EmailTemplate>
	)
}

const EmailTemplate = ({ children }) => (
	<EmailShell>
		<EmailRow>{children}</EmailRow>

		<EmailRow>
			<p
				style={{
					...styles.text.light,
					fontSize: '12px',
					lineHeight: '18px',
				}}
			>
				Message sent from{' '}
				<a href={process.env.NEXT_PUBLIC_SITE_URL}>
					{process.env.NEXT_PUBLIC_SITE_DOMAIN}
				</a>{' '}
				on {new Date().toLocaleString()}
			</p>
		</EmailRow>
	</EmailShell>
)

const EmailShell = ({ children }) => (
	<div
		style={{
			backgroundColor: '#F4F4F4',
			...styles.shell,
			...styles.text.dark,
		}}
	>
		<div
			style={{
				...styles.background,
				margin: '0px auto',
				maxWidth: '600px',
			}}
		>
			<table
				style={{
					...styles.background,
					width: '100%',
				}}
				role='presentation'
				cellSpacing='0'
				cellPadding='0'
				border='0'
				align='center'
			>
				<tbody>
					<tr>
						<td
							style={{
								...styles.fontReset,
							}}
						>
							<div
								style={{
									...styles.fontReset,
									display: 'inline-block',
									verticalAlign: 'top',
									width: '100%',
								}}
							>
								<table
									width='100%'
									style={{ verticalAlign: 'top' }}
									role='presentation'
									cellSpacing='0'
									cellPadding='0'
									border='0'
								>
									<tbody>{children}</tbody>
								</table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
)

const EmailRow = ({ children }) => (
	<tr>
		<td
			style={{
				...styles.fontReset,
				...styles.shell,
			}}
			align='left'
		>
			<div
				style={{
					fontSize: '13px',
					lineHeight: '19px',
					...styles.text.dark,
				}}
			>
				{children}
			</div>
		</td>
	</tr>
)

export { EmailHTML }
