// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./Report.sol";

contract AddReport is Reports {
    event newReport(bool _result, uint256 _fileHash);

    function addReport(
        string calldata _title,
        string calldata _report,
        string calldata _location,
        uint256 _fileHash
    ) external {
        reports.push(
            Report({
                title: _title,
                report: _report,
                location: _location,
                fileHash: _fileHash,
                upVote: 0,
                downVote: 0
            })
        );
        emit newReport(true, _fileHash);
        totalReports++;
    }

    function upVoteReport(uint256 _id) external returns (bool) {
        reports[_id].upVote++;
        return true;
    }

    function downVoteReport(uint256 _id) external returns (bool) {
        reports[_id].downVote++;
        return true;
    }
}
