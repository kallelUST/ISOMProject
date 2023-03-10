import { expect } from "chai";
import { ethers } from "hardhat";

describe("Given BOOKS", function () {
  it("Should it able to mint a new book", async function () {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("BOOKS");
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    // let lib = await myToken.hkust();

    let tx = await myToken.mintNewBook(owner.address, "https://www.google.com");
    await tx.wait();

    let tokenOwner = await myToken.ownerOf(0);
    expect(tokenOwner).to.equal(owner.address);

    let tokenURI = await myToken.tokenURI(0);
    expect(tokenURI).to.equal("https://www.google.com");
  });

  it("not able to mint", async function () {
    const [library, otherAccount, ...users] = await ethers.getSigners();
    const myContract = await ethers.getContractFactory("BOOKS");
    const myContractDeployed = await myContract.deploy();
    await myContractDeployed.deployed();

    await expect(
      myContractDeployed.mintNewBook(
        otherAccount.address,
        "https://www.google.com/hk"
      )
    ).to.be.revertedWith("You are not a library account");
  });
});
