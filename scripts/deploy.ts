import { ethers } from "hardhat";
require("dotenv").config();

async function main() {
  const mazdaDNFT = await ethers.deployContract("MazdaDNFT", [process.env.PUBLIC_KEY as string]); 
  const contract = await mazdaDNFT.waitForDeployment();
  console.log(`MazdaDNFT deployed to ${mazdaDNFT.target} with address ${await contract.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
