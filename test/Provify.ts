import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"

async function deployProvifyFixture() {
  const [owner] = await ethers.getSigners();

  const provifyContract = await ethers.deployContract('Provify', owner);

  await provifyContract.waitForDeployment();

  return { owner, provifyContract };
}

describe("Create Proof", () => {
  it("Should emit ProofCreated event", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture)

    const createProof = provifyContract.createProof('foo', 'bar');

    await expect(await createProof)
      .to.emit(provifyContract, "ProofCreated")
      .withArgs(1, 'foo', 'bar', owner.address);
  });

  it("Should emit NFTIssued event", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture);

    const createProof = provifyContract.createProof('foo', 'bar');

    await expect(await createProof)
      .to.emit(provifyContract, "NFTIssued")
      .withArgs(1, owner.address, 1);
  });

  it("Should create 2 proofs", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof('foo1', 'bar');

    const secondProof = provifyContract.createProof('foo2', 'bar');

    await expect(await secondProof)
      .to.emit(provifyContract, "ProofCreated")
      .withArgs(2, 'foo2', 'bar', owner.address)
  });
});