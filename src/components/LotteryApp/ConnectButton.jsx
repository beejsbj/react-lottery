import imgUrl from "../../assets/metamask-bw.png";

export default function ConnectButton() {
  return (
    <button className="button connect">
      <picture className="metamask-icon">
        <img src={imgUrl} alt="" />
      </picture>
      <span>Connect</span>
    </button>
  );
}
