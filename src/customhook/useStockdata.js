import { useState, useEffect } from "react";

function useStockData(symbol ) {
  
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=demo`;

  const [currentPrice, setCurrentPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [increment, setIncrement] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);  
      setError(null);    

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const timeSeries = data['Time Series (Daily)'];

        if (!timeSeries) {
          throw new Error("No data found for the symbol");
        }

        
       
        const dates = Object.keys(timeSeries).slice(0, 30); 
        const formattedData = dates.map(date => ({
          date,
          close: parseFloat(timeSeries[date]['4. close']),
        }));

        setHistoricalData(formattedData);

        
        const latestDate = dates[0];
        const previousDate = dates[1];
        const latestClose = parseFloat(timeSeries[latestDate]['4. close']);
        const previousClose = parseFloat(timeSeries[previousDate]['4. close']);
        const calculatedIncrement = latestClose - previousClose;
        const calculatedPercentChange = (calculatedIncrement / previousClose) * 100;

        setCurrentPrice(latestClose);
        setIncrement(parseFloat(calculatedIncrement.toFixed(4)));
        setPercentChange(calculatedPercentChange.toFixed(2));

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol, url ]);

  return {
    currentPrice,
    increment,
    percentChange,
    loading,
    error,
    historicalData,
  };
}

export default useStockData;
