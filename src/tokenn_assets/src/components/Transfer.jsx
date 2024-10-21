import React, { useState } from "react";
import { tokenn } from "../../../declarations/tokenn";
import { Principal } from '@dfinity/principal';


function Transfer() {

  const[recepientId,SetId] = useState("");
  const[amount,setAmount] = useState("");
  const[isDisabled,setDisabled] = useState(false);
  const[feedBack,setFeedBack] = useState("");
  const[isHidden,setHidden] = useState("");

  async function handleClick() {
    //In the below line we need recepientId and amount to be of Principal and Nat type 
    //but we get them as a string so we need to fix that

    // await tokenn.transfer(recepientId,amount);

    setDisabled(true);
    setHidden(true);
    const recepient = Principal.fromText(recepientId);
    const amountToTransfer = Number(amount);
    const result = await tokenn.transfer(recepient,amountToTransfer);
    setFeedBack(result);
    setHidden(false);
    setDisabled(false);  
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value = {recepientId}
                onChange = {(event) => SetId(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {amount}
                onChange = {(event) => setAmount(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" 
          onClick={handleClick} 
          disabled = {isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden = {isHidden}> {feedBack} </p>
      </div>
    </div>
  );
}

export default Transfer;
