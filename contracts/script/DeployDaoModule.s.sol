// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {GovToken} from "../src/daoModule/GovToken.sol";
import {TimeLock} from "../src/daoModule/TimeLock.sol";
import {MyGovernor} from "../src/daoModule/MyGovernor.sol";

contract DeployDaoModule is Script {
    GovToken govToken;
    TimeLock timeLock;
    MyGovernor governor;

    //address USER = msg.sender;
    uint256 INITIAL_SUPPLY = 20 ether;

    // address[] proposers;
    // address[] executors;

    uint256[] values;
    bytes[] calldatas;
    address[] targets;

    function run() external {
        deployTimeLockAndGovernorAndGovToken(
            3600,
            new address[](0),
            new address[](0)
        );
    }

    function deployTimeLockAndGovernorAndGovToken(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) public returns (address, address, address) {
        vm.startBroadcast();
        govToken = new GovToken();
        govToken.mint(msg.sender, INITIAL_SUPPLY);
        govToken.delegate(msg.sender);
        timeLock = new TimeLock(minDelay, proposers, executors);
        governor = new MyGovernor(govToken, timeLock);
        bytes32 proposerRole = timeLock.PROPOSER_ROLE();
        bytes32 executorRole = timeLock.EXECUTOR_ROLE();
        //bytes32 adminRole = timelock.TIMELOCK_ADMIN_ROLE();

        timeLock.grantRole(proposerRole, address(governor));
        timeLock.grantRole(executorRole, address(0));
        vm.stopBroadcast();
        return (address(timeLock), address(governor), address(govToken));
    }
}
