import { ConnectButton as MetamaskButton } from "@rainbow-me/rainbowkit";
import imgUrl from "../../assets/metamask-bw.png";

export default function ConnectButton() {
  return (
    <MetamaskButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={connected ? "wallet-wrapper slide-in-top-bar" : "connect-wrapper"}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="button"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="button"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <>
                  <button
                    className="button picture"
                    onClick={openChainModal}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <picture
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                          />
                        )}
                      </picture>
                    )}
                    {chain.name}
                  </button>

                  <button
                    className="button"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    <span className="balance">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                  </button>
                </>
              );
            })()}
          </div>
        );
      }}
    </MetamaskButton.Custom>
  );
}
