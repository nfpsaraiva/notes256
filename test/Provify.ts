import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture} from "@nomicfoundation/hardhat-network-helpers"

async function deployProvifyFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const provifyContract = await ethers.deployContract('Provify', owner);

  await provifyContract.waitForDeployment();

  return { owner, otherAccount, provifyContract };
}

describe("Create Proof", () => {
  it("Should emit ProofCreated event", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture)

    const createProof = provifyContract.createProof('foo', 'bar', "https://gateway/foo");

    await expect(await createProof)
      .to.emit(provifyContract, "ProofCreated")
      .withArgs(1, 'foo', 'bar', owner.address);
  });

  it("Should create 2 proofs", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof('foo1', 'bar', "https://gateway/foo");

    const secondProof = provifyContract.createProof('foo2', 'bar', "https://gateway/foo");

    await expect(await secondProof)
      .to.emit(provifyContract, "ProofCreated")
      .withArgs(2, 'foo2', 'bar', owner.address)
  });

  it("Should get 1 proof", async () => {
    const { otherAccount, provifyContract } = await loadFixture(deployProvifyFixture);

    const otherAccountProvify = provifyContract.connect(otherAccount);

    await otherAccountProvify.createProof('foo', 'bar', "https://gateway/foo");
    
    const proofId = await otherAccountProvify.tokenIdToProofId(1);

    const proof = await otherAccountProvify.proofs(proofId);

    expect(proof[0]).to.be.equals('foo');
    expect(proof[1]).to.be.equals('bar');
    expect(proof[2]).to.be.equals(otherAccount.address);
  });
});