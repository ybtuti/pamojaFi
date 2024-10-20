import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { createConfig } from "wagmi";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: "5ce34943c90f2091165e20cb2437bec2",
});

export const contract = getContract({
  client,
  chain: defineChain(84532),
  address: "0xDA5BE4B4E653EeBEecbb8F2B6a5eD282F9DaFcC0",
});

export const governanceContract = getContract({
  client,
  chain: defineChain(84532),
  address: "0x52B69A18BE99c9848e412B3529cB23938FA0DE67",
});

export const sdk = new CoinbaseWalletSDK({
  appName: "PamojaFI",
  appChainIds: [84532],
  appLogoUrl:
    "https://raw.githubusercontent.com/ybtuti/pamojaFi/refs/heads/main/frontend/public/logo.jpg",
});
