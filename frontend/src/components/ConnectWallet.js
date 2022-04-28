import React from "react";

export function ConnectWallet({ connectWallet }) {
  return (
    <div className="flex justify-center items-center text-center">
      <button
        className="rounded-full bg-white px-4 py-2 text-black"
        type="button"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  );
}
