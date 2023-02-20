import CurrencyForm from './CurrencyForm'
import { useCallback, useEffect, useState } from 'react'
import currencyData from './mock/latest-currency.json'

export default function App() {
	const [fromCurrency, setFromCurrency] = useState('USD')
	const [toCurrency, setToCurrency] = useState('EUR')

	const [fromValue, setFromValue] = useState(0)
	const [toValue, setToValue] = useState(0)

	const calculateCurrency = useCallback(
		({ rates, fromCurrency, toCurrency, amount }) => {
			var rates = currencyData.rates
			var fromRate = rates[fromCurrency]
			var toRate = rates[toCurrency]
			return (toRate / fromRate) * amount
		},
		[]
	)

	useEffect(() => {
		if (!fromValue || !fromCurrency) {
			setToValue(0)
			return
		}

		var exchangeRate = calculateCurrency({
			rates: currencyData.rates,
			fromCurrency: fromCurrency,
			toCurrency: toCurrency,
			amount: fromValue,
		})
		setToValue(exchangeRate)
	}, [fromCurrency, fromValue])

	return (
		<div style={{ display: 'flex', gap: 20 }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					placeItems: 'center',
					gap: 10,
				}}
			>
				<span>From</span>
				<CurrencyForm
					currency={fromCurrency}
					setCurrency={setFromCurrency}
					value={fromValue}
					setValue={setFromValue}
					currencyData={currencyData}
					editable
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					placeItems: 'center',
					gap: 10,
				}}
			>
				<span>To</span>
				<CurrencyForm
					currency={toCurrency}
					setCurrency={setToCurrency}
					value={toValue}
					setValue={() => {}}
					currencyData={currencyData}
					editable={false}
				/>
			</div>
		</div>
	)
}
