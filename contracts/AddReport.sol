// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./Report.sol";

contract AddReport is Reports {
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
        require(bytes(_fileHash) > 0 && bytes(_title) > 0);

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
