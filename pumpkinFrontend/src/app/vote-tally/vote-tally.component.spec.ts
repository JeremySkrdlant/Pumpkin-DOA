import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteTallyComponent } from './vote-tally.component';

describe('VoteTallyComponent', () => {
  let component: VoteTallyComponent;
  let fixture: ComponentFixture<VoteTallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteTallyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteTallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
