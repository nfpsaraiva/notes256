import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployProvifyFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const provifyContract = await ethers.deployContract('Provify', owner);

  await provifyContract.waitForDeployment();

  return { owner, otherAccount, provifyContract };
}

describe("Create Proof", () => {
  it("Should emit ProofCreated event when creating a proof", async () => {
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
});

describe("Delete Proof", () => {
  it("Should associate the zeroAddress to a deleted proof", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture);

    const signer = provifyContract.connect(owner);

    await signer.createProof('foo', 'bar', "https://gateway/foo");
    const latestBlock = await ethers.provider.getBlock('latest');
    if (!latestBlock) assert.fail('latestBlock expected to not be null');

    const proofId = ethers.solidityPackedKeccak256(
      ["string", "string", "address", "uint256"],
      ['foo', 'bar', owner.address, BigInt(latestBlock.timestamp)]
    );

    let proofOwner = await signer.owners(proofId);
    expect(proofOwner).to.be.equal(owner.address);

    const tokenId = await signer.tokensIds(proofId);
    await signer.deleteProof(tokenId);

    proofOwner = await signer.owners(proofId);
    expect(proofOwner).to.be.equal(ethers.ZeroAddress);
  })
});

describe("Transfer Proof", () => {
  it("Should transfer a proof", async () => {
    const { owner, otherAccount, provifyContract } = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof("foo", "bar", "https://foo/bar");

    const latestBlock = await ethers.provider.getBlock('latest');
    if (!latestBlock) assert.fail('latestBlock expected to not be null');

    const proofId = ethers.solidityPackedKeccak256(
      ["string", "string", "address", "uint256"],
      ['foo', 'bar', owner.address, BigInt(latestBlock.timestamp)]
    );

    const tokenId = await provifyContract.tokensIds(proofId);

    await provifyContract.transferProof(otherAccount.address, tokenId);

    const proofOwner = await provifyContract.owners(proofId);

    expect(proofOwner).to.be.equal(otherAccount.address);
  })
})