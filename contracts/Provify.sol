// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Provify is ERC721, Ownable {

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

    constructor() ERC721("Proof", "PRF") Ownable(msg.sender) {}

    function createProof(string memory _name, string memory _description) external {
        proofCounter++;

        proofs[proofCounter] = Proof(
            _name,
            _description,
            msg.sender,
            block.timestamp
        );

        emit ProofCreated(proofCounter, _name, _description, msg.sender);

        // Mint an NFT as proof
        _mint(msg.sender, proofCounter);
        emit NFTIssued(proofCounter, msg.sender, proofCounter);
    }

    /**
     * @dev Get proof details by proof ID.
     * @param _proofId ID of the proof
     */
    function getProofDetails(uint256 _proofId) external view returns (Proof memory) {
        require(_proofId <= proofCounter && _proofId > 0, "Proof does not exist");

        return proofs[_proofId];
    }
}
