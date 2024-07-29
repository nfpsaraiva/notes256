import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployNotes256Fixture() {
  const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

  const provifyContract = await ethers.deployContract('Notes256', owner);

  await provifyContract.waitForDeployment();

  return { owner, otherAccount, otherAccount2, provifyContract };
}

describe("Create Note", () => {
  it("Should get a note by token ID", async () => {
    const { provifyContract } = await loadFixture(deployNotes256Fixture)

    await provifyContract.createNote('foo', "bar", "https://gateway/foo");

    const note = await provifyContract.notes(1);

    expect(note[1]).to.be.equal("foo");
    expect(note[2]).to.be.equal("bar");
  })

  it("Should set a tokenURI when creating a note", async () => {
    const {provifyContract} = await loadFixture(deployNotes256Fixture);

    await provifyContract.createNote('foo', "bar", "https://gateway/foo");

    const tokenURI = await provifyContract.tokenURI(1);

    expect(tokenURI).to.be.equal("https://gateway/foo");
  });

  it("Should create a note with content from a burned note", async () => {
    const {provifyContract} = await loadFixture(deployNotes256Fixture);

    await provifyContract.createNote('foo', "bar", "https://gateway/foo");

    await provifyContract.burn(1);

    await provifyContract.createNote('foo', "bar", "https://gateway/foo");
    const duplicatedNote = await provifyContract.notes(2);

    expect(duplicatedNote[1]).to.be.equal("foo");
    expect(duplicatedNote[2]).to.be.equal("bar");
  })
});

describe("Verify Note", () => {
  it("Should confirm that a note belogns to its owner", async () => {
    const {otherAccount, provifyContract} = await loadFixture(deployNotes256Fixture);

    const signer = provifyContract.connect(otherAccount);

    await signer.createNote("foo", "bar", "https://gateway/foo");

    expect(await provifyContract.ownerOf(1)).to.be.equal(otherAccount.address)
  });
});

describe("Delete Note", () => {
  it("Should fail when tryin to retreive an owner of a burned note", async () => {
    const { owner, provifyContract } = await loadFixture(deployNotes256Fixture);

    const signer = provifyContract.connect(owner);

    await signer.createNote('foo', 'bar', "https://gateway/foo");

    await signer.deleteNote(1);

    await expect(provifyContract.ownerOf(1)).to.be.reverted;
  });

  it("Should faild when trying to delete a not owned note", async () => {
    const { owner, otherAccount, provifyContract } = await loadFixture(deployNotes256Fixture);

    await provifyContract.createNote('foo', 'bar', "https://gateway/foo");

    const signer = provifyContract.connect(otherAccount);

    await expect(signer.deleteNote(1)).to.be.reverted;
  })

  it("Should emit event when deleting a note", async () => {
    const { provifyContract } = await loadFixture(deployNotes256Fixture)

    await provifyContract.createNote('foo', "bar", "https://gateway/foo");

    const noteDeleted = await provifyContract.deleteNote(1)

    expect(noteDeleted)
      .to.emit(provifyContract, "NoteDeleted")
      .withArgs(1);
  })
});

describe("Transfer Note", () => {
  it("Should transfer a note", async () => {
    const { otherAccount, provifyContract } = await loadFixture(deployNotes256Fixture);

    await provifyContract.createNote("foo", "bar", "https://foo/bar");

    await provifyContract.transferNote(otherAccount.address, 1);

    expect(await provifyContract.ownerOf(1)).to.be.equal(otherAccount.address);
  });

  it("Should failed when transfering a not owned note", async () => {
    const { otherAccount, otherAccount2, provifyContract } = await loadFixture(deployNotes256Fixture);
    
    await provifyContract.createNote("foo", "bar", "https://foo/bar");

    const signer = provifyContract.connect(otherAccount);

    await expect(signer.transferNote(otherAccount2, 1)).to.be.reverted;
  })

  it("Should emit event when transfering a note", async () => {
    const { owner, otherAccount, provifyContract } = await loadFixture(deployNotes256Fixture)

    await provifyContract.createNote('foo', "bar", "https://gateway/foo");

    const noteTransfered = await provifyContract.transferNote(otherAccount.address, 1);

    expect(noteTransfered)
      .to.emit(provifyContract, "NoteTransfered")
      .withArgs(1, owner.address, otherAccount.address);
  });
})