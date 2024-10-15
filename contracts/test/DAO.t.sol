// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import {DAO} from "src/daoModule/Dao.sol";

contract DAOTest is Test {
    DAO dao;
    address owner;
    address addr1;
    address addr2;

    function setUp() public {
        owner = address(this);
        addr1 = address(0x1);
        addr2 = address(0x2);
        dao = new DAO(2); // Set quorum to 2
    }

    function testDeployment() public view {
        assertEq(dao.owner(), owner);
        assertEq(dao.quorum(), 2);
    }

    // function testCreateProposal() public {
    //     dao.createProposal("Proposal 1", payable(addr1), 1 ether);
    //     DAO.Proposal memory proposal = dao.proposals(1);
    //     assertEq(proposal.description, "Proposal 1");
    //     assertEq(proposal.recipient, addr1);
    //     assertEq(proposal.amount, 1 ether);
    //     assertEq(uint(proposal.status), uint(DAO.ProposalStatus.Pending));
    // }

    function testCreateProposalFailsOnZeroAmount() public {
        vm.expectRevert("Amount must be greater than zero");
        dao.createProposal("Proposal 2", payable(addr1), 0);
    }

    function testVote() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        vm.prank(addr1);
        dao.vote(1);
        //DAO.Proposal memory proposal = dao.proposals(1);
        //assertEq(proposal.voteCount, 1);
    }

    function testVoteFailsIfAlreadyVoted() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        vm.prank(addr1);
        dao.vote(1);
        vm.expectRevert("Already voted");
        dao.vote(1);
    }

    function testVoteFailsIfProposalNotActive() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        vm.prank(addr2);
        vm.expectRevert("Proposal is not active");
        dao.vote(1);
    }

    function testActivateProposal() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        //DAO.Proposal memory proposal = dao.proposals(1);
        //assertEq(uint256(proposal.status), uint256(DAO.ProposalStatus.Active));
    }

    function testActivateProposalFailsIfNotPending() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        vm.expectRevert("Proposal is not pending");
        dao.activateProposal(1);
    }

    function testExecuteProposal() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        vm.prank(addr1);
        dao.vote(1);
        vm.prank(addr2);
        dao.vote(1); // Meet quorum
        // Fund the contract
        vm.deal(address(dao), 2 ether);
        dao.executeProposal(1);
        // DAO.Proposal memory proposal = dao.proposals(1);
        // assertEq(uint256(proposal.status), uint256(DAO.ProposalStatus.Executed));
    }

    function testExecuteProposalFailsIfQuorumNotMet() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        vm.prank(addr1);
        dao.vote(1);
        vm.expectRevert("Proposal is not active");
        dao.executeProposal(1);
    }

    function testExecuteProposalFailsIfInsufficientFunds() public {
        dao.createProposal("Proposal 1", payable(addr1), 1 ether);
        dao.activateProposal(1);
        vm.prank(addr1);
        dao.vote(1);
        vm.prank(addr2);
        dao.vote(1); // Meet quorum
        vm.expectRevert("Insufficient balance in DAO");
        dao.executeProposal(1);
    }

    function testFundingTheDAO() public {
        vm.deal(address(dao), 1 ether);
        assertEq(address(dao).balance, 1 ether);
    }
}
