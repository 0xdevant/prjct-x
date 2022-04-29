import React, { useContext, useState } from "react";
import { ConnectWallet } from "../ConnectWallet";
import { Web3Context } from "../Web3Context";
import Whitelist from "../../lib/Whitelist";

function MintWidget() {
  const {
    ethers,
    contract,
    account,
    setAlert,
    setAlertType,
    _connectWallet,
    totalSupply,
    maxMintAmountPerTx,
    tokenPrice,
    isPaused,
    isWhitelistMintEnabled,
    isUserInWhitelist,
  } = useContext(Web3Context);

  const [mintAmount, setMintAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mintSucessful, setMintSucessful] = useState(false);

  function handleMintAmount(e) {
    setMintAmount(e.target.value);
  }

  function getMintPrice(mintAmount) {
    return ethers.utils.parseEther(tokenPrice.toString()).mul(mintAmount);
  }

  function canMint() {
    return !isPaused || canWhitelistMint();
  }

  function canWhitelistMint() {
    return isWhitelistMintEnabled && isUserInWhitelist;
  }

  async function mint() {
    if (!account) {
      _connectWallet();
      return;
    }
    let tx;
    if (!isPaused) {
      setLoading(true);
      tx = await contract.mint(mintAmount, {
        value: getMintPrice(mintAmount),
        //gasLimit: 80000,
      });
      await tx.wait();
      setMintSucessful(true);
      setLoading(false);

      console.log("no wl mint");

      return;
    }

    if (isWhitelistMintEnabled) {
      setLoading(true);
      tx = await contract.whitelistMint(
        Whitelist.getProofForAddress(account),
        mintAmount,
        {
          value: getMintPrice(mintAmount),
        }
      );
      await tx.wait();
      setMintSucessful(true);
      setLoading(false);

      console.log("wl now");
    }

    /*} catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
      setAlert("Transaction failed, please try again!");
      setAlertType("error");
      setMintSucessful(false);
      setLoading(false);
    }*/
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
    <>
      <div className="max-w-xl mx-auto">
        <div className="bg-secondary-theme rounded-md p-8 flex justify-center items-center text-black">
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">
              Mint Details
            </h2>
            <div className="flex justify-center items-center text-white flex-col space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row">
              <div className="flex justify-center items-center flex-row space-x-4 lg:space-x-0 lg:flex-col">
                <span>PRICE</span>
                <span>0.08 ETH</span>
              </div>
              <div className="flex justify-center items-center border-0 pl-0 flex-row space-x-4 lg:space-x-0 lg:flex-col lg:pl-4 lg:border-l-2">
                <span>SUPPLY</span>
                <span>2222</span>
              </div>
              <div className="flex justify-center items-center border-0 pl-0 flex-row space-x-4 lg:space-x-0 lg:flex-col lg:pl-4 lg:border-l-2">
                <span>MINT DATE</span>
                <span>24/02/2022</span>
              </div>
            </div>
            {!account && <ConnectWallet connectWallet={_connectWallet} />}

            {account ? (
              <div className="flex justify-center space-x-4">
                {canMint() ? (
                  { mintAction }
                ) : (
                  <div className="flex justify-center text-white">
                    {isWhitelistMintEnabled ? (
                      <p>
                        You are not included in the <b>whitelist</b>.
                      </p>
                    ) : (
                      <p>
                        The contract is <b>paused</b>.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default MintWidget;
