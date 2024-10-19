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
  address: "0xd33E1F5fab05F87F661A4F8999b04BFBd78Beb43",
});

export const sdk = new CoinbaseWalletSDK({
  appName: "PamojaFI",
  appChainIds: [8453, 84532, 11155111],
  appLogoUrl:
    "https://raw.githubusercontent.com/ybtuti/pamojaFi/refs/heads/main/frontend/public/logo.jpg",
});
