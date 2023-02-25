import RulesCard from "./RulesCard";
import Lottery from "./Lottery";
import Flipdown from "../Flipdown/Flipdown";
import BidCard from "./BidCard";
import PastWinners from "./PastWinners";

import { useState } from "react";


export default function LotteryApp() {
  const [ticket, setTicket] = useState(0);

  return (
    <>
      <Lottery ticket={ticket} setTicket={setTicket} />
      <BidCard ticket={ticket} setTicket={setTicket} />
      <PastWinners />
      <RulesCard />
      <Flipdown />
    </>
  );
}
