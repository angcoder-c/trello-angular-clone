import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDescriptionEditableComponent } from './board-description-editable.component';

describe('BoardDescriptionEditableComponent', () => {
  let component: BoardDescriptionEditableComponent;
  let fixture: ComponentFixture<BoardDescriptionEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDescriptionEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDescriptionEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
