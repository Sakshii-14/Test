import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import useStockData from "../customhook/useStockdata";
import Navbar from "./Navbar";
import Chartnav from "./Chartnav";
import { useSymbol  } from "../SymbolContext";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#333",
          padding: "10px",
          borderRadius: "5px",
          color: "#fff",
          border: "1px solid #8884d8"
        }}
      >
        <p>{`Date: ${label}`}</p>
        <p>{`Price: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
}

function StockChart() {
  const { symbol } = useSymbol();
  const [view, setView] = useState("chart"); 
  const [timerange, settimerange] = useState('1m');
  const [list, setlist] = useState([]);
  
  const { currentPrice, increment, percentChange, loading, error, historicalData } = useStockData(symbol,timerange);
  
  const handleClick = (viewType) => {
    setView(viewType);
  };
  const handletime=(timerange)=>{
    settimerange(timerange);
    
        switch (timerange) {
            case '1d':
                setlist(historicalData.slice(0,2));
                break;
            case '3d':
                setlist(historicalData.slice(0,3));
                    break;
            case '1w':
                setlist(historicalData.slice(0,7));
                        break; 
            case '1m':
                setlist(historicalData);
                            break;                   
            default:
                break;
        }
  }

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
     <h2 className="text-[2rem]">{symbol} Stock Data</h2>
      <p className="font-medium text-[1.5rem]">{currentPrice}</p>
      <p className={`${increment > 0 ? 'text-green-400':'text-red-700'}`}> {increment > 0 ? `+ ${increment}` : increment}  <span>{`(${percentChange})`}%</span></p>
      <Navbar onClick={handleClick} view={view} />
      {view === "chart" && (
        <div className="flex flex-col gap-2 mt-4" style={{ width: "100%", height: 500 }}>
          <Chartnav onclick={handletime} timerange={timerange}/>
          
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={list.length===0?historicalData:list} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(100,100,100,0.5)", strokeWidth: 1 }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#6a0dad"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5, fill: "#6a0dad" }}
              />
              <ReferenceLine x="50%" stroke="rgba(100, 100, 100, 0.5)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) }
      {
        view==='summary' && (
            <div className="flex flex-col gap-5 p-6 max-w-lg  bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
  <p className="font-semibold text-white text-2xl">
    Current Price: <span className="font-bold text-xl">{currentPrice}</span>
  </p>
  <p className="text-slate-700 text-lg font-medium">
    Increment: <span className="text-green-400 font-bold">+{increment}</span>
  </p>
  <p className="text-slate-700 text-lg font-medium">
    Percentage Change: <span className="text-green-400 font-bold">{percentChange}%</span>
  </p>
</div>
        )
      }
    </div>
  );
}

export default StockChart;
