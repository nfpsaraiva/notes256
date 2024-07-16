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

    mapping(bytes32 => Proof) public proofs;
    mapping(uint256 => bytes32) public tokenIdToProofId;
    mapping(bytes32 => uint256) public proofIdToTokenId;

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

        bytes32 proofId = keccak256(
            abi.encodePacked(_name, _description, msg.sender, block.timestamp)
        );
        require(proofs[proofId].timestamp == 0, "Proof already exists");

        proofs[proofId] = Proof(
            _name,
            _description,
            msg.sender,
            block.timestamp
        );

        emit ProofCreated(tokenIdCounter, _name, _description, msg.sender);

        // Mint an NFT as proof
        uint256 newTokenId = tokenIdCounter;
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        tokenIdToProofId[newTokenId] = proofId;
        proofIdToTokenId[proofId] = newTokenId;
    }
}
