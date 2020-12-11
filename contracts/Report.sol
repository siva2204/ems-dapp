// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Reports {
    uint256 public totalReports;

    struct Report {
        string title;
        string report;
        string location;
        string fileHash;
        uint256 upVote;
        uint256 downVote;
    }

    Report[] public reports;

    constructor() public {
        totalReports = 0;
    }
}
