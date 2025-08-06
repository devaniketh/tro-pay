'use client'

import { useState } from 'react'
import { TOKENS } from '@/lib/token'

export default function SwapForm() {
  const [inputToken, setInputToken] = useState('')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [outputToken, setOutputToken] = useState('')
  const [quote, setQuote] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchQuote = async () => {
  setQuote(null)
  setLoading(true)

  const inputMint = TOKENS[inputToken.toUpperCase()]
  const outputMint = TOKENS[outputToken.toUpperCase()]

  if (!inputMint || !outputMint || !amount) {
    alert('Invalid tokens or amount')
    setLoading(false)
    return
  }

  const amountInBaseUnits = Math.floor(parseFloat(amount) * 10 ** 6)

  const url = encodeURI(
    `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInBaseUnits}`
  )

  console.log('Fetching quote from:', url)

  try {
    const res = await fetch(url)
    const data = await res.json()

    console.log('API response:', data)

    const outAmount = data?.outAmount ?? data?.data?.[0]?.outAmount

    if (outAmount) {
      const outReadable = (parseFloat(outAmount) / 10 ** 6).toFixed(6)
      setQuote(`${amount} ${inputToken.toUpperCase()} ≈ ${outReadable} ${outputToken.toUpperCase()}`)
    } else {
      setQuote('No route found.')
    }
  } catch (err) {
    console.error('Error fetching quote:', err)
    setQuote('Error fetching quote')
  }

  setLoading(false)
}

  return (
    <div className="space-y-4 mt-6">
      <input
        className="w-full p-3 bg-gray-800 rounded text-white"
        placeholder="Token to send (e.g. USDC)"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />

      <input
        className="w-full p-3 bg-gray-800 rounded text-white"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="w-full p-3 bg-gray-800 rounded text-white"
        placeholder="Recipient Wallet Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      <input
        className="w-full p-3 bg-gray-800 rounded text-white"
        placeholder="Token recipient wants (e.g. SOL)"
        value={outputToken}
        onChange={(e) => setOutputToken(e.target.value)}
      />

      <button
        onClick={fetchQuote}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
      >
        {loading ? 'Fetching...' : 'Get Swap Quote'}
      </button>

      {quote && (
        <p className="mt-2 text-green-400 text-lg">
          {quote}
        </p>
      )}
    </div>
  )
}
