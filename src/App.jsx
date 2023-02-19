import currency from './mock/latest-currency.json'

export default function App() {
	return (
		<div>
			<select>
				{Object.keys(currency.rates).map((key) => {
					return (
						<option key={key} value={key}>
							{key}
						</option>
					)
				})}
			</select>
		</div>
	)
}
