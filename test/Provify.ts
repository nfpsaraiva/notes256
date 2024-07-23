import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployProvifyFixture() {
  const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

  const provifyContract = await ethers.deployContract('Provify', owner);

  await provifyContract.waitForDeployment();

  return { owner, otherAccount, otherAccount2, provifyContract };
}

describe("Create Proof", () => {
  it("Should get a proof by token ID", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture)

    await provifyContract.createProof('foo', "bar", "https://gateway/foo");

    const proof = await provifyContract.proofs(1);

    const proofId = ethers.solidityPackedKeccak256(["string"], ["bar"]);

    expect(proof[0]).to.be.equal(proofId);
    expect(proof[1]).to.be.equal("foo");
    expect(proof[2]).to.be.equal("bar");
  })

  it("Should set a tokenURI when creating a proof", async () => {
    const {provifyContract} = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof('foo', "bar", "https://gateway/foo");

    const tokenURI = await provifyContract.tokenURI(1);

    expect(tokenURI).to.be.equal("https://gateway/foo");
  });

  it("Should failed when creating a duplicated proof", async () => {
    const {provifyContract} = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof('foo', "bar", "https://gateway/foo");
    const duplicatedProof = provifyContract.createProof('foo', "bar", "https://gateway/foo");

    await expect(duplicatedProof).to.be.reverted;
  })
});

describe("Verify Proof", () => {
  it("Should confirm that a proof belogns to its owner", async () => {
    const {otherAccount, provifyContract} = await loadFixture(deployProvifyFixture);

    const signer = provifyContract.connect(otherAccount);

    await signer.createProof("foo", "bar", "https://gateway/foo");

    expect(await provifyContract.ownerOf(1)).to.be.equal(otherAccount.address)
  });
});

describe("Delete Proof", () => {
  it("Should fail when tryin to retreive an owner of a burned proof", async () => {
    const { owner, provifyContract } = await loadFixture(deployProvifyFixture);

    const signer = provifyContract.connect(owner);

    await signer.createProof('foo', 'bar', "https://gateway/foo");

    await signer.deleteProof(1);

    await expect(provifyContract.ownerOf(1)).to.be.reverted;
  });

  it("Should faild when trying to delete a not owned proof", async () => {
    const { owner, otherAccount, provifyContract } = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof('foo', 'bar', "https://gateway/foo");

    const signer = provifyContract.connect(otherAccount);

    await expect(signer.deleteProof(1)).to.be.reverted;
  })

  it("Should emit event when deleting a proof", async () => {
    const { provifyContract } = await loadFixture(deployProvifyFixture)

    await provifyContract.createProof('foo', "bar", "https://gateway/foo");

    const proofDeleted = await provifyContract.deleteProof(1)

    expect(proofDeleted)
      .to.emit(provifyContract, "ProofDeleted")
      .withArgs(1);
  })
});

describe("Transfer Proof", () => {
  it("Should transfer a proof", async () => {
    const { otherAccount, provifyContract } = await loadFixture(deployProvifyFixture);

    await provifyContract.createProof("foo", "bar", "https://foo/bar");

    await provifyContract.transferProof(otherAccount.address, 1);

    expect(await provifyContract.ownerOf(1)).to.be.equal(otherAccount.address);
  });

  it("Should failed when transfering a not owned proof", async () => {
    const { otherAccount, otherAccount2, provifyContract } = await loadFixture(deployProvifyFixture);
    
    await provifyContract.createProof("foo", "bar", "https://foo/bar");

    const signer = provifyContract.connect(otherAccount);

    await expect(signer.transferProof(otherAccount2, 1)).to.be.reverted;
  })

  it("Should emit event when transfering a proof", async () => {
    const { owner, otherAccount, provifyContract } = await loadFixture(deployProvifyFixture)

    await provifyContract.createProof('foo', "bar", "https://gateway/foo");

    const proofTransfered = await provifyContract.transferProof(otherAccount.address, 1);

    expect(proofTransfered)
      .to.emit(provifyContract, "ProofTransfered")
      .withArgs(1, owner.address, otherAccount.address);
  });
})