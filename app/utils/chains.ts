import { Chain } from "viem";

export const shibarium = {
  id: 157, // ✅ Puppynet Chain ID
  name: "Puppynet",
  network: "Puppynet Shibarium",
  nativeCurrency: {
    decimals: 18,
    name: "BONE",
    symbol: "BONE",
  },
  rpcUrls: {
    default: { http: ["https://puppynet.shibrpc.com"] },
    public: { http: ["https://puppynet.shibrpc.com"] },
  },
  blockExplorers: {
    default: { name: "Puppyscan", url: "https://puppyscan.shib.io" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1,
    },
  },
} as const satisfies Chain;
