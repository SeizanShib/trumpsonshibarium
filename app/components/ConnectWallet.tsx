import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletIcon, LogOutIcon } from "lucide-react";
import '@rainbow-me/rainbowkit/styles.css';

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        openConnectModal,
        openAccountModal,
        mounted,
      }) => {
        if (!mounted) return null; // Unngå flash før alt er klar

        return (
          <div className="flex items-center gap-2">
            {/* Connect Wallet Button */}
            <button
              onClick={openConnectModal}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-theme-orange to-theme-yellow hover:from-theme-orange/90 hover:to-theme-yellow/90 text-theme-navy font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <WalletIcon size={20} />
              <span>{account ? "Change Wallet" : "Connect Wallet"}</span>
            </button>

            {/* If the user is connected, show account and logout button */}
            {account && (
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
