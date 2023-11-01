import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  @Input() address = "";
  @Input() message = "";
  status = "";
  constructor(public web3: Web3Service) { }

  ngOnInit(): void {
  }

  submitVote() {
    this.web3.submitVote(this.address)
      .then((message) => {
        this.status = message;
      })
      .catch((message) => {
        this.status = message;
      })
  }

}
