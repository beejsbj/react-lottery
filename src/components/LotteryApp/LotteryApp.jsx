import RulesCard from "./RulesCard";
import Lottery from "./Lottery";
import Flipdown from "../Flipdown/Flipdown";
import BidCard from "./BidCard";
import PastWinners from "./PastWinners";

import { useState, useEffect } from "react";

export default function LotteryApp() {
  const [ticket, setTicket] = useState(1);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const $buttons = document.querySelectorAll("button");
    $buttons.forEach(($button) => {
      $button.addEventListener("click", function (event) {
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        event.target.style.setProperty("--mouse-y", mouseY);
        event.target.style.setProperty("--mouse-x", mouseX);
      });
    });
  });

  return (
    <>
      <Lottery
        ticket={ticket}
        setTicket={setTicket}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <BidCard
        ticket={ticket}
        setTicket={setTicket}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <PastWinners />
      <RulesCard />
      <Flipdown />
    </>
  );
}
