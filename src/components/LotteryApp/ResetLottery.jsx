import { useStore } from "../../zustand/lotteryStore.jsx";
export default function ResetLottery() {
  const nbsp = "\u00A0";
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);

  return (
    <button className={`button ${hasLotteryEnded ? "reset-lottery" : "hide"}`}>
      Get{nbsp}Lottery{nbsp}Results
    </button>
  );
}
