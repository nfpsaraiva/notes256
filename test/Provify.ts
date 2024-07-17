import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture, time} from "@nomicfoundation/hardhat-network-helpers"

async function deployProvifyFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const provifyContract = await ethers.deployContract('Provify', owner);

  await provifyContract.waitForDeployment();

  return { owner, otherAccount, provifyContract };
}

describe("Create Proof", () => {
  it("Should emit ProofCreated event", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture)

    const createProof = await provifyContract.createProof('foo', 'bar', "https://gateway/foo");
    const latestBlock = await ethers.provider.getBlock('latest');

    if (!latestBlock) assert.fail('latestBlock expected to not be null');

    const proofId = ethers.solidityPackedKeccak256(
      ["string", "string", "address", "uint256"], 
      ['foo', 'bar', owner.address, BigInt(latestBlock.timestamp)]
    ); 

    await expect(createProof)
      .to.emit(provifyContract, "ProofCreated")
      .withArgs(proofId, 'foo', 'bar', owner.address);
  });

  it("Should create 2 proofs", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof('foo1', 'bar', "https://gateway/foo");

    const secondProof = await provifyContract.createProof('foo2', 'bar', "https://gateway/foo");
    const latestBlock = await ethers.provider.getBlock('latest');

    if (!latestBlock) assert.fail('latestBlock expected to not be null');

    const proofId = ethers.solidityPackedKeccak256(
      ["string", "string", "address", "uint256"], 
      ['foo2', 'bar', owner.address, BigInt(latestBlock.timestamp)]
    ); 

    await expect(secondProof)
      .to.emit(provifyContract, "ProofCreated")
      .withArgs(proofId, 'foo2', 'bar', owner.address)
  });

  it("Should get 1 proof", async () => {
    const { otherAccount, provifyContract } = await loadFixture(deployProvifyFixture);

    const otherAccountProvify = provifyContract.connect(otherAccount);

    await otherAccountProvify.createProof('foo', 'bar', "https://gateway/foo");
    
    const proofId = await otherAccountProvify.proofsIds(1);

    const proof = await otherAccountProvify.proofs(proofId);

    expect(proof[0]).to.be.equals('foo');
    expect(proof[1]).to.be.equals('bar');
    expect(proof[2]).to.be.equals(otherAccount.address);
  });
});