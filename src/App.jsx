import CurrencyForm from './CurrencyForm'
import { useCallback, useEffect, useState } from 'react'
import API_URL from './API_URL'

export default function App() {
	const [currencyData, setCurrencyData] = useState(null)

	const [fromCurrency, setFromCurrency] = useState('USD')
	const [toCurrency, setToCurrency] = useState('EUR')

	const [fromValue, setFromValue] = useState(0)
	const [toValue, setToValue] = useState(0)

	useEffect(() => {
		fetch(API_URL)
			.then((resp) => resp.json())
			.then((resp) => {
				setCurrencyData(resp)
			})
			.catch((err) => {
				console.log({ err })
			})
	}, [])
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
		<div>
			{currencyData && (
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
			)}
		</div>
	)
}
