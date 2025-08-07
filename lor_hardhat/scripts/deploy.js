const { ethers } = require("hardhat")
require("dotenv").config()

async function main() {
    const LOR = await ethers.getContractFactory("LOR")
    const lor = await LOR.deploy()
    await lor.waitForDeployment()
    console.log(`LOR deployed to ${lor.target}`)
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
})