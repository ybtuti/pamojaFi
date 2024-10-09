// import { http, cookieStorage, createConfig, createStorage } from "wagmi";
// import { base, baseSepolia } from "wagmi/chains";
// import { coinbaseWallet, injected } from "wagmi/connectors";

// export function getConfig() {
//   return createConfig({
//     chains: [base, baseSepolia],
//     connectors: [
//       injected(),
//       coinbaseWallet({
//         appName: "pamojaFI",
//         preference: "smartWalletOnly",
//         appLogoUrl:
//           "https://raw.githubusercontent.com/ybtuti/pamojaFi/refs/heads/main/frontend/public/logo.jpg",
//       }),
//     ],
//     storage: createStorage({
//       storage: cookieStorage,
//     }),
//     ssr: true,
//     transports: {
//       [base.id]: http(),
//       [baseSepolia.id]: http(),
//     },
//   });
// }

// declare module "wagmi" {
//   interface Register {
//     config: ReturnType<typeof getConfig>;
//   }
// }

import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: "va9ruupxiihbem0y" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
