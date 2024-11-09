
import React, { createContext, useState, useContext } from 'react';


const SymbolContext = createContext();


export const SymbolProvider = ({ children }) => {
  const [symbol, setSymbol] = useState('IBM'); 

  
  const changeSymbol = (newSymbol) => {
    setSymbol(newSymbol);
  };

  return (
    <SymbolContext.Provider value={{ symbol, changeSymbol }}>
      {children}
    </SymbolContext.Provider>
  );
};


export const useSymbol = () => {
  return useContext(SymbolContext);
};
