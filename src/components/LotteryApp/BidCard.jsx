import { useContractRead } from "wagmi";
import tokenContract from "../../contracts/lottery.json";
import { BigNumber, ethers } from "ethers";

export default function BidCard(props) {
  console.log("bid card start");

  const { data, isError, isLoading, isFetched } = useContractRead({
    abi: tokenContract,
    address: "0x0bebc62c4133ff21c4ce8593f6b2fcf56c071533",
    functionName: "pot",
  });

  const potWei = ethers.BigNumber.from(data);
  const pot = ethers.utils.formatEther(potWei);

  console.log("bid card end");

  //   props.setBid(pot);

  function ticketDecrement() {
    var ticket = props.ticket - 1;
    if (ticket < 0) {
      ticket = 0;
    }
    props.setTicket(ticket);
  }
  function ticketIncrement() {
    var ticket = props.ticket + 1;
    props.setTicket(ticket);
  }

  return (
    <bid-card class="slide-in-left">
      <ticket-card>
        <h2 className="teaser-voice">Buy your Tickets</h2>
        <div>
          <button
            className="minus button attention-voice"
            onClick={ticketDecrement}
          >
            ﹣
          </button>
          <p className="ticket-box loud-voice heartbeat">{props.ticket}</p>
          <button
            className="plus button attention-voice"
            onClick={ticketIncrement}
          >
            ＋
          </button>
        </div>
      </ticket-card>
      <text-content>
        <h2 className="teaser-voice">current bid</h2>
        <p htmlFor="user-bid" id="current-bid" className="loud-voice heartbeat">
          Ξ {pot}
        </p>
      </text-content>
    </bid-card>
  );
}
