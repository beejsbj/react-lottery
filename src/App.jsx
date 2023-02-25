import LotteryApp from "./components/LotteryApp/LotteryApp";
import ConnectButton from "./components/LotteryApp/ConnectButton";

import { useAccount } from "wagmi";

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="App">
      <main className="page-content">
        <section className="page-section">
          <ConnectButton />
          <inner-column>
            <h1 className="booming-voice slide-in-top">Lottery</h1>
            {isConnected && <LotteryApp />}
          </inner-column>
        </section>
      </main>
      <div className="final-result hide"></div>
    </div>
  );
}

export default App;
