export default function CurrencyForm({
	currency,
	setCurrency,
	value,
	setValue,
	currencyData,
	editable,
}) {
	return (
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
			<select
				style={{ textAlign: 'center' }}
				value={currency}
				onChange={(e) => setCurrency(e.target.value)}
			>
				{Object.keys(currencyData.rates).map((key) => {
					return (
						<option key={key} value={key}>
							{key}
						</option>
					)
				})}
			</select>
			<input
				type='number'
				readOnly={!editable}
				style={{ textAlign: 'center' }}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	)
}
