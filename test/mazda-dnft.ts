import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const VIN = "JC24821E1X1001234"
const tokenURI = "ipfs://1234";

describe("Mazda dNFT", function () {
  async function mazdaFixture() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    const MazdaDNFT = await ethers.getContractFactory('MazdaDNFT');
    const mazdaDNFT = await MazdaDNFT.deploy(owner);

    const contractExec = await mazdaDNFT.registerNewVehicle(otherAccount, VIN, tokenURI, { from: owner });
    await contractExec.wait();

    return {mazdaDNFT, owner, otherAccount, otherAccount2};
  }

  describe("Deployment", function () {
    it("Should deploy without errors", async function() {
      const { mazdaDNFT, owner } = await loadFixture(mazdaFixture);

      expect(await mazdaDNFT.symbol()).to.equal('MZDA');
      expect(await mazdaDNFT.owner()).to.equal(owner.address);
    });
  });

  describe("registerNewVehicle", function () {
    it("Should mint a new NFT with provided uri", async function() {
      const { mazdaDNFT, otherAccount } = await loadFixture(mazdaFixture);

      expect(await mazdaDNFT.ownerOf(0)).to.equal(otherAccount.address);
      expect(await mazdaDNFT.tokenURI(0)).to.equal(tokenURI);
    });
  });

  describe("transferOwnership", function () {
    it("Should transfer ownership via VIN", async function() {
      const { mazdaDNFT, owner, otherAccount2 } = await loadFixture(mazdaFixture);
      
      const contractExec = await mazdaDNFT.transferVehicleOwnership(otherAccount2, VIN, { from: owner });
      await contractExec.wait();

      expect(await mazdaDNFT.ownerOf(0)).to.equal(otherAccount2.address);
    });
  });

  describe("updateTokenURI", function () {
    it("Should update tokenURI via VIN", async function() {
      const { mazdaDNFT, owner } = await loadFixture(mazdaFixture);

      const newTokenURI = "ipfs://5678";
      const contractExec = await mazdaDNFT.updateTokenURI(VIN, newTokenURI, { from: owner });
      await contractExec.wait();

      expect(await mazdaDNFT.tokenURI(0)).to.equal(newTokenURI);
    });
  });
});