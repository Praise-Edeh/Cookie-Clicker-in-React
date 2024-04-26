import React, { useState, useEffect } from "react";
import "./App.css"; 

export default function App() {
  const [cookies, setCookies] = useState(
    parseInt(localStorage.getItem("cookies")) || 0
  );
  const [cps, setCps] = useState(
    parseInt(localStorage.getItem("cookiesPerSecond")) || 1
  );

  useEffect(() => {
    const myInterval = setInterval(() => {
      addCookie(cps);
    }, 1000 / cps);

    return () => {
      clearInterval(myInterval);
    };
  }, [cps]);

  useEffect(() => {
    localStorage.setItem("cookies", cookies.toString());
    localStorage.setItem("cookiesPerSecond", cps.toString());
  }, [cookies, cps]);

  function addCookie(cps) {
    setCookies((currentCookies) => currentCookies + cps);
  }

  function buyUpgrade(itemCost, itemCps) {
    if (cookies >= itemCost) {
      setCookies(cookies - itemCost);
      setCps(cps + itemCps);
    } else {
      alert("Not enough cookies!");
    }
  }

  const storeItems = [
    { name: "Item 1", cost: 10, cpsIncrease: 1 },
    { name: "Item 2", cost: 20, cpsIncrease: 2 },
    { name: "Item 3", cost: 30, cpsIncrease: 3 },
  ];

  return (
    <div>
      <div className="container">
        <h1>Cookie Clicker</h1>
        <button onClick={() => addCookie(1)}>I am a cookie</button>
        <p>I have {cookies} cookies</p>
        <p>I get {cps} cookies per second</p>
        <h2>Store</h2>
        {storeItems.map((item, index) => (
          <div key={index} className="store-item">
            <p>
              {item.name} - Cost: {item.cost} cookies - CPS Increase:{" "}
              {item.cpsIncrease}
            </p>
            <button onClick={() => buyUpgrade(item.cost, item.cpsIncrease)}>
              Buy {item.name}
            </button>
          </div>
        ))}
      </div>
      <footer className="footer">© Created by Praise 2024</footer>
    </div>
  );
}
