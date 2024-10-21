// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {PamojaFi} from "src/PamojaFi.sol";
import {Test, console} from "forge-std/Test.sol";

contract PamojaFiTest is Test {
    PamojaFi pamojaFi;

    address public USER = makeAddr("user");

    uint256 public constant INITIAL_SUPPLY = 1 ether;

    function setUp() public {
        pamojaFi = new PamojaFi(USER);
        pamojaFi.createproposal(
            1,
            "Test",
            10,
            "",
            USER,
            "",
            "",
            "",
            "",
            "",
            ""
        );
        pamojaFi.changeProposalStatus(1, PamojaFi.ProposalStatus.Active); // Replace 'YourEnumValue' with the correct enum value

        // Transfer Ether to the USER address
        vm.deal(USER, 100 ether); // Set the USER's balance to 10 Ether
    }

    function testFundPropasal() public {
        uint256 proposalId = 1;
        uint256 amountInEther = 5; // Amount to fund the proposal
        uint256 amountInWei = amountInEther * 1 ether;

        console.log("Funding proposal with", amountInWei);

        // Check USER's balance before funding
        uint256 userBalance = address(USER).balance; // Get USER's balance
        console.log("USER's balance before funding:", userBalance); // Print balance

        // Prank the USER address to send Ether
        vm.prank(USER);
        vm.expectRevert();
        pamojaFi.fundproposal{value: amountInWei}(proposalId, amountInEther); // Use amountInWei instead of amountInEther

        // require(success, "Funding proposal failed"); // Remove if not needed
    }
}
