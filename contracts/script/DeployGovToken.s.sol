// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {GovToken} from "../src/daoModule/GovToken.sol";

contract DeployGovToken is Script {
    function run() external returns (GovToken) {
        vm.startBroadcast();
        GovToken govToken = new GovToken();
        vm.stopBroadcast();
        return govToken;
    }
}
