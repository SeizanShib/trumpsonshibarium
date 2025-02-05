import { useEffect, useState, useMemo } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { NFT_CONTRACT_ADDRESS } from "../utils/contractAddresses";
import { nftContractABI } from "../utils/nftContractABI";
import axios from "axios";

export default function Marketplace() {
  const { address, isConnected } = useAccount();
  const [userNFTs, setUserNFTs] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Setter isClient til true etter hydrering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Vi definerer en "safeAddress" slik at vi alltid sender en streng til kontraktkallene.
  const safeAddress = address || "0x0000000000000000000000000000000000000000";

  // ──────────────────────────────────────────────
  // 1. Hent antall NFTs brukeren eier med useReadContract.
  const { data: balance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: nftContractABI,
    functionName: "balanceOf",
    args: [safeAddress],
    query: { enabled: isClient && Boolean(address) },
  });

  // ──────────────────────────────────────────────
  // 2. Lag en liste med kontraktskall for tokenOfOwnerByIndex for hvert NFT.
  const contracts = useMemo(() => {
    if (!balance || balance === 0n || !address) return [];
    return Array.from({ length: Number(balance) }, (_, i) => ({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: nftContractABI,
      functionName: "tokenOfOwnerByIndex",
      args: [safeAddress, BigInt(i)],
    }));
  }, [balance, address, safeAddress]);

  // ──────────────────────────────────────────────
  // 3. For å sikre en stabil hook-rekkefølge sender vi med et dummy-kall
  // dersom vi ikke har noen reelle kontraktskall.
  const contractsToUse = useMemo(() => {
    return contracts.length > 0
      ? contracts
      : [
          {
            address: NFT_CONTRACT_ADDRESS as `0x${string}`,
            abi: nftContractABI,
            functionName: "tokenOfOwnerByIndex",
            args: [safeAddress, BigInt(0)],
          },
        ];
  }, [contracts, safeAddress]);

  // ──────────────────────────────────────────────
  // 4. Hent token-IDs med useReadContracts.
  const { data: tokenIds } = useReadContracts({
    contracts: contractsToUse,
    query: { enabled: isClient && contracts.length > 0 },
  });

  // ──────────────────────────────────────────────
  // 5. Når tokenIds oppdateres, mappes de til bilde-URLer
  useEffect(() => {
    if (tokenIds && Array.isArray(tokenIds)) {
      // Asynkront hente metadataene for alle NFTs
      const fetchNFTs = async () => {
        const nftImages: string[] = []; // Midlertidig lagring av bilder
        for (const tokenId of tokenIds) {
          const url = `https://gateway.pinata.cloud/ipfs/bafybeicdtykc33hm7orur2kxxv6r3famsuyvbeencto3vnt7tnrgyb4po4/${tokenId}.json`;

          try {
            const response = await axios.get(url);
            const data = response.data;
            nftImages.push(data.imageURL || "fallback-image.jpg"); // Bruk fallback-bilde hvis ingen imageURL
          } catch (error) {
            console.error("Error loading NFT data:", error);
            nftImages.push("https://res.cloudinary.com/de781wbp8/image/upload/v1738732384/K9_ik9oaz.gif"); // fallback-bilde
          }
        }

        setUserNFTs(nftImages); // Oppdater state med alle bildene
      };

      fetchNFTs();
    }
  }, [tokenIds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-navy via-black to-theme-navy py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">My NFT Collection (coming soon)</h1>
        {isConnected ? (
          userNFTs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userNFTs.map((nft, index) => (
                <div key={index} className="glass-card p-4 rounded-xl shadow-lg">
                  <img
                    src={nft}
                    alt={`NFT ${index}`}
                    className="w-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">You don’t own any NFTs yet.</p>
          )
        ) : (
          <p className="text-gray-300">Connect your wallet to see your NFTs.</p>
        )}
      </div>
    </div>
  );
}
