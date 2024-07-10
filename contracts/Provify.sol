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

    uint256 public tokenIdCounter;

    event ProofCreated(
        uint256 indexed proofId,
        string name,
        string description,
        address indexed issuer
    );

    constructor() ERC721("Proof", "PRF") {}

    function createProof(
        string memory _name,
        string memory _description,
        string memory _tokenURI
    ) external {
        tokenIdCounter++;

        proofs[tokenIdCounter] = Proof(
            _name,
            _description,
            msg.sender,
            block.timestamp
        );

        _safeMint(msg.sender, tokenIdCounter);
        _setTokenURI(tokenIdCounter, _tokenURI);

        emit ProofCreated(tokenIdCounter, _name, _description, msg.sender);
    }
}
