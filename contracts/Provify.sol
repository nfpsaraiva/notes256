// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Provify is ERC721URIStorage {
    struct Proof {
        string name;
        string description;
        address issuer;
        uint256 timestamp;
    }

    mapping(uint256 => Proof) public proofs;

    uint256 public proofCounter;

    event ProofCreated(
        uint256 indexed proofId,
        string name,
        string description,
        address indexed issuer
    );

    event NFTIssued(
        uint256 indexed proofId,
        address indexed recipient,
        uint256 tokenId
    );

    constructor() ERC721("Proof", "PRF") {}

    function createProof(
        string memory _name,
        string memory _description,
        string memory tokenURI
    ) external {
        proofCounter++;

        proofs[proofCounter] = Proof(
            _name,
            _description,
            msg.sender,
            block.timestamp
        );

        emit ProofCreated(proofCounter, _name, _description, msg.sender);

        // Mint an NFT as proof
        _safeMint(msg.sender, proofCounter);
        _setTokenURI(proofCounter, tokenURI);
        emit NFTIssued(proofCounter, msg.sender, proofCounter);
    }
}
