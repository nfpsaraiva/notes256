// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Provify is ERC721, Ownable {
    struct Proof {
        string ipfsHash; // IPFS hash of the proof file
        string proofType; // Type of proof (e.g., certificate, document)
        string description; // Description of the proof
        address issuer; // Address of the issuer
        uint256 timestamp; // Timestamp of when the proof was created
    }

    mapping(uint256 => Proof) public proofs;
    uint256 public proofCounter;

    event ProofCreated(
        uint256 indexed proofId,
        address indexed issuer,
        string ipfsHash,
        string proofType,
        string description
    );
    event NFTIssued(
        uint256 indexed proofId,
        address indexed recipient,
        uint256 tokenId
    );

    constructor() ERC721("Proof", "PRF") Ownable(msg.sender) {}

    /**
     * @dev Create a new proof with the provided metadata.
     * @param _ipfsHash IPFS hash of the proof file
     * @param _proofType Type of proof (e.g., certificate, document)
     * @param _description Description of the proof
     */
    function createProof(
        string memory _ipfsHash,
        string memory _proofType,
        string memory _description
    ) external {
        proofCounter++;
        proofs[proofCounter] = Proof(
            _ipfsHash,
            _proofType,
            _description,
            msg.sender,
            block.timestamp
        );
        emit ProofCreated(
            proofCounter,
            msg.sender,
            _ipfsHash,
            _proofType,
            _description
        );

        // Mint an NFT as proof
        _mint(msg.sender, proofCounter);
        emit NFTIssued(proofCounter, msg.sender, proofCounter);
    }

    /**
     * @dev Get proof details by proof ID.
     * @param _proofId ID of the proof
     */
    function getProofDetails(
        uint256 _proofId
    ) external view returns (Proof memory) {
        require(
            _proofId <= proofCounter && _proofId > 0,
            "Proof does not exist"
        );
        return proofs[_proofId];
    }
}
