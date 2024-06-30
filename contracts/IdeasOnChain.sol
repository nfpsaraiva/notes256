// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract IdeasOnChain is ERC721 {
    struct Idea {
        string title;
        string description;
        address issuer;
        uint256 timestamp;
    }

    mapping(uint256 => Idea) public ideas;

    uint256 public ideaCounter;

    event IdeaCreated(
        uint256 indexed ideaId,
        string name,
        string description,
        address indexed issuer
    );

    event NFTIssued(
        uint256 indexed ideaId,
        address indexed recipient,
        uint256 tokenId
    );

    constructor() ERC721("Idea", "IDE") {}

    function publishIdea(
        string memory _title,
        string memory _description
    ) external {
        ideaCounter++;

        ideas[ideaCounter] = Idea(
            _title,
            _description,
            msg.sender,
            block.timestamp
        );

        emit IdeaCreated(ideaCounter, _title, _description, msg.sender);

        // Mint an NFT as proof
        _mint(msg.sender, ideaCounter);
        emit NFTIssued(ideaCounter, msg.sender, ideaCounter);
    }
}
