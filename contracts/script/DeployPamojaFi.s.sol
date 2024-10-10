//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {PamojaFi} from "../src/PamojaFi.sol";
import {console} from "forge-std/console.sol";


contract DeployPamojaFi is Script {
    function setUp() public {}

    function run() external {
        // Start broadcasting transactions
        vm.startBroadcast();

        //Chainlink price feed address for Base network
        address priceFeedAddress = 0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1;      
        PamojaFi pamojaFi = new PamojaFi(priceFeedAddress);
        console.log("PamojaFi deployed at: ", address(pamojaFi));
        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}
