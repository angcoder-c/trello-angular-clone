import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloLogoComponent } from './trello-logo.component';

describe('TrelloLogoComponent', () => {
  let component: TrelloLogoComponent;
  let fixture: ComponentFixture<TrelloLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrelloLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrelloLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
