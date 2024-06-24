import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [amount , setAmount ] = useState()
  const [fromCurrency,setFromCurrency] = useState("IND")
  const [toCurrency,setToCurrency] = useState("USD")
  const [convertedAmount , setConvertedAmount] = useState()
  const [exchangeRate,setExchangeRate] = useState()

  useEffect(()=>{
    const getExchnageRate = async() => {
      try{
          let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

          const res = await axios.get(url)
          console.log(res);
          setConvertedAmount(res.data.rates[toCurrency])
      }catch(err){
        console.log("Error while fetching : " ,err);
      }
    };
    getExchnageRate();
  },[fromCurrency,toCurrency])

  useEffect(() => {
    if (exchangeRate !== null){
      setConvertedAmount((amount * exchangeRate).toFixed(25))
    }
  },[amount, exchangeRate])

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  return (
    <>
  <div className="w-6/4 bg-white rounded-lg p-3 shadow-md">
    <div className="box"></div>
      <div className="data">
        <h1 className="uppercase font-semibold font-4 mb-4 text-blue-400 text-center border-b-2 mt-3">Currency Converter</h1>
        <div className="mb-4 ">
          <label htmlFor="amt" className="block text-#888 font-semibold">Amount : </label>
          <input type="number" id="amt" value={amount} onChange={handleAmountChange} />
        </div>


        <div className="input-conatiner">
          <label htmlFor="fromCurrency">From currency</label>
          <select  id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="INR">INR - Indian Rupees</option>
          <option value="USD" >USD - United States Dollar</option>
          </select>
        </div>
        <div className="input-conatiner">
          <label htmlFor="toCurrency">To currency</label>
          <select  id="toCurrency " value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD" >USD - United States Dollar</option>
          <option value="INR">INR - Indian Rupees</option>
          </select>
        </div>


        <div className="mt-5 mb-5 p-3 border-dotted border-2 border-blue-400">
          <p className="text-center text-blue-500 font-bold">{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
