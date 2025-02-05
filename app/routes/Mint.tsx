import React from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { Loader2, Flame } from "lucide-react";
import { NFT_CONTRACT_ADDRESS, KN_BONE_TOKEN_ADDRESS } from "../utils/contractAddresses";
import { nftContractABI } from "../utils/nftContractABI";

// Minimal ERC20 ABI for approve and allowance
const erc20ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

export default function MintPage() {
  const { isConnected, address } = useAccount();

  // State for minted count, errors og popup-meldinger
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = React.useState(false);
  
  // Max opplag for minting
  const maxSupply = 1361;
  
  // Brukeren velger mellom "limited" og "unlimited" godkjenning for knBONE
  const [approvalType, setApprovalType] = React.useState<"limited" | "unlimited">("limited");

  // Hent mint-prisen fra NFT-kontrakten (fallback: 20 BONE)
  const { data: mintPrice } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftContractABI,
    functionName: "MINT_PRICE",
  });
  const effectiveMintPrice = mintPrice ? BigInt(mintPrice.toString()) : parseEther("20");

  // Hent totalSupply fra NFT-kontrakten
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftContractABI,
    functionName: "totalSupply",
  });

  // Hent brukerens native BONE-saldo
  const { data: boneBalance } = useBalance({ address });

  // Hent knBONE-allowance (hvor mye knBONE brukeren har godkjent NFT-kontrakten til å trekke)
  const { data: knBoneAllowance, refetch: refetchKnBoneAllowance } = useReadContract({
    address: KN_BONE_TOKEN_ADDRESS,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, NFT_CONTRACT_ADDRESS],
  });

  // Skrivetransaksjoner: én for minting og én for approve
  const { writeContract: mint, isPending: isMinting } = useWriteContract();
  const { writeContract: approveKnBONE } = useWriteContract();

  // Lytt etter Transfer-event for å oppdatere UI når minting er bekreftet
  useWatchContractEvent({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftContractABI,
    eventName: "Transfer",
    onLogs: () => {
      refetchTotalSupply();
      console.log("Transfer event detected, mint confirmed.");
      setMintSuccess(true);
      setTimeout(() => setMintSuccess(false), 5000);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("nftMinted"));
      }
    },
  });

  // Oppdater antall mintede NFT-er når totalSupply endres
  React.useEffect(() => {
    if (totalSupply !== undefined) {
      setTotalMinted(Number(totalSupply));
    }
  }, [totalSupply]);

  // Local state for bekreftelse under knBONE mint (loaderen)
  const [isConfirming, setIsConfirming] = React.useState(false);
  const isLoading = isMinting || isConfirming;
  const hasBoneBalance = React.useMemo(() => {
    return boneBalance?.value ? boneBalance.value >= effectiveMintPrice : false;
  }, [boneBalance, effectiveMintPrice]);

  // Funksjon for å sjekke knBONE-allowance og sende approve-transaksjon hvis nødvendig.
  async function checkAndApproveKnBone() {
    const approvalAmount =
      approvalType === "unlimited" ? parseEther("1000000000") : effectiveMintPrice;
    if (!knBoneAllowance || BigInt(knBoneAllowance.toString()) < approvalAmount) {
      console.log(
        "Allowance too low, sending approve transaction with",
        approvalType,
        "approval. Approval amount:",
        approvalAmount.toString()
      );
      try {
        const variables = {
          address: KN_BONE_TOKEN_ADDRESS,
          abi: erc20ABI,
          functionName: "approve",
          args: [NFT_CONTRACT_ADDRESS, approvalAmount],
          __mode: "recklesslyUnprepared",
          chain: undefined,
          account: address,
          overrides: { gasLimit: 200000 },
        };
        const result = await approveKnBONE(variables as any);
        console.log("Approve transaction result:", result);
        await refetchKnBoneAllowance();
      } catch (err) {
        console.error("Approve failed:", err);
        throw new Error("Approve transaction failed");
      }
    } else {
      console.log("Sufficient knBONE allowance available.");
    }
  }

  // Håndterer minting: med BONE (true) eller knBONE (false)
  const handleMint = async (payWithBONE: boolean) => {
    try {
      setError(null);
      // For BONE, mint med native verdi.
      if (payWithBONE) {
        await mint({
          address: NFT_CONTRACT_ADDRESS,
          abi: nftContractABI,
          functionName: "mint",
          args: [true],
          value: effectiveMintPrice as bigint,
        });
      } else {
        // For knBONE, sjekk og send approve om nødvendig, så mint.
        await checkAndApproveKnBone();
        setIsConfirming(true);
        await mint({
          address: NFT_CONTRACT_ADDRESS,
          abi: nftContractABI,
          functionName: "mint",
          args: [false],
        });
        setIsConfirming(false);
      }
      console.log("Mint transaction submitted.");
      // Vi stoler på at Transfer-eventet setter mintSuccess.
    } catch (err: any) {
      console.error("Mint failed:", err);
      setError("This is minted, try again!");
      setIsConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-navy via-black to-theme-navy">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white text-center">Trumps on Shibarium</h1>
        <div className="max-w-lg mx-auto mt-8 glass-card p-6">
          <p className="text-white text-lg text-center mb-4">
            {totalMinted} / {maxSupply} minted
          </p>
          <p className="text-theme-yellow font-bold text-center text-xl">
            {formatEther(effectiveMintPrice)} BONE
          </p>
          {/* Approval type selection */}
          <div className="mt-4">
            <p className="text-white text-center mb-2">Approval Type for knBONE:</p>
            <div className="flex justify-center gap-4">
              <label className="text-white">
                <input
                  type="radio"
                  name="approvalType"
                  value="limited"
                  checked={approvalType === "limited"}
                  onChange={() => setApprovalType("limited")}
                /> Limited
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  name="approvalType"
                  value="unlimited"
                  checked={approvalType === "unlimited"}
                  onChange={() => setApprovalType("unlimited")}
                /> Unlimited
              </label>
            </div>
          </div>
          {/* Mint buttons */}
          <button
            onClick={() => handleMint(true)}
            disabled={isLoading || !hasBoneBalance}
            className="mt-4 w-full bg-yellow-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Flame />} Mint with BONE
            <img
              src="https://res.cloudinary.com/de781wbp8/image/upload/v1738117171/bone_ra7lc4.png"
              alt="BONE Icon"
              className="h-6 w-6 ml-2"
            />
          </button>
          <button
            onClick={() => handleMint(false)}
            disabled={isLoading}
            className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Flame />} Mint with knBONE
            <img
              src="https://res.cloudinary.com/de781wbp8/image/upload/v1738117171/knbone_mh4obk.png"
              alt="knBONE Icon"
              className="h-6 w-6 ml-2"
            />
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {mintSuccess && <p className="mt-4 text-green-500 text-center">Mint successful!</p>}
        </div>
        {/* Information text */}
        <div className="mt-6 p-4 border-t border-gray-400 max-w-3xl mx-auto">
          <p className="gradient-text text-center text-sm">
            <strong>What:</strong> 16 unique NFT variants that give extra rewards in the Bonecrusher dApp.<br />
            <strong>How:</strong> Some (#1–13) target specific partner tokens; others (#14–16) apply to all bonus tokens.<br />
            <strong>Bonus:</strong> Only one bonus type applies at a time (“either–or”). You can boost rewards from a few percent up to 100%.<br />
            <strong>Trading:</strong> NFTs can be freely bought, sold, or traded on the Marketplace.<br />
            <strong>Minting:</strong> Costs 20 BONE (or knBONE) per NFT; you get a random variant.<br />
            <strong>Risks:</strong> NFT values can fluctuate, and the bonus doesn’t guarantee profits.<br />
            <strong>SOON:</strong> More info later~ <br />
          </p>
        </div>
      </div>
    </div>
  );
}
