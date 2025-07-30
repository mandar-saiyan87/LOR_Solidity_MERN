// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract LOR {
    address public owner;
    address public approver;

    constructor() {
        owner = msg.sender;
        approver = msg.sender;
    }

    struct LORRequest {
        uint256 requestId;
        address requester;
        string name;
        string program;
        string university;
        address studentAddress;
        bool isApproved;
        address approver;
    }
}
