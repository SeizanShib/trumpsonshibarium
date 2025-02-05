//import { nftContractABI } from './nftContractABI';
//import { marketplaceABI } from './marketplaceABI';

// Contract addresses on Shibarium Puppynet (Chain ID: 157)
export const NFT_CONTRACT_ADDRESS = '0xA2Ff92A739eCd3A450c9EAB992A96444A34cCd04';
export const KNBONE_CONTRACT_ADDRESS = '0x3358FCA51d7C0408750FBbE7777012E0b67C027F';
export const KN_BONE_TOKEN_ADDRESS = '0x3358FCA51d7C0408750FBbE7777012E0b67C027F';
// TODO: Replace with actual marketplace contract address
export const MARKETPLACE_CONTRACT_ADDRESS = '0x3da63CBc86417686287d171ac1De543441B62956';

export { nftContractABI, marketplaceABI };

export const contractAddresses = {
    nftContract: "0xA2Ff92A739eCd3A450c9EAB992A96444A34cCd04",
    knBoneToken: "0x3358FCA51d7C0408750FBbE7777012E0b67C027F",
    marketplace: "0x3da63CBc86417686287d171ac1De543441B62956",
  };
  
  import { nftContractABI } from "./nftContractABI"; // ✅ Ensure ABI is imported
//export { nftContractABI }; // ✅ Export ABI so it can be used in Marketplace.tsx

import { marketplaceABI } from "./marketplaceABI"; // ✅ Ensure ABI is imported
//export { marketplaceABI }; // ✅ Export ABI so it can be used in Marketplace.tsx
