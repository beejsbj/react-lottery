import React from "react";
import ReactDOM from "react-dom/client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

//routes import
import App from "./App";

//style import
// import "./styles/site.css";

//wagmi
const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      coolMode
      theme={midnightTheme()}
      chains={chains}
    >
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);
