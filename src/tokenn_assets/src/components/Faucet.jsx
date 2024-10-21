import React, { useState } from "react";
import { tokenn } from "../../../declarations/tokenn";

function Faucet() {

  const[isDisabled, setDisabled] = useState(false); 
  const[buttontext,setText] = useState("Claim tokens!!");

  async function handleClick(event) {
    setDisabled(true);
    const result = await tokenn.payOut();
    setText(result);
    // setDisabled(false); 
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Dank tokens here! Claim 10,000 DANK tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" 
        onClick={handleClick}
        disabled = {isDisabled}
        >
          {buttontext}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
