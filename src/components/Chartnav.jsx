import React from "react";

function Chartnav({ onclick, timerange }) {
  return (
    <nav className="flex justify-center items-center p-2">
      <ul className="flex space-x-6">
        {["1d", "3d", "1w", "1m"].map((range) => (
          <li key={range}>
            <button
              onClick={() => onclick(range)}
              className={`text-md rounded-lg px-2 py-1 hover:underline transition-all underline-offset-8 duration-300 ${timerange === range ? "bg-blue-700 text-yellow-50" : "text-slate-700"}`}
            >
              {range}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Chartnav;
