// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;
import "./Report.sol";
import "./Voter.sol";

contract AddReport is Reports, Voters {
    event reportUploaded(
        uint256 _id,
        string title,
        string report,
        string location,
        string _fileHash,
        uint256 upVote,
        uint256 downVote
    );

    function addReport(
        string memory _title,
        string memory _report,
        string memory _location,
        string memory _fileHash
    ) public {
        require(bytes(_fileHash).length > 0 && bytes(_title).length > 0);
        totalReports++;
        reports[totalReports] = Report({
            id: totalReports,
            title: _title,
            report: _report,
            location: _location,
            fileHash: _fileHash,
            upVote: 0,
            downVote: 0
        });

        emit reportUploaded(
            totalReports,
            _title,
            _report,
            _location,
            _fileHash,
            0,
            0
        );
    }

    function upVoteReport(uint256 _id) public isRegistered returns (uint256) {
        Voter storage myVoter = voters[msg.sender];
        if (initialiseVote(myVoter)) {
            reports[_id].upVote++;
            return reports[_id].upVote;
        } else {
            revert("something Went wrong");
        }
    }

    function downVoteReport(uint256 _id) public isRegistered returns (uint256) {
        Voter storage myVoter = voters[msg.sender];
        if (initialiseVote(myVoter)) {
            reports[_id].downVote++;
            return reports[_id].downVote++;
        } else {
            revert("something Went wrong");
        }
    }

    function voterIsReady(Voter storage _voter) internal view returns (bool) {
        return (_voter.readyTime <= block.timestamp);
    }

    function initialiseVote(Voter storage _voter) internal returns (bool) {
        if (_voter.remainingVotes <= 0) {
            if (voterIsReady(_voter)) {
                _voter.remainingVotes = 4;
                return true;
            } else {
                return false;
            }
        } else {
            _voter.remainingVotes--;
            if (_voter.remainingVotes == 0) {
                _voter.readyTime = uint256(block.timestamp + coolDownTime);
            }
            return true;
        }
    }

    modifier isRegistered() {
        require(voters[msg.sender].isRegistered);
        _;
    }
}
