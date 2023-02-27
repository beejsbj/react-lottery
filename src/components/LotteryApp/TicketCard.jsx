import { useStore } from "../../zustand/lotteryStore";

export default function TicketCard() {
  const tickets = useStore((state) => state.tickets.amount);

  const setTicketAmount = useStore((state) => state.setTicketAmount);

  function ticketDecrement() {
    if (tickets <= 1) return;
    setTicketAmount(tickets - 1);
  }

  function ticketIncrement() {
    if (tickets >= 10) return;
    setTicketAmount(tickets + 1);
  }

  return (
    <ticket-card>
      <h2 className="teaser-voice">Buy your Tickets</h2>
      <div>
        <button
          className="minus button attention-voice"
          onClick={ticketDecrement}
        >
          ﹣
        </button>
        <p className="ticket-box loud-voice heartbeat">{tickets}</p>
        <button
          className="plus button attention-voice"
          onClick={ticketIncrement}
        >
          ＋
        </button>
      </div>
    </ticket-card>
  );
}
