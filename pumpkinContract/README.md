# Pumpkin Contract

This is a simple ERC20 contract that allows us to vote. 

## rules 
* Each Wallet address gets one suggestion.  They can change it but they can not have 2.
* Each Wallet can request 3 tokens (note, they do need to authorize these tokens for burn)
* The user can not vote while the suggestion period is open.
* Each vote burns one of the users voting tokens.

## Future Plans 
* Add more event emitters
* Seperate the Governance out into a seperate contract. 
