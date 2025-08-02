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

    mapping(uint256 => LORRequest) public lorRequests;

    event LORRequested(uint256 requestId, address indexed student);
    event LORApproved(
        uint256 requestId,
        address indexed approver,
        address indexed student
    );
    event StudentRequest(uint256 requestId, address indexed student);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyApprover() {
        require(
            msg.sender == approver,
            "Only approver can perform this action"
        );
        _;
    }

    // For Student to create LOR request
    function createLORRequest(
        uint256 _requestId,
        address _studentAddress,
        string memory _name,
        string memory _program,
        string memory _university
    ) external {
        require(_requestId > 0, "nvalid Id");
        require(
            lorRequests[_requestId].studentAddress == address(0),
            "Request already exists"
        );

        lorRequests[_requestId] = LORRequest({
            requestId: _requestId,
            requester: msg.sender,
            name: _name,
            program: _program,
            university: _university,
            studentAddress: _studentAddress,
            isApproved: false,
            approver: address(0)
        });
        emit LORRequested(_requestId, _studentAddress);
        emit StudentRequest(_requestId, _studentAddress);
    }

    function approveLORRequest(uint256 _requestId) external onlyApprover {
        require(
            lorRequests[_requestId].isApproved == false,
            "Already approved"
        );
        lorRequests[_requestId].isApproved = true;
        lorRequests[_requestId].approver = msg.sender;
        emit LORApproved(
            _requestId,
            msg.sender,
            lorRequests[_requestId].studentAddress
        );
    }

    function updateApprover(address _newApprover) external onlyOwner {
        require(msg.sender == owner, "Only owner can can update the approver");
        approver = _newApprover;
    }

    function getLORRequest(
        uint256 _requestId
    ) external view returns (LORRequest memory) {
        return lorRequests[_requestId];
    }
}
