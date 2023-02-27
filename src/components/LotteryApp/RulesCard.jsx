import { useStore } from "../../zustand/lotteryStore.jsx";
export default function RulesCard() {
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);

  return (
    <rules-card class="slide-in-left">
      <h2 className="loud-voice">RULES</h2>
      <ol>
        <li> Select 5 numbers or ROLL if Lazy </li>
        <li> Buy tickets! </li>
        <li>each is 1 MATIC, increasing total winnings</li>
        <li> Wait for the next draw </li>
        <li> Win or lose </li>
      </ol>
    </rules-card>
  );
}
