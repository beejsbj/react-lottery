import RulesCard from "./components/LotteryApp/RulesCard";
import Lottery from "./components/LotteryApp/Lottery";
import Flipdown from "./components/Flipdown/Flipdown";
import ConnectButton from "./components/LotteryApp/ConnectButton";
import BidCard from "./components/LotteryApp/BidCard";
import PastWinners from "./components/LotteryApp/PastWinners";

import { useState } from "react";

import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

import { BigNumber, ethers } from "ethers";

import tokenContract from "./contracts/lottery.json";

function App() {
  const [ticket, setTicket] = useState(0);
  //   const [bid, setBid] = useState(0);

  const { isConnected } = useAccount();

  return (
    <div className="App">
      <main className="page-content">
        <section className="page-section">
          <ConnectButton />
          <inner-column>
            <h1 className="booming-voice slide-in-top">Lottery</h1>
            {isConnected && (
              <>
                <Lottery ticket={ticket} setTicket={setTicket} />
                <BidCard
                  // bid={bid}
                  // setBid={setBid}
                  ticket={ticket}
                  setTicket={setTicket}
                />
                <PastWinners />
                <RulesCard />
                <Flipdown
                  useContractRead={useContractRead}
                  tokenContract={tokenContract}
                />
              </>
            )}
          </inner-column>
        </section>
      </main>
      <div className="final-result hide"></div>
    </div>
  );
}

export default App;
