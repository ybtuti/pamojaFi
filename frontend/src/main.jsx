import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThirdwebProvider } from "thirdweb/react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.ts";

createRoot(document.getElementById("root")).render(
  <ThirdwebProvider>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </ThirdwebProvider>
);
