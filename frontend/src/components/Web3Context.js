import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import PRJCTX from "../artifacts/contracts/PRJCTX.sol/PRJCTX.json";
import Whitelist from "../lib/Whitelist";

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const HARDHAT_CHAIN_ID = "0x7a69";
  const ETH_ROPSTEN_CHAIN_ID = "0x3";
  const ETH_RINKEBY_CHAIN_ID = "0x4";
  const ETH_MAINNET_CHAIN_ID = "0x1";
  const HARDHAT_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const ROPSTEN_CONTRACT_ADDRESS = "0xdD7f48DfbC22Ee11518F44803Eeb43a95daD6685";
  const RINKEBY_CONTRACT_ADDRESS = "0xE265000d721Dfb997646c8146a3b1a9C3E2601A8";
  const ETH_CONTRACT_ADDRESS = "";

  const CURRENT_CHAIN_ID = ETH_ROPSTEN_CHAIN_ID;

  const [provider, setProvider] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [alertType, setAlertType] = useState("error");
  const [alert, setAlert] = useState(undefined);

  const [maxSupply, setMaxSupply] = useState(undefined);
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(undefined);
  const [tokenPrice, setTokenPrice] = useState(undefined);
  const [isPaused, setIsPaused] = useState(undefined);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] =
    useState(undefined);
  const [isUserInWhitelist, setIsUserInWhitelist] = useState(undefined);

  // Fetch user account if already connected previously
  useEffect(() => {
    async function fetchConnectedETH() {
      if (window.ethereum === undefined) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const [accounts] = await provider.listAccounts();
      if (accounts !== undefined) {
        _initialize(accounts);
      }
    }
    fetchConnectedETH();
  }, []);

  useEffect(() => {
    if (window.ethereum === undefined) {
      return;
    }
    // Reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      if (newAddress === undefined) {
        return _resetState();
      }

      _initialize(newAddress);
    });

    // Reset the site state if the network is changed
    window.ethereum.on("chainChanged", (chainId) => {
      console.log(`Network ID changed to: ${chainId}`);
      _resetState();
    });
  });

  async function _connectWallet() {
    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
      setAlertType("error");
      setAlert("Please install MetaMask!");
      return;
    }

    // Checks if selected network is on desired network
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (!_checkNetwork(chainId)) {
      _resetState();
      setAlert(`Please switch to network ID ${CURRENT_CHAIN_ID}`);
      return;
    }

    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    _initialize(selectedAddress);
  }

  async function _initialize(userAddress) {
    // Get the current chainId, invoke the corresponding contract
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contractAddress;
    if (chainId === HARDHAT_CHAIN_ID) {
      contractAddress = HARDHAT_CONTRACT_ADDRESS;
    } else if (chainId === ETH_ROPSTEN_CHAIN_ID) {
      contractAddress = ROPSTEN_CONTRACT_ADDRESS;
    } else if (chainId === ETH_RINKEBY_CHAIN_ID) {
      contractAddress = RINKEBY_CONTRACT_ADDRESS;
    } else if (chainId === ETH_MAINNET_CHAIN_ID) {
      contractAddress = ETH_CONTRACT_ADDRESS;
    }
    const contract = new ethers.Contract(contractAddress, PRJCTX.abi, signer);

    setMaxSupply(await contract.maxSupply());
    setTotalSupply(await contract.totalSupply());
    setMaxMintAmountPerTx(await contract.maxMintAmountPerTx());
    setTokenPrice(await contract.cost());
    setIsPaused(await contract.paused());
    setIsWhitelistMintEnabled(await contract.whitelistMintEnabled());
    setIsUserInWhitelist(Whitelist.contains(account) ?? false);

    setProvider(provider);
    setContract(contract);
    setAccount(userAddress);
  }

  function _dismissError() {
    setAlertType("error");
    setAlert(undefined);
  }

  function _resetState() {
    setProvider(undefined);
    setContract(undefined);
    setAccount(undefined);
    setAlertType("error");
    setAlert(undefined);
    window.location.reload();
  }

  // Checks if selected network is on desired network
  function _checkNetwork(chainId) {
    if (chainId === CURRENT_CHAIN_ID) {
      return true;
    }

    return false;
  }

  return (
    <Web3Context.Provider
      value={{
        ethers,
        provider,
        contract,
        account,
        alertType,
        setAlertType,
        alert,
        setAlert,
        _connectWallet,
        _dismissError,
        _resetState,
        maxSupply,
        totalSupply,
        maxMintAmountPerTx,
        tokenPrice,
        isPaused,
        isWhitelistMintEnabled,
        isUserInWhitelist,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
