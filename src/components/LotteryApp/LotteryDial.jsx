export default function LotteryDial(dial) {
  return (
    <li>
      <input
        type="checkbox"
        id={`dial-${dial.id}`}
        className="dials"
        value={dial.id}
      />
      <label htmlFor={`dial-${dial.id}`}>
        <span>{dial.id}</span>
      </label>
    </li>
  );
}
