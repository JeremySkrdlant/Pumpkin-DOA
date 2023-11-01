import { Injectable } from '@angular/core';
import { ethers, BrowserProvider, Signer, Contract } from 'ethers';
import PumpkinVote from '../assets/artifacts/contracts/PumpkinVote.sol/PumpkinVote.json';


declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  provider?: BrowserProvider;
  signer?: Signer;
  browserWalletIsPresent: boolean;
  walletAddress = "";
  contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  abi = PumpkinVote.abi;

  allSuggestions: Array<Suggestion> = [];
  allVotes: Array<VotingResuls> = [];
  suggestionPeriodClosed = false;
  contract: Contract;

  constructor() {
    if (window.ethereum) {
      this.browserWalletIsPresent = true;
    } else {
      this.browserWalletIsPresent = false;
    }
    this.provider = new ethers.BrowserProvider(window.ethereum)
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider);
    this.isConnected();

    this.checkSuggestionPeriod();

    this.contract.on("SuggestionPeriodClosed", (isClosed) => {
      console.log("They shut it down");

      this.suggestionPeriodClosed = true;
    })
  }



  async checkSuggestionPeriod() {
    console.log("getting suggestion");

    this.suggestionPeriodClosed = await this.contract!["suggestionsLocked"]();
    console.log(this.suggestionPeriodClosed);

  }

  async getEth() {
    let address = await this.signer!.getAddress()
    console.log(address)
    await fetch(`http://10.200.77.243:3000/requestEth/${address}`)
  }

  async SeeResult() {
    let result = await this.contract!["getVoteTallies"]();

    let messages = result[0];
    let total = result[1];

    this.allVotes = [];
    for (var i = 0; i < messages.length; i++) {
      let data = { message: messages[i], vote: total[i] }
      this.allVotes.push(data);
    }

    console.log(this.allVotes);

  }

  async requestTokens() {
    let result = await this.contract!["requestToken"]();
    console.log(result);
  }

  async updateMyTokenCount() {
    let result = await this.contract!["balanceOf"](await this.signer?.getAddress.toString());
    console.log(result);

  }

  async submitSuggestion(suggestion: string) {
    let result = await this.contract!["addSuggestion"](suggestion);
    console.log(result);
  }

  async authorizeBurn() {
    let address = await this.signer?.getAddress();
    let result = await this.contract!["approve"](address, 3);

    //Promise or something to improve this. 
  }

  async getSuggestions() {
    let result = await this.contract!["getAllSuggestions"]();

    let addresses = result[0];
    let suggestions = result[1];
    this.allSuggestions = []

    for (let i = 0; i < addresses.length; i++) {
      let result = { address: addresses[i], message: suggestions[i] }
      this.allSuggestions.push(result)
    }
    console.log(this.allSuggestions);
  }

  async submitVote(address: string): Promise<string> {
    return new Promise(async (success, error) => {
      try {

        let result = await this.contract["voteFor"](address)
        console.log(result);
        success("Thank you for your vote")
      } catch {
        error("Suggestion Period not closed yet")
      }
    })
  }



  async isConnected() {
    if (this.provider) {
      const accounts = await this.provider!.send("eth_accounts", []);

      if (accounts.length > 0) {
        this.walletAddress = accounts[0]
        this.signer = await this.provider!.getSigner();
        this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signer);
      }
    }

  }

  async connectToWallet() {
    this.signer = await this.provider?.getSigner();
    if (this.signer) {
      this.walletAddress = await this.signer!.getAddress();
      this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signer);
    }
  }


}

export interface Suggestion {
  address: string;
  message: string;
}

export interface VotingResuls {
  message: string;
  vote: number;
}