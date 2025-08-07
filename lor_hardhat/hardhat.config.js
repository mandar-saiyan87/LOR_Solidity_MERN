require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.ACCOUNT_1],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.SEPOLIA_API_KEY
    }
  }
};
