// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

contract Voters {
    uint8 public votes;
    uint256 public totalVoters;
    uint256 coolDownTime = 1 days;

    event voterRegistered(address voter);

    struct Voter {
        uint8 remainingVotes;
        bool isRegistered;
        uint256 readyTime;
    }

    mapping(address => Voter) public voters;

    constructor() public {
        votes = 4;
        totalVoters = 0;
    }

    function registerVoter() public {
        totalVoters++;
        voters[msg.sender] = Voter(votes, true, block.timestamp);
        emit voterRegistered(msg.sender);
    }
}
