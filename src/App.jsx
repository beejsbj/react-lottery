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
  const { data, isError, isLoading, isFetched } = useContractRead({
    abi: tokenContract,
    address: "0x0bebc62c4133ff21c4ce8593f6b2fcf56c071533",
    functionName: "pot",
  });

  const [ticket, setTicket] = useState(0);
  var pot = 0;

  //   if (isFetched) {
  const potWei = ethers.BigNumber.from(data);
  pot = ethers.utils.formatEther(potWei);
  //   }

  const [bid, setBid] = useState(pot);

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
                <Lottery
                  bid={bid}
                  setBid={setBid}
                  ticket={ticket}
                  setTicket={setTicket}
                />
                <BidCard bid={bid} ticket={ticket} setTicket={setTicket} />
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
