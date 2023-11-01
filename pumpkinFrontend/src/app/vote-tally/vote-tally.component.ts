import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vote-tally',
  templateUrl: './vote-tally.component.html',
  styleUrls: ['./vote-tally.component.css']
})
export class VoteTallyComponent implements OnInit {
  @Input() message = "";
  @Input() count = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
