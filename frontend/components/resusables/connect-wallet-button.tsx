import React, { useCallback } from "react";
import { useConnect } from "wagmi";
//@ts-ignore
import logo from "../../public/cbw.svg";

const buttonStyles: React.CSSProperties = {
  background: "white",
  border: "1px solid black",
  boxSizing: "border-box", // Ensure this value is valid
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 200,
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  fontSize: 16,
  backgroundColor: "blue",
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 5,
};

export function BlueCreateWalletButton() {
  const { connectors, connect, data } = useConnect();

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);
  return (
    <button style={buttonStyles} onClick={createWallet}>
      <img src={logo} alt="coinbase wallet logo" style={{ width: 30 }} />
      Create Wallet
    </button>
  );
}
