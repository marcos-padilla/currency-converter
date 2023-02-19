import currency from './mock/latest-currency.json'

export default function App() {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
					border: '2px solid darkgray',
					padding: 20,
					borderRadius: 10,
				}}
			>
				<select style={{ textAlign: 'center' }}>
					{Object.keys(currency.rates).map((key) => {
						return (
							<option key={key} value={key}>
								{key}
							</option>
						)
					})}
				</select>
				<input type='number' style={{ textAlign: 'center' }} />
			</div>
		</div>
	)
}
