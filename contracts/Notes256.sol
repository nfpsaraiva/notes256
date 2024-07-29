// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "hardhat/console.sol";

contract Notes256 is ERC721, ERC721URIStorage, ERC721Burnable {
    // Single note structure
    struct Note {
        bytes32 id;
        string title;
        string content;
        uint256 timestamp;
    }

    // List of notes
    mapping(uint256 => Note) public notes;
    mapping(bytes32 => uint256) public notesIds;

    // Notes counter used to generate new NFT token IDs
    uint256 public lastTokenId;

    // Event for each proof created
    event NoteCreated(
        uint256 indexed tokenId,
        string name,
        string content
    );

    event NoteDeleted(
        uint256 indexed tokenId
    );

    event NoteTransfered(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );

    /**
     * Nothing to do here
     */
    constructor() ERC721("Notes256", "NTS") {}

    /**
     * Create a single note
     *
     * @param _name name of the note
     * @param _content description of the note
     * @param _tokenURI URI for the NFT token
     */
    function createNote(
        string memory _name,
        string memory _content,
        string memory _tokenURI
    ) external {
        // Generates an unique ID for the new note
        bytes32 contentHashed = keccak256(abi.encodePacked(_content, block.timestamp));

        // Prevent duplicates
        uint256 noteId = notesIds[contentHashed];
        require(noteId == 0 || _ownerOf(noteId) == address(0), "Note already exists");

        // Increment token ID
        lastTokenId++;

        // add the new note to the list
        notes[lastTokenId] = Note(
            contentHashed,
            _name,
            _content,
            block.timestamp
        );
        notesIds[contentHashed] = lastTokenId;

        // Mint an NFT as note
        _safeMint(msg.sender, lastTokenId);
        _setTokenURI(lastTokenId, _tokenURI);

        emit NoteCreated(lastTokenId, _name, _content);
    }

    /**
     * Burn the note and removes the owner from the corresponding noteId
     *
     * @param _tokenId note NFT token ID
     */
    function deleteNote(uint256 _tokenId) external {
        burn(_tokenId);

        emit NoteDeleted(_tokenId);
    }

    /**
     * Transfers a note to another owner
     *
     * @param to the address to where the note is being sent
     * @param _tokenId note NFT token ID
     */
    function transferNote(address to, uint256 _tokenId) external {
        safeTransferFrom(msg.sender, to, _tokenId);

        emit NoteTransfered(_tokenId, msg.sender, to);
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
