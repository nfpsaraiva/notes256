import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import { vars } from "hardhat/config";

const url = vars.has("SEPOLIA_URL") ? vars.get("SEPOLIA_URL") : "";
const accounts = vars.has("SEPOLIA_PRIVATE_KEY") ? [vars.get("SEPOLIA_PRIVATE_KEY")] : [];
const etherscanApiKey = vars.has("ETHERSCAN_API_KEY") ? vars.get("ETHERSCAN_API_KEY") : "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url,
      accounts
    }
  },
  etherscan: {
    apiKey: etherscanApiKey
  }
};

export default config;
