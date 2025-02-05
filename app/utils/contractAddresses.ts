//import { nftContractABI } from './nftContractABI';
//import { marketplaceABI } from './marketplaceABI';

// Contract addresses on Shibarium Puppynet (Chain ID: 157)
export const NFT_CONTRACT_ADDRESS = '0x89bAE31C6C3EA4Cb149A6E9BC62d3e55036B459A';
export const KNBONE_CONTRACT_ADDRESS = '0x3358FCA51d7C0408750FBbE7777012E0b67C027F';
export const KN_BONE_TOKEN_ADDRESS = '0x3358FCA51d7C0408750FBbE7777012E0b67C027F';
// TODO: Replace with actual marketplace contract address
export const MARKETPLACE_CONTRACT_ADDRESS = '0x0f4CdBa388880913d38c94be7d274da128b06585';

export { nftContractABI, marketplaceABI };

export const contractAddresses = {
    nftContract: "0x89bAE31C6C3EA4Cb149A6E9BC62d3e55036B459A",
    knBoneToken: "0x3358FCA51d7C0408750FBbE7777012E0b67C027F",
    marketplace: "0x0f4CdBa388880913d38c94be7d274da128b06585",
  };
  
  import { nftContractABI } from "./nftContractABI"; // ✅ Ensure ABI is imported
//export { nftContractABI }; // ✅ Export ABI so it can be used in Marketplace.tsx

import { marketplaceABI } from "./marketplaceABI"; // ✅ Ensure ABI is imported
//export { marketplaceABI }; // ✅ Export ABI so it can be used in Marketplace.tsx
