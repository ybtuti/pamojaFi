// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DAO is Ownable, ReentrancyGuard {
    enum ProposalStatus { Pending, Active, Executed, Failed }


    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        ProposalStatus status;
        mapping(address => bool) voters;
        address payable recipient; // Address to receive funds if applicable
        uint256 amount; // Amount to transfer if applicable
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    uint256 public quorum; // Minimum votes required to execute a proposal

    event ProposalCreated(uint256 id, string description, address recipient, uint256 amount);
    event Voted(uint256 proposalId, address voter);
    event ProposalExecuted(uint256 proposalId);
    event ProposalFailed(uint256 proposalId);
    event ProposalActivated(uint256 proposalId); // New event for activation

    modifier proposalExists(uint256 _proposalId) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Proposal does not exist");
        _;
    }

    modifier hasNotVoted(uint256 _proposalId) {
        require(!proposals[_proposalId].voters[msg.sender], "Already voted");
        _;
    }

    constructor(uint256 _quorum) 
    Ownable(msg.sender)
    ReentrancyGuard() {
        quorum = _quorum;
    }

    function createProposal(string memory _description, address payable _recipient, uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount must be greater than zero"); // Check for valid amount
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.description = _description;
        newProposal.status = ProposalStatus.Pending;
        newProposal.recipient = _recipient;
        newProposal.amount = _amount;
        emit ProposalCreated(proposalCount, _description, _recipient, _amount);
    }

    function vote(uint256 _proposalId) public proposalExists(_proposalId) hasNotVoted(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Active, "Proposal is not active");
        
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(_proposalId, msg.sender);
    }

    function executeProposal(uint256 _proposalId) public onlyOwner proposalExists(_proposalId) nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Active, "Proposal is not active");
        
        if (proposal.voteCount >= quorum) {
            proposal.status = ProposalStatus.Executed;
            emit ProposalExecuted(_proposalId);
            
            // Logic to execute the proposal (e.g., transferring funds)
            require(address(this).balance >= proposal.amount, "Insufficient balance in DAO");
            proposal.recipient.transfer(proposal.amount);
        } else {
            proposal.status = ProposalStatus.Failed;
            emit ProposalFailed(_proposalId);
        }
    }

    function activateProposal(uint256 _proposalId) public onlyOwner proposalExists(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Pending, "Proposal is not pending");
        proposal.status = ProposalStatus.Active;
        emit ProposalActivated(_proposalId); // Emit event for activation
    }

    // Function to receive Ether. This is necessary to fund the DAO.
    receive() external payable {}
}
