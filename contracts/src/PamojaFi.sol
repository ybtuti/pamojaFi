// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC4626C, IERC4626C} from "src/ERC4626C.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
//import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {AggregatorV3Interface, OracleLib} from "./libraries/OracleLib.sol";

/**
 * @title PamojaFi
 * @author ybtuti
 * @notice PamojaFi is a contract that allows users to fund a pool and withdraw their funds.
 */
contract PamojaFi is ERC4626C, Ownable, ReentrancyGuard {
    // ===============================
    //          Errors
    // ===============================

    error PamojaFi__InvalidAddress();
    error PamojaFi__NoUsersProvided();
    error PamojaFi__TotalDepositTooLow();
    error PamojaFi__DepositPerUserTooLow();
    error PamojaFi__UserHasNoActiveProposal();
    error PamojaFi__PoolNotActive();
    error PamojaFi__DepositAmountTooLow();
    error PamojaFi__InvalidRandomNumber();
    error PamojaFi__PoolFundsZero();
    error PamojaFi__FeeTooLow();
    error PamojaFi__InsufficientFunds();
    error PamojaFi__TransferFailed();
    error PamojaFi__StalePrice();

    /// @title PamojaFi
    /// @dev Contract extending ERC4626C with additional asset management and pooling functionalities.
    // ===============================
    //          Types
    // ===============================
    using OracleLib for AggregatorV3Interface;

    // ===============================
    //          State Variables
    // ===============================
    /// @dev Mapping to store the funds of each user.
    mapping(address => uint256) private s_userBalances;

    /// @dev Mapping to store the proposal hashes for each user.
    mapping(address => bytes32) private s_proposalHashes;

    /// @dev Mapping to store the total amount funded in USD for each token ID.
    mapping(uint256 => uint256) private s_totalFundedUSD;

    /// @dev Boolean to track if the funding pool is active.
    bool private s_isPoolActive;

    /// @dev Variable to track the total funds in the pool.
    uint256 private s_poolBalance;

    /// @dev Instance of the Chainlink price feed for ETH/USD.
    AggregatorV3Interface private s_priceFeed;

    /// @dev Base URI for metadata.
    string private s_baseUri;

    /// @dev Event emitted when funds are deposited by a user.
    /// @param funder The address of the user who deposited funds.
    /// @param amount The amount of funds deposited.
    /// @param tokenId The token ID associated with the deposit.
    event Funded(address indexed funder, uint256 amount, uint256 tokenId);

    /// @dev Event emitted when the pool is funded.
    /// @param funder The address of the user who funded the pool.
    /// @param amount The amount of funds added to the pool.
    /// @param tokenId The token ID associated with the deposit.
    event PoolFunded(address indexed funder, uint256 amount, uint256 tokenId);

    /// @dev Event emitted when a project is added or updated.
    /// @param user The address of the user whose project was added/updated.
    /// @param proposalHash The hash of the project proposal.
    event ProjectAdded(address indexed user, bytes32 proposalHash);

    /// @dev Event emitted when the pool ends.
    /// @param totalAmount The total amount of funds in the pool.
    /// @param userAmount The amount of funds allocated per user.
    event PoolEnded(uint256 indexed totalAmount, uint256 indexed userAmount);

    /// @dev Event emitted when a user withdraws funds.
    /// @param user The address of the user who withdrew funds.
    /// @param amount The amount of funds withdrawn.
    event FundsWithdrawn(address indexed user, uint256 amount);

    /// @dev Event emitted when the pool's active status changes.
    /// @param isActive The new status of the pool (true for active, false for inactive).
    event PoolStatusChanged(bool isActive);

    /// @dev Mapping to track funded users
    mapping(address => bool) private s_fundedUsers;

    /// @dev Constructor to initialize the PamojaFi contract.
    /// @param priceFeedAddress The address of the price feed contract.
    constructor(
        address priceFeedAddress
    ) ERC4626C("PamojaFi", "PF") Ownable(_msgSender()) {
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
        s_baseUri = "";
        s_isPoolActive = false;
    }

    /**
     *
     *     STATE UPDATE FUNCTIONS
     *
     */

    /// @dev Function to fund multiple users with a single transaction.
    /// @param userAddresses Array of user addresses to be funded.
    function fund(
        address[] calldata userAddresses
    ) public payable nonReentrant {
        uint256 numUsers = userAddresses.length;
        if (numUsers == 0) revert PamojaFi__NoUsersProvided();

        uint256 totalDeposits = msg.value;
        if (totalDeposits == 0) revert PamojaFi__TotalDepositTooLow();

        uint256 depositPerUser = totalDeposits / numUsers;
        if (depositPerUser == 0) revert PamojaFi__DepositPerUserTooLow();

        uint256 tokenId = deposit(msg.value, _msgSender());

        for (uint256 i = 0; i < numUsers; ++i) {
            s_userBalances[userAddresses[i]] += depositPerUser;
            s_fundedUsers[userAddresses[i]] = true; // Mark user as funded
        }

        s_totalFundedUSD[tokenId] += totalDeposits;

        emit Funded(_msgSender(), totalDeposits, tokenId);
    }

    /*
     * @dev Function to fund the pool.
     */

    function poolFunds() public payable nonReentrant {
        if (!s_isPoolActive) revert PamojaFi__PoolNotActive();

        uint256 basePrice = _getLatestPrice();
        uint256 totalDeposits = msg.value;

        s_poolBalance += totalDeposits;
        uint256 amountInUSD = (totalDeposits * basePrice) / 10 ** 18;
        if (amountInUSD == 0) revert PamojaFi__DepositAmountTooLow();

        uint256 tokenId = deposit(msg.value, _msgSender());

        s_totalFundedUSD[tokenId] += amountInUSD * 2;

        emit PoolFunded(_msgSender(), totalDeposits, tokenId);
    }

    /// @dev Function for users to withdraw their funds.
    function withdrawFunds() public nonReentrant {
        uint256 userBalance = s_userBalances[_msgSender()]; // Get user balance
        if (userBalance == 0) revert PamojaFi__InsufficientFunds(); // Revert if insufficient funds

        s_userBalances[_msgSender()] = 0; // Reset user funds

        /// Can add a platform fee in the future, but for now, it's free to use!

        (bool success, ) = _msgSender().call{value: userBalance}(""); // Transfer funds to user
        if (!success) revert PamojaFi__TransferFailed(); // Revert if transfer fails

        emit FundsWithdrawn(_msgSender(), userBalance); // Emit FundsWithdrawn event
    }

    /// @dev Function for the owner to add or update a project proposal.
    /// @param proposalUserAddress The address of the user for the proposal.
    /// @param proposalHash The hash of the proposal.
    function addOrUpdateProject(
        address proposalUserAddress,
        bytes32 proposalHash
    ) public onlyOwner {
        if (proposalUserAddress == address(0)) {
            revert PamojaFi__InvalidAddress();
        }
        s_proposalHashes[proposalUserAddress] = proposalHash;
        emit ProjectAdded(proposalUserAddress, proposalHash);
    }

    /// @dev Function for the owner to end the funding pool and distribute funds.
    /// @param userAddresses Array of user addresses to distribute funds to.
    function endPool(address[] calldata userAddresses) public onlyOwner {
        uint256 numUsers = userAddresses.length;
        if (s_poolBalance == 0) revert PamojaFi__PoolFundsZero();

        uint256 depositPerUser = s_poolBalance / numUsers;

        for (uint256 i = 0; i < numUsers; ++i) {
            // if (getUserProposalHash(userAddresses[i]) == bytes32(0))
            //     revert PamojaFi__UserHasNoActiveProposal();
            s_userBalances[userAddresses[i]] += depositPerUser;
        }

        s_isPoolActive = false;

        emit PoolEnded(s_poolBalance, depositPerUser);
    }

    /**
     *
     *     SETTER FUNCTIONS
     *
     */

    /// @dev Function for the owner to set the pool active or inactive.
    /// @param _poolActive Boolean indicating if the pool should be active or inactive.
    function setPoolActive(bool _poolActive) external onlyOwner {
        s_isPoolActive = _poolActive;
        emit PoolStatusChanged(_poolActive);
    }

    /// @dev Function for the owner to activate the pool.
    function activatePool() public onlyOwner {
        s_isPoolActive = true;
        emit PoolStatusChanged(true);
    }

    // /// @dev Function for the owner to update the Pyth contract address.
    // /// @param _newPythContract The new address of the Pyth contract.
    // function updatePythContract(address _newPythContract) public onlyOwner {
    //     s_pyth = IPyth(_newPythContract);
    // }

    // /// @dev Function for the owner to update the price feed ID.
    // /// @param _newPriceFeedId The new price feed ID.
    // function updatePriceFeed(bytes32 _newPriceFeedId) public onlyOwner {
    //     s_priceFeedId = _newPriceFeedId;
    // }

    /// @dev Function for the owner to update the proposal address for a user.
    /// @param oldUserProposalAddress The old address of the user.
    /// @param newUserProposalAddress The new address of the user.
    function updateUserProposalAddress(
        address oldUserProposalAddress,
        address newUserProposalAddress
    ) public onlyOwner {
        uint256 userFunds = s_userBalances[oldUserProposalAddress];
        delete s_userBalances[oldUserProposalAddress];
        s_userBalances[newUserProposalAddress] = userFunds;

        bytes32 proposalHash = s_proposalHashes[oldUserProposalAddress];
        delete s_proposalHashes[oldUserProposalAddress];
        s_proposalHashes[newUserProposalAddress] = proposalHash;
    }

    /// @dev Function for the owner to update the proposal hash for a user.
    /// @param userProposalAddress The address of the user.
    /// @param newUserProposalHash The new proposal hash for the user.
    function updateUserProposalHash(
        address userProposalAddress,
        bytes32 newUserProposalHash
    ) public onlyOwner {
        s_proposalHashes[userProposalAddress] = newUserProposalHash;
    }

    /**
     *
     *     HELPER FUNCTIONS
     *
     */

    /// @dev Function to return the base URI for metadata.
    /// @return The base URI string.
    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseUri;
    }

    /// @dev Function to get the proposal hash of a user.
    /// @param proposalUserAddress The address of the user.
    /// @return The proposal hash of the user.
    function getUserProposalHash(
        address proposalUserAddress
    ) public view returns (bytes32) {
        return s_proposalHashes[proposalUserAddress];
    }

    /// @dev Function to get the funds of a user.
    /// @param proposalUserAddress The address of the user.
    /// @return The amount of funds for the user.
    function getUserFunds(
        address proposalUserAddress
    ) public view returns (uint256) {
        return s_userBalances[proposalUserAddress];
    }

    /// @dev Function to get the total funds in USD for a token ID.
    /// @param id The token ID.
    /// @return The total funds in USD for the token ID.
    function getTotalFundsInUSD(uint256 id) public view returns (uint256) {
        return s_totalFundedUSD[id];
    }

    /// @dev Function to check if the pool is active.
    /// @return True if the pool is active, false otherwise.
    function getIsPoolActive() public view returns (bool) {
        return s_isPoolActive;
    }

    function getPriceFeedAddress() public view returns (address) {
        return address(s_priceFeed);
    }

    // function getPriceFeedId() public view returns (bytes32) {
    //     return s_priceFeedId;
    // }

    function _getLatestPrice() private view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = s_priceFeed
            .staleCheckLatestRoundData();
        require(price > 0, "Invalid price");
        require(block.timestamp - updatedAt <= 3600, "Stale price");
        return uint256(price);
    }

    /// @dev Function to calculate the scaled amount in Wei for 1 USD.
    /// @return oneDollarInWei The equivalent of 1 USD in Wei.
    function getScaledAmount() public view returns (uint256 oneDollarInWei) {
        (, int256 price, , , ) = s_priceFeed.staleCheckLatestRoundData(); // Use Chainlink price feed
        require(price > 0, "Invalid price");

        // Convert the price to 18 decimal places (Chainlink typically uses 8 decimals for ETH/USD)
        uint256 ethPrice18Decimals = uint256(price) * 10 ** 10;

        // Calculate how much Wei is equivalent to 1 USD
        oneDollarInWei = (1e18 * 1e18) / ethPrice18Decimals;
        return oneDollarInWei;
    }

    // /// @dev Internal function to update the Pyth price feeds and calculate the scaled amount.
    // /// @param priceUpdate Array of price update data from Pyth.
    // /// @return oneDollarInWei The equivalent of 1 USD in Wei.
    // function _updatePythPriceFeeds(
    //     bytes[] calldata priceUpdate // Remove this function as it's not needed for Chainlink
    // ) private returns (uint256 oneDollarInWei) {
    //     // This function is no longer needed; remove it or refactor as necessary
    // }

    /// @dev Allows users who have been funded to withdraw their funds.
    /// @param assets The amount of assets to withdraw.
    /// @param receiver The address to receive the withdrawn assets.
    /// @param owner The address of the token owner.
    /// @return id The token ID associated with the withdrawal.
    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public virtual override returns (uint256 id) {
        // Check if the caller is the owner of the tokens
        require(owner == _msgSender(), "Caller is not the owner");

        // Check if the user has been funded
        require(s_fundedUsers[owner], "User has not been funded");

        // Check if the requested withdrawal amount is greater than zero
        require(assets > 0, "Withdrawal amount must be greater than zero");

        // Check if the owner has sufficient balance
        uint256 userBalance = s_userBalances[owner];
        require(userBalance >= assets, "Insufficient balance for withdrawal");

        // Update the user's balance
        s_userBalances[owner] -= assets;

        // Transfer the assets to the receiver
        (bool success, ) = receiver.call{value: assets}("");
        require(success, "Transfer failed");

        // Emit an event for the withdrawal
        emit FundsWithdrawn(owner, assets);

        // Return the token ID associated with the withdrawal
        id = deposit(0, owner); // Assuming deposit function returns the token ID
    }

    /**
     *
     *     TESTING FUNCTIONS
     *
     */
    function _fund(
        address[] calldata userAddresses
    ) public payable nonReentrant {
        uint256 numUsers = userAddresses.length;
        if (numUsers == 0) revert PamojaFi__NoUsersProvided();

        uint256 totalDeposits = msg.value;
        if (totalDeposits == 0) revert PamojaFi__TotalDepositTooLow();

        uint256 depositPerUser = totalDeposits / numUsers;
        if (depositPerUser == 0) revert PamojaFi__DepositPerUserTooLow();

        uint256 tokenId = deposit(msg.value, _msgSender());

        for (uint256 i = 0; i < numUsers; ++i) {
            // if (getUserProposalHash(userAddresses[i]) == bytes32(0))
            //     revert PamojaFi__UserHasNoActiveProposal();
            s_userBalances[userAddresses[i]] += depositPerUser;
        }

        s_totalFundedUSD[tokenId] += totalDeposits;

        emit Funded(_msgSender(), totalDeposits, tokenId);
    }

    function _poolFunds() public payable nonReentrant {
        if (!s_isPoolActive) {
            revert PamojaFi__PoolNotActive();
        }
        uint256 totalDeposits = msg.value;

        s_poolBalance += totalDeposits;

        uint256 tokenId = deposit(msg.value, _msgSender());

        s_totalFundedUSD[tokenId] += totalDeposits * 2;

        emit PoolFunded(_msgSender(), totalDeposits, tokenId);
    }

    /// @notice Allows the contract owner to withdraw contract balance
    function withdrawForTesting() public onlyOwner {
        payable(_msgSender()).transfer(address(this).balance); // Transfer contract balance to owner
    }
}
