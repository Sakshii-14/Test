import React, { useState } from "react";
import StockChart from "./components/StockChart";
import { useSymbol} from "./SymbolContext";

function App() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const {changeSymbol} = useSymbol();
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form submitted with search query:", searchQuery);
    changeSymbol(searchQuery.toUpperCase());
    
  };

  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    
 <div className="flex flex-col gap-1">
      
      <form onSubmit={handleSubmit} className="flex flex-col items-end">
        <input
          type="text"
          placeholder="Search"
          className="shadow-lg border-[1px] border-slate-500 placeholder:text-slate-500 rounded-lg p-1 md:w-[30%] sm:w-[40%] w-full"
          value={searchQuery}
          onChange={handleInputChange} 
        />
      </form>

      
      <StockChart />
    </div>
    
   
  );
}

export default App;
