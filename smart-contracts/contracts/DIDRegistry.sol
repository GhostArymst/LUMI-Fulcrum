// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DIDRegistry {
    mapping(address => string) private dids;
    mapping(string => address) private didToAddress;

    event DIDRegistered(address indexed owner, string did);
    event DIDUpdated(address indexed owner, string did);

    modifier onlyNotRegistered(address owner) {
        require(bytes(dids[owner]).length == 0, "DID already registered");
        _;
    }

    modifier onlyRegistered(address owner) {
        require(bytes(dids[owner]).length > 0, "DID not found");
        _;
    }

    function registerDID(string memory did) public onlyNotRegistered(msg.sender) {
        require(bytes(did).length > 0, "DID cannot be empty");
        require(didToAddress[did] == address(0), "DID already taken");

        dids[msg.sender] = did;
        didToAddress[did] = msg.sender;

        emit DIDRegistered(msg.sender, did);
    }

    function getDID(address owner) public view returns (string memory) {
        return dids[owner];
    }

    function getAddress(string memory did) public view returns (address) {
        return didToAddress[did];
    }
} 