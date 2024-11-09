import React from "react";

function Navbar({ onClick ,view}) {
  return (
    <nav className="flex  items-center  p-2 shadow-md">
      
      <ul className="flex space-x-6">
        <li>
          <button
            onClick={() => onClick("summary")}
            className={`text-md hover:text-blue-500 transition-colors underline-offset-8 duration-300 ${view === "summary" ? "underline text-slate-800" : "text-slate-700"}`}
          >
            Summary
          </button>
        </li>
        <li>
          <button
            onClick={() => onClick("chart")}
            className={`text-md hover:text-blue-500  transition-colors underline-offset-8 duration-300 ${view === "chart" ? "underline text-slate-800" : "text-slate-700"}`}
          >
            Chart
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
