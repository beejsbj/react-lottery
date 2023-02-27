import { useEffect } from "react";
import { useStore } from "../../zustand/lotteryStore";
import { useContractRead } from "wagmi";
import TicketCard from "./TicketCard";
import tokenContract from "../../contracts/lottery.json";
import { BigNumber, ethers } from "ethers";

export default function BidCard(props) {
  const pot = useStore((state) => state.pot.amount);
  const setPot = useStore((state) => state.setPot);
  const setErrors = useStore((state) => state.setErrors);

  const { data, error, isError, isLoading, isFetched, refetch } =
    useContractRead({
      abi: tokenContract,
      address: "0x3E1Eb24ef031002E41d173BE2B1c7D04DF67b9d2",
      functionName: "pot",
    });

  useEffect(() => {
    if (isFetched && !isError && !isLoading) {
      const potWei = BigNumber.from(data);
      setPot({
        amount: ethers.utils.formatEther(potWei),
        refresh: refetch,
      });
    } else if (isError) {
      setErrors({ errors: [error] });
    }
  }, []);
  let potUpdateClass = "";
  useEffect(() => {
    potUpdateClass = "big-heartbeat";
    setTimeout(() => {
      potUpdateClass = "";
    }, 1000);
  }, [pot]);

  return (
    <bid-card class="slide-in-left">
      <TicketCard />
      <text-content>
        <h2 className="teaser-voice">current bid</h2>
        {
          <p
            htmlFor="user-bid"
            id="current-bid"
            className={`loud-voice heartbeat ${potUpdateClass}`}
          >
            Ξ {pot}
          </p>
        }
      </text-content>
    </bid-card>
  );
}
