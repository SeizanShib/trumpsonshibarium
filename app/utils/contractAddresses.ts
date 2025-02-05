//import { nftContractABI } from './nftContractABI';
//import { marketplaceABI } from './marketplaceABI';

// Contract addresses on Shibarium Puppynet (Chain ID: 157)
export const NFT_CONTRACT_ADDRESS = '0xc2aAFb0B92b5B5660C303EcCf4772091Fc8fF548';
export const KNBONE_CONTRACT_ADDRESS = '0xC7e29EA23E3dAb1E1bc891674dCF631cb8569f00';
export const KN_BONE_TOKEN_ADDRESS = '0xC7e29EA23E3dAb1E1bc891674dCF631cb8569f00';
// TODO: Replace with actual marketplace contract address
export const MARKETPLACE_CONTRACT_ADDRESS = '0x354a2f61D196998F518b665e52b266bBA8F927aA';

export { nftContractABI, marketplaceABI };

export const contractAddresses = {
    nftContract: "0xc2aAFb0B92b5B5660C303EcCf4772091Fc8fF548",
    knBoneToken: "0xC7e29EA23E3dAb1E1bc891674dCF631cb8569f00",
    marketplace: "0x354a2f61D196998F518b665e52b266bBA8F927aA",
  };
  
  import { nftContractABI } from "./nftContractABI"; // ✅ Ensure ABI is imported
//export { nftContractABI }; // ✅ Export ABI so it can be used in Marketplace.tsx

import { marketplaceABI } from "./marketplaceABI"; // ✅ Ensure ABI is imported
//export { marketplaceABI }; // ✅ Export ABI so it can be used in Marketplace.tsx
