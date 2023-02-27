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
      address: "0xd6B0434a28BE3d560EedbF3319d5b498E1d7b000",
      functionName: "pot",
    });

  useEffect(() => {
    if (isFetched && !isError && !isLoading) {
      const potWei = BigNumber.from(data);
      setPot({
        amount: ethers.utils.formatEther(potWei),
        refreshPot: refetch,
      });
    } else if (isError) {
      setErrors({ errors: [error] });
    }
  }, []);

  return (
    <bid-card class="slide-in-left">
      <TicketCard />
      <text-content>
        <h2 className="teaser-voice">current bid</h2>
        <p htmlFor="user-bid" id="current-bid" className="loud-voice heartbeat">
          Ξ {pot}
        </p>
      </text-content>
    </bid-card>
  );
}
