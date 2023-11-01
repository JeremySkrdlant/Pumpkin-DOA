import { Component } from '@angular/core';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pumpkinFrontend';

  suggestion = ""

  constructor(public web3: Web3Service) { }

  submitSuggestion() {
    this.web3.submitSuggestion(this.suggestion)
  }

}
