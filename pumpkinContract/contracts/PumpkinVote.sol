// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PumpkinVote is ERC20, ERC20Burnable, Ownable {
    mapping(address => bool) public voters;
    mapping(address => bool) public suggested;
    mapping(address => string) public suggestions;
    mapping(address => uint8) public votes;
    address[] public suggestors;
    bool public suggestionsLocked = false;

    event SuggestionPeriodClosed(bool indexed isLocked);

    constructor() ERC20("Pumpkin", "NTPK") Ownable(msg.sender) {}

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function requestToken() public {
        require(
            voters[msg.sender] == false,
            "You already got your voting token!"
        );
        _mint(msg.sender, 3);
        voters[msg.sender] = true;
    }

    //Suggestion area

    modifier suggestionOpen() {
        require(!suggestionsLocked, "The suggestion period is closed");
        _;
    }

    modifier suggestionClosed() {
        require(
            suggestionsLocked,
            "You can not vote during the suggestion period"
        );
        _;
    }

    function addSuggestion(string memory suggestion) public suggestionOpen {
        if (suggested[msg.sender] == false) {
            suggestors.push(msg.sender);
            suggested[msg.sender] = true;
        }

        suggestions[msg.sender] = suggestion;
    }

    function closeSuggestionPeriod() public onlyOwner {
        suggestionsLocked = true;
        emit SuggestionPeriodClosed(suggestionsLocked);
    }

    //voting
    modifier hasTokens() {
        require(
            balanceOf(msg.sender) > 0,
            "You do not have any voting tokens."
        );
        _;
    }

    function voteFor(
        address suggestionAddress
    ) public hasTokens suggestionClosed {
        votes[suggestionAddress]++;
        burnFrom(msg.sender, 1);
    }

    function getAllSuggestions()
        public
        view
        returns (address[] memory, string[] memory)
    {
        string[] memory results = new string[](suggestors.length);
        address[] memory addressResults = new address[](suggestors.length);
        for (uint i = 0; i < suggestors.length; i++) {
            address current = suggestors[i];
            results[i] = suggestions[current];
            addressResults[i] = current;
        }
        return (addressResults, results);
    }

    function getVoteTallies()
        public
        view
        returns (string[] memory, uint8[] memory)
    {
        string[] memory suggestionResult = new string[](suggestors.length);
        uint8[] memory tallyResult = new uint8[](suggestors.length);
        for (uint i = 0; i < suggestors.length; i++) {
            address current = suggestors[i];
            suggestionResult[i] = suggestions[current];
            tallyResult[i] = votes[current];
        }
        return (suggestionResult, tallyResult);
    }
}
