// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Provify is ERC721, ERC721URIStorage, ERC721Burnable {
    
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
    
    // Double mapping for searching by proofID and token ID
    mapping(uint256 => bytes32) public proofsIds;
    mapping(bytes32 => uint256) public tokensIds;

    // Mapping to track who has a given proof
    mapping(bytes32 => address) public owners;

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

        owners[proofId] = msg.sender;

        emit ProofCreated(proofId, _name, _description, msg.sender);
    }

    /**
     * Burn the proof and removes the owner from the corresponding proofID
     * 
     * @param _tokenId proof NFT token ID
     */
    function deleteProof(uint256 _tokenId) external {
        bytes32 proof = proofsIds[_tokenId];

        require(owners[proof] == msg.sender, "Not the proof owner");

        burn(_tokenId);

        owners[proof] = address(0);
    }

    /**
     * Transfers a proof to another owner
     * 
     * @param to the address to where the proof is being sent
     * @param _tokenId proof NFT token ID
     */
    function transferProof(address to, uint256 _tokenId) external {
        bytes32 proof = proofsIds[_tokenId];

        require(owners[proof] == msg.sender, "Not the proof owner");

        safeTransferFrom(msg.sender, to, _tokenId);

        owners[proof] = to;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
