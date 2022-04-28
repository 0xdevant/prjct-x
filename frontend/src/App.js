//import logo from './logo.svg';
import { useContext } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Intro from "./components/Intro";
import Roadmap from "./components/Roadmap";
import Footer from "./components/Footer";
import Team from "./components/Team";
import Video from "./components/Video";
import { Web3Context } from "./components/Web3Context";

function App() {
  const {
    ethers,
    provider,
    contract,
    account,
    alert,
    alertType,
    _connectWallet,
    _dismissError,
    _resetState,
  } = useContext(Web3Context);

  return (
    <>
      {alert && (
        <Alert type={alertType} message={alert} dismiss={_dismissError} />
      )}
      <div className="App bg-black text-white pb-8 flex flex-col space-y-8">
        <Intro />
        <Video />
        <Roadmap />
        <Team />
        <Footer />
      </div>
    </>
  );
}

export default App;
