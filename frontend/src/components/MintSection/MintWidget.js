import React, { useContext, useState } from "react";
import { ConnectWallet } from "../ConnectWallet";
import { Web3Context } from "../Web3Context";

function MintWidget() {
  const { ethers, contract, account, setAlert, setAlertType, _connectWallet } =
    useContext(Web3Context);

  // 0.08 ETH
  const MINT_PRICE = 0.08;
  const [mintAmount, setMintAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mintSucessful, setMintSucessful] = useState(false);

  function handleMintAmount(e) {
    setMintAmount(e.target.value);
  }

  async function mint() {
    if (!account) {
      _connectWallet();
      return;
    }
    setLoading(true);
    let tx;
    try {
      tx = await contract.mint(mintAmount, {
        value: ethers.utils.parseEther((MINT_PRICE * mintAmount).toString()),
        //gasLimit: 80000,
      });
      await tx.wait();
      setMintSucessful(true);
      setLoading(false);
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
      setAlert("Transaction failed, please try again!");
      setAlertType("error");
      setMintSucessful(false);
      setLoading(false);
    }
  }

  let mintAction;
  if (loading && !mintSucessful) {
    mintAction = (
      <svg
        className="animate-spin mx-auto h-6 w-6 text-white"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  } else if (!loading && !mintSucessful) {
    mintAction = (
      <>
        <select
          className="rounded-md w-14 text-center"
          name="mintAmount"
          id="mintAmount"
          onChange={handleMintAmount}
          defaultValue="1"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button className="mint-button" onClick={mint}>
          Mint Now
        </button>
      </>
    );
  } else {
    mintAction = (
      <span className="text-theme">You have minted successfully!</span>
    );
  }

  return (
    <div className="bg-secondary-theme rounded-md p-8 flex justify-center items-center w-1/2 mx-auto text-black">
      <div className="flex flex-col space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Mint Details
        </h2>
        <div className="flex items-center space-x-4 text-white">
          <div className="flex flex-col justify-center items-center">
            <span>PRICE</span>
            <span>0.08 ETH</span>
          </div>
          <div className="flex flex-col justify-center items-center border-l-2 pl-4">
            <span>SUPPLY</span>
            <span>2222</span>
          </div>
          <div className="flex flex-col justify-center items-center border-l-2 pl-4">
            <span>MINT DATE</span>
            <span>24/02/2022</span>
          </div>
        </div>
        {!account && <ConnectWallet connectWallet={_connectWallet} />}
        {account && (
          <div className="flex justify-center space-x-4">{mintAction}</div>
        )}
      </div>
    </div>
  );
}

export default MintWidget;
