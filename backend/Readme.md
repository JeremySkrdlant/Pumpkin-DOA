# Backend of Pumpkin DAO 

The main goal of this is to act as a faucet that hands out test eth from the hardhat network.  The students wallets do not contain any test eth when we deploy this network. 

This network also allows us to shut down the suggestion period.  

## Improvement 
Use a hash to password protect this operation.  Any individual that knows this route can shutdown the suggestion period. 

Use an actual database that is persistant for when the server crashes. Redis would be a good choice. 

## Wallet Key 
The wallet key in this contract is the default address one of the Hardhat wallet.  There is no actual money in that wallet and you 
should not use it.  **DO NOT DEPLOY THIS TO MAIN NET**

To deploy on a real network, you would need to put your credentials in a .env file and make sure they are not pushed to github. 
