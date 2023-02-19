import { useState } from "react";

export default function PastWinners() {
  const [winners, setWinners] = useState([335, 500, 1100.11]);

  return (
    <past-card class="slide-in-left">
      <h2 className="teaser-voice">past winners</h2>
      <ol>
        {winners.map((winner, i) => {
          return (
            <li key={i} className={i == 0 ? "loud-voice" : "attention-voice"}>
              {" "}
              {winner}{" "}
            </li>
          );
        })}
      </ol>
    </past-card>
  );
}
