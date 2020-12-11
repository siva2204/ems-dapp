// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Reports {
    uint256 public totalReports;

    struct Report {
        uint256 id;
        string title;
        string report;
        string location;
        string fileHash;
        uint256 upVote;
        uint256 downVote;
    }

    mapping(uint256 => Report) public reports;

    constructor() public {
        totalReports = 0;
    }
}
