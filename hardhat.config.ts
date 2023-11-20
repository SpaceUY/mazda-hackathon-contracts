import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: 'shibuya',
  networks: {
    shibuya: {
      url: 'https://evm.shibuya.astar.network',
      chainId: 81,
      accounts: [process.env.PRIVATE_KEY as string]
    },
  }
};

export default config;
