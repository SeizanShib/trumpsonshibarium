import { createConfig, http } from "wagmi";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { Chain } from "wagmi/chains";


// ✅ Define Shibarium and Puppynet chains correctly
const shibariumChain: Chain = {
  id: 109, // Shibarium Mainnet
  name: "Shibarium",
  nativeCurrency: { name: "BONE", symbol: "BONE", decimals: 18 },
  rpcUrls: { default: { http: ["https://www.shibrpc.com"] } },
  blockExplorers: { default: { name: "ShibariumScan", url: "https://shibariumscan.io" } },
};

const puppynetChain: Chain = {
  id: 157, // Shibarium Puppynet Testnet
  name: "Puppynet",
  nativeCurrency: { name: "BONE", symbol: "BONE", decimals: 18 },
  rpcUrls: { default: { http: ["https://puppynet.shibrpc.com"] } },
  blockExplorers: { default: { name: "PuppyScan", url: "https://puppyscan.shib.io" } },
};

// ✅ Correct Wagmi setup
export const wagmiConfig = createConfig({
  chains: [shibariumChain, puppynetChain], // ✅ Required property
  connectors: [
    injected(), // MetaMask, Brave, etc.
    walletConnect({ projectId: "191c1c28aa531a4adce543cebcde6257" }), // WalletConnect
    coinbaseWallet({ appName: "Trumps on Shibarium" }), // Coinbase Wallet
  ],
  transports: {
    [shibariumChain.id]: http(shibariumChain.rpcUrls.default.http[0]),
    [puppynetChain.id]: http(puppynetChain.rpcUrls.default.http[0]),
  },
});
