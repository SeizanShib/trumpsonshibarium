import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./utils/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import Navigation from "./components/Navigation"; // ✅ Ensure this is imported
import "./tailwind.css"; // ✅ Ensure Tailwind is imported

const queryClient = new QueryClient();

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black/80 suppressHydrationWarning={true} backdrop-blur-lg pt-20">
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider theme={darkTheme()} modalSize="compact">
              
              {/* ✅ FIXED NAVBAR */}
              <Navigation />

              {/* ✅ PAGE CONTENT */}
              <Outlet />
              <ScrollRestoration />
              <Scripts />
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme-navy via-black to-theme-navy">
  <div className="container mx-auto px-4 py-4 md:py-8 flex justify-center -mt-28">
    <div className="max-w-4xl mx-auto text-center">
      <div className="glass-card rounded-2xl p-6">
        <img
          src="https://res.cloudinary.com/de781wbp8/image/upload/v1738117142/DD_DT_jh9sfb.png"
          alt="Trump NFT Collection"
          className="w-full max-w-md mx-auto rounded-lg mb-4"
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold gradient-text">Trumps on Shibarium</h2>
          <p className="text-gray-300">
            A unique collection of 1,361 NFTs featuring 16 different designs:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>13 Common variants</li>
            <li>1 Rare design</li>
            <li>1 Very Rare design</li>
            <li>1 Extremely Rare design (Only one exists!)</li>
          </ul>
      </div>
    </div>
  </div>
</div>

  </div>
);
      </body>
    </html>
  );
}

