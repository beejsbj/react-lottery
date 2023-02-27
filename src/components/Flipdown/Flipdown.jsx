// import "./flipdown.css";
import { useEffect } from "react";
import { useStore } from "../../zustand/lotteryStore";
import { useContractRead } from "wagmi";
import { FlipDown as FlipDownClass } from "./FlipdownClass";
import tokenContract from "../../contracts/lottery.json";
import { BigNumber, ethers } from "ethers";

export default function Flipdown(props) {
  const endTime = useStore((state) => state.endTime.unixTimeStamp);
  const setEndTime = useStore((state) => state.setEndTime);
  const setErrors = useStore((state) => state.setErrors);

  const { data, error, isError, isLoading, isFetched, refetch } =
    useContractRead({
      abi: tokenContract,
      address: "0xd6B0434a28BE3d560EedbF3319d5b498E1d7b000",
      functionName: "getEndTime",
    });

  useEffect(() => {
    if (isFetched && !isError && !isLoading) {
      setEndTime({
        unixTimeStamp: ethers.BigNumber.from(data).toNumber(),
        refreshEndTime: refetch,
      });
    } else if (isError) {
      setErrors([error]);
    }

    var flipdown = new FlipDownClass(endTime);
    flipdown.start();

    //  flipdown.ifEnded(function () {
    //    endTime += week;
    //    flipdown.start(endTime);
    //  });
  }, []);

  return <div id="flipdown" className="flipdown"></div>;
}
