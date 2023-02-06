import RulesCard from "./components/LotteryApp/RulesCard";
import Lottery from "./components/LotteryApp/Lottery";
import Flipdown from "./components/Flipdown/Flipdown";
import ConnectButton from "./components/LotteryApp/ConnectButton";
import BidCard from "./components/LotteryApp/BidCard";
import PastWinners from "./components/LotteryApp/PastWinners";

import { useState } from "react";

function App() {
  const [bid, setBid] = useState(0);

  return (
    <div className="App">
      <main className="page-content">
        <section className="page-section">
          <ConnectButton />
          <inner-column>
            <h1 className="loud-voice slide-in-top">Lottery. api3</h1>
            <Lottery bid={bid} setBid={setBid} />
            <BidCard bid={bid} setBid={setBid} />
            <PastWinners />
            <RulesCard />
            <Flipdown />
          </inner-column>
        </section>
      </main>
      <div className="final-result hide"></div>
    </div>
  );
}

export default App;
