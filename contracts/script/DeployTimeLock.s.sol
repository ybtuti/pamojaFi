// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {TimeLock} from "../src/daoModule/TimeLock.sol";
import {console} from "forge-std/console.sol";

contract DeployTimeLock is Script {
    address deployer;
    function run() external {
        deployer = msg.sender;
        uint256 minDelay = 60;
        address[] memory proposers = new address[](1);
        proposers[0] = deployer;
        address[] memory executors = new address[](1);
        executors[0] = deployer; 

        vm.startBroadcast();

        TimeLock timeLock = new TimeLock(minDelay, proposers, executors);

        vm.stopBroadcast();

        console.log("TimeLock deployed to:", address(timeLock));
    }
}