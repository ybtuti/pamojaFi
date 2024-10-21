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
    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    error PamojaFi__InvalidProposalId();
    error PamojaFi__NoUsersProvided();
    error PamojaFi__TotalDepositTooLow();
    error PamojaFi__DepositPerUserTooLow();
    error PamojaFi__UserHasNoActiveProposal();
    error PamojaFi__PoolNotActive();
    error PamojaFi__DepositAmountTooLow();
    error PamojaFi__PoolFundsZero();
    error PamojaFi__InsufficientFunds();
    error PamojaFi__TransferFailed();
    error PamojaFi__WithdrawalAmountMustBeGreaterThanZero();
    error PamojaFi__PriceMustBeGreaterThanZero();
    error PamojaFi__UserAlreadyExists();
    error PamojaFi__incorrectEtherAmountsent();

    /*//////////////////////////////////////////////////////////////
                            USING DIRECTIVE
    //////////////////////////////////////////////////////////////*/

    using OracleLib for AggregatorV3Interface;

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    bool private s_isPoolActive;
    uint256 private s_poolBalance;
    string private s_baseUri;
    AggregatorV3Interface private s_priceFeed;
    Proposal private s_proposal;
    Proposal[] private s_proposals;
    User private s_user;
    uint256 public numberOfUsers;
    User[] public listOfUsers;

    /*//////////////////////////////////////////////////////////////
                                 STRUCT
    //////////////////////////////////////////////////////////////*/
    enum ProposalStatus {
        Pending, // 0
        Active, // 1
        Closed // 2
    }

    struct Proposal {
        uint256 proposalId;
        string name;
        uint256 targetEth;
        string projectLink;
        address payable projectWalletAddress;
        string imageUrl;
        string teamInformation;
        string category;
        string relevantLinks;
        string shortDescription;
        string additionalDetails;
        ProposalStatus status;
        uint256 totalFunded;
        uint256 funderCount;
    }

    struct User {
        address userAddress;
        string proposalsMade;
        string proposalsVotedOn;
        string name;
    }

    /*//////////////////////////////////////////////////////////////
                                MAPPINGS
    //////////////////////////////////////////////////////////////*/

    mapping(address => uint256) private s_userBalances;
    mapping(address => bytes32) private s_proposalHashes;
    mapping(uint256 => uint256) private s_totalFundedUSD;
    mapping(address => bool) private s_fundedUsers;
    mapping(address => bool) private userHasFunded;
    mapping(address => User) public addressToUser;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

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

    /// @dev Event emitted when a new proposal is created.
    /// @param proposalId The ID of the newly created proposal.
    /// @param creator The address of the user who created the proposal.
    event ProposalCreated(uint256 indexed proposalId, address indexed creator);

    /// @dev Event emitted when the pool's active status changes.
    /// @param isActive The new status of the pool (true for active, false for inactive).
    event PoolStatusChanged(bool isActive);

    /// @dev Event emitted when the status of a proposal changes.
    /// @param proposalId The ID of the proposal whose status changed.
    /// @param newStatus The new status of the proposal.
    event ProposalStatusChanged(uint256 proposalId, ProposalStatus newStatus);

    /*//////////////////////////////////////////////////////////////
                               FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @dev Constructor to initialize the PamojaFi contract.
    /// @param priceFeedAddress The address of the price feed contract.
    constructor(
        address priceFeedAddress
    ) ERC4626C("PamojaFi", "PF") Ownable(_msgSender()) {
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
        s_baseUri = "";
        s_isPoolActive = false;
    }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function createproposal(
        uint256 _proposalId,
        string memory _name,
        uint256 _targetEth,
        string memory _projectLink,
        address _projectWalletAddress,
        string memory _imageUrl,
        string memory _teamInformation,
        string memory _category,
        string memory _relevantLinks,
        string memory _shortDescription,
        string memory _additionalDetails
    ) external returns (uint256) {
        // The function takes in Name, Target in Eth for the proposal, Project link which is a string, project wallet address, imahe url of the project, team information(information about the team), Category of the project, relevant links, Short description and additional details.
        //It outputs the proposal id which is uint256
        Proposal memory newProposal = Proposal({
            proposalId: _proposalId,
            name: _name,
            targetEth: _targetEth,
            projectLink: _projectLink,
            projectWalletAddress: payable(_projectWalletAddress),
            imageUrl: _imageUrl,
            teamInformation: _teamInformation,
            category: _category,
            relevantLinks: _relevantLinks,
            shortDescription: _shortDescription,
            additionalDetails: _additionalDetails,
            status: ProposalStatus.Pending,
            totalFunded: 0,
            funderCount: 0
        });

        s_proposals.push(newProposal);

        emit ProposalCreated(_proposalId, msg.sender);

        return newProposal.proposalId;
    }

    /// @dev Function to fund a proposal with a specified amount in Ether.
    /// @param _proposalId The ID of the proposal to be funded.
    /// @param amountInWei The amount in Ether to fund the proposal.
    function fundproposal(
        uint256 _proposalId,
        uint256 amountInWei
    ) external payable nonReentrant {
        if (msg.value != amountInWei) {
            revert PamojaFi__incorrectEtherAmountsent();
        }

        bool proposalFound = false;

        for (uint256 i = 0; i < s_proposals.length; i++) {
            if (s_proposals[i].proposalId == _proposalId) {
                proposalFound = true;

                s_proposals[i].totalFunded += amountInWei;

                s_proposals[i].funderCount += 1;

                if (s_proposals[i].totalFunded >= s_proposals[i].targetEth) {
                    s_proposals[i].status = ProposalStatus.Closed;
                    // Withdraw funds to the project wallet address
                    // _withdrawFunds(
                    //     s_proposals[i].projectWalletAddress,
                    //     s_proposals[i].totalFunded
                    // );
                }

                emit PoolFunded(_msgSender(), amountInWei, _proposalId);
                break;
            }
        }

        if (!proposalFound) {
            revert PamojaFi__InvalidProposalId();
        }
    }

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
        if (assets == 0) {
            revert PamojaFi__WithdrawalAmountMustBeGreaterThanZero();
        }

        uint256 userBalance = s_userBalances[owner];
        if (userBalance <= assets) {
            revert PamojaFi__InsufficientFunds();
        }
        s_userBalances[owner] -= assets;

        (bool success, ) = receiver.call{value: assets}("");
        if (!success) {
            revert PamojaFi__TransferFailed();
        }
        emit FundsWithdrawn(owner, assets);

        id = deposit(0, owner);
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
        uint256 userBalance = s_userBalances[_msgSender()];
        if (userBalance == 0) revert PamojaFi__InsufficientFunds();

        s_userBalances[_msgSender()] = 0;

        (bool success, ) = _msgSender().call{value: userBalance}("");
        if (!success) revert PamojaFi__TransferFailed();

        emit FundsWithdrawn(_msgSender(), userBalance);
    }

    function addUser(address _userAddress, string memory _name) public {
        if (bytes(addressToUser[_userAddress].name).length != 0) {
            revert PamojaFi__UserAlreadyExists();
        }
        User memory newUser = User({
            userAddress: _userAddress,
            name: _name,
            proposalsMade: "0",
            proposalsVotedOn: "0"
        });
        listOfUsers.push(newUser);

        addressToUser[_userAddress] = newUser;
        numberOfUsers++;
    }

    /// @dev Function for the owner to add or update a project proposal.
    /// @param proposalUserAddress The address of the user for the proposal.
    /// @param proposalHash The hash of the proposal.
    function addOrUpdateProject(
        address proposalUserAddress,
        bytes32 proposalHash
    ) public onlyOwner {
        if (proposalUserAddress == address(0)) {
            revert PamojaFi__InvalidProposalId();
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
            if (getUserProposalHash(userAddresses[i]) == bytes32(0)) {
                revert PamojaFi__UserHasNoActiveProposal();
            }
            s_userBalances[userAddresses[i]] += depositPerUser;
        }

        s_isPoolActive = false;

        emit PoolEnded(s_poolBalance, depositPerUser);
    }

    function supportP(uint256 _proposalId) external {
        // Find the proposal by its ID
        for (uint256 i = 0; i < s_proposals.length; i++) {
            if (s_proposals[i].proposalId == _proposalId) {
                if (s_proposals[i].status == ProposalStatus.Pending) {
                    s_proposals[i].status = ProposalStatus.Active;
                    s_proposals[i].funderCount += 1;
                    // Emit an event for the status change
                    emit ProposalStatusChanged(
                        _proposalId,
                        ProposalStatus.Active
                    );
                }
                return;
            }
        }
        revert PamojaFi__InvalidProposalId();
    }

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

    /// @dev Function to change the status of a proposal and update the ProposalStatus Enum.
    /// @param _proposalId The ID of the proposal to change the status for.
    /// @param _newStatus The new status to set for the proposal.
    function changeProposalStatus(
        uint256 _proposalId,
        ProposalStatus _newStatus
    ) external onlyOwner {
        bool proposalFound = false;
        for (uint256 i = 0; i < s_proposals.length; i++) {
            if (s_proposals[i].proposalId == _proposalId) {
                s_proposals[i].status = _newStatus;
                emit ProposalStatusChanged(_proposalId, _newStatus);
                proposalFound = true;
                break;
            }
        }
        if (!proposalFound) {
            revert PamojaFi__InvalidProposalId();
        }
    }

    /*//////////////////////////////////////////////////////////////
                           INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @dev Function to return the base URI for metadata.
    /// @return The base URI string.
    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseUri;
    }

    function _getLatestPrice() private view returns (uint256) {
        (, int256 price, , , ) = s_priceFeed.staleCheckLatestRoundData();
        if (price < 0) {
            revert PamojaFi__PriceMustBeGreaterThanZero();
        }
        return uint256(price);
    }

    /// @dev Internal function to withdraw funds to the project wallet address.
    /// @param projectWallet The address of the project's wallet.
    /// @param amount The amount to withdraw.
    function _withdrawFunds(
        address payable projectWallet,
        uint256 amount
    ) internal {
        if (amount < 0) {
            revert PamojaFi__WithdrawalAmountMustBeGreaterThanZero();
        }
        projectWallet.transfer(amount);
    }

    /// @dev Function to mark a user as having funded a proposal.
    function _markUserAsFunded(address user) internal {
        userHasFunded[user] = true;
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

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

    function hasUserFunded(address user) external view returns (bool) {
        return userHasFunded[user];
    }

    /// @dev Function to get the status of a specific proposal by its ID.
    /// @param proposalId The ID of the proposal.
    /// @return The status of the proposal.
    function getProposalStatus(
        uint256 proposalId
    ) external view returns (ProposalStatus) {
        for (uint256 i = 0; i < s_proposals.length; i++) {
            if (s_proposals[i].proposalId == proposalId) {
                return s_proposals[i].status;
            }
        }
        revert PamojaFi__InvalidProposalId();
    }

    /// @dev Function to get all proposals.
    /// @return An array of all proposals.
    function getAllProposals() external view returns (Proposal[] memory) {
        return s_proposals;
    }

    /// @dev Function to calculate the scaled amount in Wei for 1 USD.
    /// @return oneDollarInWei The equivalent of 1 USD in Wei.
    function getScaledAmount() public view returns (uint256 oneDollarInWei) {
        (, int256 price, , , ) = s_priceFeed.staleCheckLatestRoundData();
        if (price < 0) {
            revert PamojaFi__PriceMustBeGreaterThanZero();
        }
        uint256 ethPrice18Decimals = uint256(price) * 10 ** 10;
        oneDollarInWei = (1e18 * 1e18) / ethPrice18Decimals;
        return oneDollarInWei;
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
        payable(_msgSender()).transfer(address(this).balance);
    }
}
