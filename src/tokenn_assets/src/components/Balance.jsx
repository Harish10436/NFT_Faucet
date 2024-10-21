import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { tokenn } from "../../../declarations/tokenn";

function Balance() {

  const [inputValue,setInput] = useState("");
  const [balanceResult,setBalance] = useState("");
  const [cryptoSymbol,setSymbol] = useState("");
  const [isHidden,setHidden] = useState(true);
  
  async function handleClick() {
    // console.log("Balance Button Clicked");
    // console.log(inputValue);

    const principal = Principal.fromText(inputValue);
    const balance = await tokenn.balanceOf(principal);

    setBalance(balance.toLocaleString());
    setSymbol(await tokenn.getSymbol());
    setHidden(false); 
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value = {inputValue}
          onChange = {(event) => setInput(event.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden = {isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;