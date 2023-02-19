import Loading from "./Loading.jsx";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import { useContractWrite } from "wagmi";
import tokenContract from "../../contracts/lottery.json";
import { BigNumber, ethers } from "ethers";

export default function Lottery(props) {
  const max = 5; //total number of dials to check

  var sound = new Howl({
    src: ["/click.wav"],
  });

  useEffect(() => {
    const $buttons = document.querySelectorAll("button");
    $buttons.forEach(($button) => {
      $button.addEventListener("click", function (event) {

        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        event.target.style.setProperty("--mouse-y", mouseY);
        event.target.style.setProperty("--mouse-x", mouseX);

      });
    });
  });

  var dialsArr = Array.from(Array(50).keys());
  dialsArr = dialsArr.map((dial) => {
    return {
      number: dial + 1,
      checked: false,
    };
  });

  const [dials, setDials] = useState(dialsArr);

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
    for (var i = 0; i < max; i++) {
      var randomNum = Math.floor(Math.random() * dials.length);
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

  
    const {
      data: lotteryData,
      isError,
      isLoading,
      write: submitBid,
    } = useContractWrite({
      abi: tokenContract,
      mode: "recklesslyUnprepared",
      address: "0x0bebc62c4133ff21c4ce8593f6b2fcf56c071533",

      functionName: "enter",
      overrides: {
        value: ethers.utils.parseEther("0.0001"),
      },
    });

  async function handleSubmit(event) {
    event.preventDefault();
    const checked = dials.filter((dial) => dial.checked);

    var numbersString = "";

    checked.forEach((dial) => {
      numbersString += dial.number;
    });

    if (checked.length < max) {
      alert("Please select atleast 5");
    }
     if (props.bid < 1) {
       alert("Please Make a Bid");
     }

     const bigNumberString = ethers.BigNumber.from(numbersString);
     console.log(bigNumberString);

   //  await submitBid({
   //    args: [12345],
   //  });
  }

  function handleRoll(event) {
    event.preventDefault();
    resetDials();
    const updatedDials = dials.map((dial) => {
      dial.class =
        dial.number % 2 == 0 ? "rotate-center" : "rotate-center-reverse";
      return dial;
    });
    setDials(updatedDials);
    setTimeout(removeRollClass, 1200);
    setTimeout(rollChecked, 1100);
  }

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
