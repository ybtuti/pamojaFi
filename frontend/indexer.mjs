const { EAS } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require("ethers");
const ABI = require("./attestation_ABI.js");

const provider = new ethers.JsonRpcProvider("YOUR RPC URL");

const contractAddress = "0x2c7eE1E5f416dfF40054c27A62f7B357C4E8619C";

const indexerContract = new ethers.Contract(contractAddress, ABI, provider);

module.exports = {
  indexerContract,
  provider,
};
