import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: 'localhost',
  paths: {
    artifacts: "../pumpkinFrontend/src/assets/artifacts"
  }
};

export default config;
