import { useState, useEffect } from "react";

export default function Lottery(props) {
  const max = 5; //total number of dials to check

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

  function handleSubmit(event) {
    event.preventDefault();
    const checked = dials.filter((dial) => dial.checked);
    props.setBid(Number(props.bid).toFixed(2));

    if (checked.length < max) {
      alert("Please select atleast 5");
    }
    if (props.bid < 1) {
      alert("Please Make a Bid");
    }
    console.log("Numbers", checked);
    console.log("Current Total", props.bid);
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
    <lottery-module className="slide-in-right">
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
              <label htmlFor={`dial-${dial.number}`} className={dial.class}>
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
