// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Provify is ERC721URIStorage {
    
    // Single proof structure
    struct Proof {
        string name;
        string description;
        address issuer;
        uint256 timestamp;
    }

    // List of proofs
    mapping(bytes32 => Proof) public proofs;
    
    // Proofs counter used to generate new NFT token IDs
    uint256 public proofsCount;
    
    // Double mapping for searching by proofID and NFT token ID
    mapping(uint256 => bytes32) public proofsIds;
    mapping(bytes32 => uint256) public tokensIds;

    // Event for each proof created
    event ProofCreated(
        bytes32 indexed proofId,
        string name,
        string description,
        address indexed issuer
    );

    /**
     * Nothing to do here
     */
    constructor() ERC721("Proof", "PRF") {}

    /**
     * Create a single proof
     * 
     * @param _name name of the proof
     * @param _description description of the proof
     * @param _tokenURI URI for the NFT token 
     */
    function createProof(
        string memory _name,
        string memory _description,
        string memory _tokenURI
    ) external {
        // Generates an unique ID for the new proof
        bytes32 proofId = keccak256(
            abi.encodePacked(_name, _description, msg.sender, block.timestamp)
        );

        // Prevent duplicates
        require(proofs[proofId].timestamp == 0, "Proof already exists");

        // add the new proof to the list
        proofs[proofId] = Proof(
            _name,
            _description,
            msg.sender,
            block.timestamp
        );

        // Generate a new NFT token ID
        uint256 newTokenId = ++proofsCount;

        // Mint an NFT as proof
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        
        // Add proof and token IDS to the lists
        proofsIds[newTokenId] = proofId;
        tokensIds[proofId] = newTokenId;

        emit ProofCreated(proofId, _name, _description, msg.sender);
    }
}
