import { useState } from "react";

export default function BidCard(props) {
  function bidHandler(event) {
    props.setBid(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    props.setBid(Number(props.bid).toFixed(2));
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
          placeholder="$$$"
          step="0.01"
          value={props.bid}
          onChange={bidHandler}
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
          $ {props.bid}
        </output>
      </text-content>
    </bid-card>
  );
}
