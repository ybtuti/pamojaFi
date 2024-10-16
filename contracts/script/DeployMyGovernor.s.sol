// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MyGovernor} from "../src/daoModule/MyGovernor.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {console} from "forge-std/console.sol";

contract DeployMyGovernor is Script {
    function run() external {
        
        address deployer = msg.sender;

        // Replace these with actual addresses or logic to get the addresses
        IVotes token = IVotes();
        TimelockController timelock = TimelockController();

        vm.startBroadcast();

        MyGovernor governor = new MyGovernor(token, timelock);

        vm.stopBroadcast();

        console.log("MyGovernor deployed to:", address(governor));
    }
}