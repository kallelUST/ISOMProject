// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BOOKS is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // mapping(string => address[]) public availability;

    address public hkust;

    constructor() ERC721("BOOKS", "BK") {
        hkust = msg.sender;
    }

    function mintNewBook(
        address player,
        string memory tokenURI
    ) public returns (uint256) {
        require(player == hkust, "You are not a library account");
        uint256 newBookID = _tokenIds.current();
        _mint(player, newBookID);
        _setTokenURI(newBookID, tokenURI);
        _tokenIds.increment();
        
        return newBookID;
    }


}
