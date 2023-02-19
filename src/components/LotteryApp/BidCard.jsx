import { useState } from "react";

export default function BidCard(props) {
  const [ticket, setTicket] = useState(0);
  function ticketHandler(event) {
    setTicket(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    //  setTicket(Number(ticket).toFixed(2));
  }

  return (
    <bid-card class="slide-in-left">
      <form className="bid-form" onSubmit={submitHandler}>
        <label className="teaser-voice" htmlFor="user-bid">
          make your bid
        </label>
        <input
          id="user-bid"
          type="number"
          min="1"
          max="100"
          placeholder="ticket"
          step="1"
          value={ticket}
          onChange={ticketHandler}
        />
        {/* <button className="button">BID</button> */}
      </form>
      <text-content>
        <h2 className="teaser-voice">current bid</h2>
        <output
          htmlFor="user-bid"
          id="current-bid"
          className="attention-voice heartbeat"
        >
          Ξ {props.bid}
        </output>
      </text-content>
    </bid-card>
  );
}
