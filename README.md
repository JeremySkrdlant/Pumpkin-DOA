# Pumpkin-DOA
Each year in Cloud and Crypto we run a DAO to vote on the pumpkin design. 

## Status
This is a really rough version of the app.  It worked but it definaetly has some bugs.  

## Setup 
You will want to install all the node modules. 
```
cd backend
npm install
cd ..
cd pumpkinContract
npm install
cd ..
cd pumpkinFrontend
npm install 
```
## Running the project

### Smart Contract
Compile the contract, run the node, and deploy the contract. 
```
  cd pumpkinContract
  npx hardhat compile
```

Running the Node (pumpkinContract folder)
```
  npm run node
```

Open another terminal and get to the same folder 
deploy the contract
```
  npx hardhat run ./scripts/deploy.ts
```

### Backend
change into the backend directory.  You can use node or nodemon.
```
  nodemon app.js
```

### Frontend
change into the pumpin frontend and serve the app. Serving it this way will allow 
other computers to connect to your live server. 
```
  ng server -o --host 0.0.0.0
```


