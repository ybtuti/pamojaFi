// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ERC4626C} from "../src/ERC4626C.sol";

contract DeployERC4626C is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the ERC4626C contract
        ERC4626C erc4626c = new ERC4626C();

        vm.stopBroadcast();
    }
}