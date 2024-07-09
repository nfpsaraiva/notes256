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

    constructor() ERC721("Proof", "PRF") {
        // tokenIdCounter = 1;
    }

    function createProof(
        string memory _name,
        string memory _description,
        string memory _tokenURI
    ) external {
        // bytes32 proofId = keccak256(
        //     abi.encodePacked(_name, _description, msg.sender, block.timestamp)
        // );

        // require(proofs[proofId].timestamp == 0, "Proof already exists");

        proofs[tokenIdCounter] = Proof(
            _name,
            _description,
            msg.sender,
            block.timestamp
        );

        uint256 tokenId = tokenIdCounter;

        tokenIdCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        emit ProofCreated(tokenId, _name, _description, msg.sender);
    }
}
