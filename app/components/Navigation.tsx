import React from "react"; // ✅ Required for JSX, even if unused
import { Link, useLocation } from "@remix-run/react";
import   ConnectWallet from "./ConnectWallet";
import { Coins, Store } from "lucide-react"; // ✅ Icons for Mint & Marketplace

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-theme-navy/20 backdrop-blur-lg border-b border-theme-orange/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🔥 Left Side - Logo & Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold gradient-text">
              NFT dApp
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/mint"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === "/"
                    ? "text-theme-navy bg-gradient-to-r from-theme-orange to-theme-yellow font-semibold"
                    : "text-theme-yellow hover:bg-theme-orange/10"
                }`}
              >
                <Coins size={20} />
                <span>Mint</span>
              </Link>
              <Link
                to="/marketplace"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === "/marketplace"
                    ? "text-theme-navy bg-gradient-to-r from-theme-orange to-theme-yellow font-semibold"
                    : "text-theme-yellow hover:bg-theme-orange/10"
                }`}
              >
                <Store size={20} />
                <span>Marketplace</span>
              </Link>
            </div>
          </div>
          {/* 🔥 Right Side - Wallet Connect */}
          <ConnectWallet />
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-4 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Seizan.Shib All rights reserved.</p>
      </footer>
    </nav>
    
  );
}
