// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Provify is ERC721, ERC721URIStorage, ERC721Burnable {
    // Single proof structure
    struct Proof {
        bytes32 id;
        string title;
        string content;
        address author;
        uint256 timestamp;
    }

    // List of proofs
    mapping(uint256 => Proof) public proofs;
    mapping(bytes32 => uint256) public proofsIdsByContentHash;

    // Proofs counter used to generate new NFT token IDs
    uint256 public lastTokenId;

    // Event for each proof created
    event ProofCreated(
        uint256 indexed tokenId,
        string name,
        string content,
        address indexed issuer
    );

    event ProofDeleted(
        uint256 indexed tokenId
    );

    event ProofTransfered(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );

    /**
     * Nothing to do here
     */
    constructor() ERC721("Proof", "PRF") {}

    /**
     * Create a single proof
     *
     * @param _name name of the proof
     * @param _content description of the proof
     * @param _tokenURI URI for the NFT token
     */
    function createProof(
        string memory _name,
        string memory _content,
        string memory _tokenURI
    ) external {
        // Generates an unique ID for the new proof
        bytes32 proofId = keccak256(abi.encodePacked(_content));

        // Prevent duplicates
        require(proofsIdsByContentHash[proofId] == 0, "Proof already exists");

        // Increment token ID
        lastTokenId++;

        // add the new proof to the list
        proofs[lastTokenId] = Proof(
            proofId,
            _name,
            _content,
            msg.sender,
            block.timestamp
        );
        proofsIdsByContentHash[proofId] = lastTokenId;

        // Mint an NFT as proof
        _safeMint(msg.sender, lastTokenId);
        _setTokenURI(lastTokenId, _tokenURI);

        emit ProofCreated(lastTokenId, _name, _content, msg.sender);
    }

    /**
     * Burn the proof and removes the owner from the corresponding proofID
     *
     * @param _tokenId proof NFT token ID
     */
    function deleteProof(uint256 _tokenId) external {
        burn(_tokenId);

        emit ProofDeleted(_tokenId);
    }

    /**
     * Transfers a proof to another owner
     *
     * @param to the address to where the proof is being sent
     * @param _tokenId proof NFT token ID
     */
    function transferProof(address to, uint256 _tokenId) external {
        safeTransferFrom(msg.sender, to, _tokenId);

        emit ProofTransfered(_tokenId, msg.sender, to);
    }

    /**
     * Overrides required by solidity
     * @param tokenId NFT token ID
     */
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * Overrides required by solidity
     * @param interfaceId interface ID
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
