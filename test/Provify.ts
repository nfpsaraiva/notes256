import {expect} from "chai";
import {ethers} from "hardhat";


describe("Provify Contract", () => {
  it("Should work", async () => {
    const [owner] = await ethers.getSigners();

    const provify = await ethers.deployContract("Provify");

    const balance = await provify.balanceOf(owner.address);

    

  })
})