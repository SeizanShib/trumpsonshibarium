import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletIcon, LogOutIcon, AlertTriangle } from "lucide-react";
import { shibarium } from "../utils/chains"; // Sørg for at denne definerer Shibarium/Puppynet
import '@rainbow-me/rainbowkit/styles.css';

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        openChainModal,
        mounted,
      }) => {
        if (!mounted) return null; // Unngå flash før alt er klar

        // Bestem om brukeren er på feil nettverk
        const isWrongNetwork = account && chain && chain.id !== shibarium.id;

        // Her lager vi en knapp som alltid åpner modal for wallet-tilkobling
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={openConnectModal}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-theme-orange to-theme-yellow hover:from-theme-orange/90 hover:to-theme-yellow/90 text-theme-navy font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <WalletIcon size={20} />
              <span>{account ? "Change Wallet" : "Connect Wallet"}</span>
            </button>
            {isWrongNetwork && (
              <button
                onClick={openChainModal}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-200 border-2 border-yellow-500/50 hover:bg-yellow-500/30 rounded-lg transition-all duration-300"
              >
                <AlertTriangle size={20} />
                <span className="hidden sm:inline">Switch to Puppynet</span>
              </button>
            )}
            {account && !isWrongNetwork && (
              <button
                onClick={openAccountModal}
                className="flex items-center gap-2 px-4 py-2 text-red-500 border-2 border-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300"
              >
                <LogOutIcon size={20} />
                <span className="hidden sm:inline">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
