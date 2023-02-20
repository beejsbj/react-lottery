

export default function BidCard(props) {


  function ticketDecrement() {
	var ticket = props.ticket - 1
	if (ticket < 0){
		ticket = 0
	}
	props.setTicket(ticket)

  }
  function ticketIncrement() {
	var ticket = props.ticket + 1
	props.setTicket(ticket)
  }

  return (
    <bid-card class="slide-in-left">
      <ticket-card>
          <h2 className="teaser-voice">
            Buy your Tickets
          </h2>
          <div>
				<button className="minus button attention-voice" onClick={ticketDecrement}>
				﹣
				</button>
				<p className="ticket-box loud-voice heartbeat">{props.ticket}</p>
				<button className="plus button attention-voice" onClick={ticketIncrement}>
				＋
				</button>
			 </div>
      </ticket-card>
      <text-content>
        <h2 className="teaser-voice">current bid</h2>
        <p
          htmlFor="user-bid"
          id="current-bid"
          className="loud-voice heartbeat"
        >
          Ξ {props.bid}
        </p>
      </text-content>
    </bid-card>
  );
}
