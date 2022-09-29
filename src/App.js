import './App.css';
import { useState } from "react";
import LineChart from './components/LineChart';

function App() {

  const [symbol, setSymbol] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [chartCoinData, setChartCoinData] = useState({
    labels: [],
    datasets: [{
      label: "PRICE (USD)",
      backgroundColor: "white",
      borderColor: ["rgba(46, 186, 198)"],
      data: []
    }]
  })

  const fetchCoinDataUSD = () => {
    let url = `https://twelve-data1.p.rapidapi.com/time_series?symbol=${symbol}%2FUSD&interval=1day&outputsize=${timeframe}&format=json`
    let options = {
      method: 'GET',
	    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    }

    if (!symbol && !timeframe) {
      alert("You must enter a symbol and a timeframe!")
      return 
    }

    fetch(url, options)
      .then((res) => {
        return res.json()
        .then((data) => {
          console.log(data)
          let labelData = data.values.sort((a,b) => {
            return new Date(a.datetime) - new Date(b.datetime);
          })
          labelData = data.values.map((coinData) => {
            return coinData.datetime;
          })
          let priceData = data.values.map((coinData) => {
            return coinData.close;
          })
          setChartCoinData({
            labels: labelData,
            datasets: [{
              label: "PRICE",
              data: priceData
            }]
          })
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })

    setSymbol("")
    setTimeframe("")
  }

  const handleCoinSearch = (e) => {
    e.preventDefault()
    setSymbol(e.target.value)
  }

  const handleTimeframeSearch = (e) => {
    e.preventDefault()
    setTimeframe(e.target.value)
  }

  return (
    <div className="App">
      <h1>CRYTPO PRICE SEARCH</h1>
        <label> ENTER SYMBOL: <input value={symbol} type="text" onChange={handleCoinSearch} />
          <br />
        </label>
        <br />
        <label> ENTER TIMEFRAME (DAYS): <input value={timeframe} type="text" onChange={handleTimeframeSearch} />
          <br />
        </label>
        <br />
        <button onClick={fetchCoinDataUSD}>Fetch Coin Data</button>
        <br />
        <LineChart chartData={chartCoinData}/>
    </div>
  );
}

export default App;
