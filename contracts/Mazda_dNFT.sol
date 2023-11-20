// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MazdaDNFT is ERC721URIStorage, Ownable {
  uint256 private _nextTokenId = 0;
  mapping(string vin => uint256) private _vinToTokenId;

  constructor(address initialOwner) ERC721("MazdaDNFT", "MZDA") Ownable(initialOwner) {}

  function registerNewVehicle(address vehicleOwner, string memory vin, string memory tokenURI) 
    public
    onlyOwner
    returns (uint256) 
  {
    uint256 tokenId = _nextTokenId++;
    _vinToTokenId[vin] = tokenId;
    _safeMint(vehicleOwner, tokenId);
    _setTokenURI(tokenId, tokenURI);
    return tokenId;
  }

  function transferVehicleOwnership(address newOwner, string memory vin)
    public
    onlyOwner
    returns (uint256)
  {
    uint256 tokenId = _vinToTokenId[vin];
    address from = _ownerOf(tokenId);
    _safeTransfer(from, newOwner, tokenId);
    return tokenId;
  }

  function updateTokenURI(string memory vin, string memory tokenURI)
    public
    onlyOwner
    returns (uint256) 
  {
    uint256 tokenId = _vinToTokenId[vin];
    _setTokenURI(tokenId, tokenURI);
    return tokenId;
  }
}