import Loading from "./Loading.jsx";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import tokenContract from "../../contracts/lottery.json";
import { ethers } from "ethers";
import { useStore } from "../../zustand/lotteryStore.jsx";

export default function Lottery(props) {
  const max = 5; //total number of dials to check

  let dialsArr = Array.from(Array(50).keys());
  dialsArr = dialsArr.map((dial) => {
    return {
      number: dial + 1,
      checked: false,
    };
  });

  const sound = new Howl({
    src: ["/click.wav"],
  });

  const selectedNumbers = useStore((state) => state.numbers.selected);
  const tickets = useStore((state) => state.tickets.amount);
  const setBuyTicket = useStore((state) => state.setBuyTicket);
  const setSelectedNumbers = useStore((state) => state.setSelectedNumbers);
  const [dials, setDials] = useState(dialsArr);

  console.log(tickets);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: tokenContract,
    address: "0xd6B0434a28BE3d560EedbF3319d5b498E1d7b000",
    functionName: "enter",
    args: [selectedNumbers, tickets],
    overrides: {
      value: ethers.utils.parseEther(0.001 * tickets + ""),
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function maxLimit() {
    const checked = dials.filter((dial) => dial.checked);
    return checked.length < max;
  }

  function resetDials() {
    const updatedDials = dials.map((dial) => {
      dial.checked = false;
      return dial;
    });
    setDials(updatedDials);
  }

  function removeRollClass() {
    const updatedDials = dials.map((dial) => {
      dial.class = "";
      return dial;
    });
    setDials(updatedDials);
  }

  function rollChecked() {
    //   randomly check "max" dials
    const toChecks = getRndIntArr();
    const updatedDials = dials.map((dial, i) => {
      if (toChecks.includes(i)) {
        dial.checked = true;
      }
      return dial;
    });
    setDials(updatedDials);
  }

  function getRndIntArr() {
    const numbers = [];
    for (let i = 0; i < max; i++) {
      let randomNum = Math.floor(Math.random() * dials.length);
      while (numbers.includes(randomNum)) {
        randomNum = Math.floor(Math.random() * dials.length);
      }
      numbers.push(randomNum);
    }
    return numbers;
  }

  //event handler
  function toggleChecked(number, event) {
    sound.play();
    if (event.target.checked && !maxLimit()) {
      alert("Can only Select " + max);
      return;
    }
    const updatedDials = dials.map((dial) => {
      if (dial.number == number) {
        dial.checked = event.target.checked;
      }
      return dial;
    });
    setDials(updatedDials);
  }

  //   const { config } = usePrepareContractWrite({
  //     address: "0xd6B0434a28BE3d560EedbF3319d5b498E1d7b000",
  //     abi: tokenContract,
  //     functionName: "enter",
  //     args: [
  //       dials.filter((dial) => dial.checked).map((dial) => dial.number),
  //       props.ticket,
  //     ],
  //     overrides: {
  //       value: ethers.utils.parseEther(0.001 * props.ticket + ""),
  //     },
  //   });

  //   const { data, write } = useContractWrite(config);

  //   const { isSuccess, error } = useWaitForTransaction({
  //     confirmations: 1,
  //     hash: data?.hash,
  //   });

  async function handleSubmit(event) {
    event.preventDefault();

    if (selectedNumbers.length < max) {
      // alert("Please select atleast 5");
      // return;
      console.log(selectedNumbers.length);
    }

    console.log(tickets);
    tickets.buyTicket();
  }

  async function handleRoll(event) {
    event.preventDefault();

    event.target.style.pointerEvents = "none";
    resetDials();

    const updatedDials = dials.map((dial) => {
      dial.class =
        dial.number % 2 == 0 ? "rotate-center" : "rotate-center-reverse";
      return dial;
    });

    setDials(updatedDials);
    setTimeout(rollChecked, 1100);
    setTimeout(() => {
      removeRollClass();
      event.target.style.pointerEvents = "auto";
    }, 1200);
  }

  useEffect(() => {
    setSelectedNumbers(
      dials.filter((dial) => dial.checked).map((dial) => dial.number)
    );
  }, [dials]);

  useEffect(() => {
    setBuyTicket(write);
  }, [write]);

  return (
    <lottery-module class="slide-in-right">
      <form>
        <ul>
          {dials.map((dial) => (
            <li key={`dialKey-${dial.number}`}>
              <input
                type="checkbox"
                id={`dial-${dial.number}`}
                className="dials"
                checked={dial.checked}
                onChange={(event) => {
                  toggleChecked(dial.number, event);
                }}
              />
              <label
                htmlFor={`dial-${dial.number}`}
                className={dial.class}
                //  onMouseEnter={() => sound.play()}
                //  onMouseLeave={() => sound.pause()}
              >
                <span>{dial.number}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button className="roll attention-voice button" onClick={handleRoll}>
            ROLL
          </button>
          <button
            className="submit attention-voice button contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </lottery-module>
  );
}
