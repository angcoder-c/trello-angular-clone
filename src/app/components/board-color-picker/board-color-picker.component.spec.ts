import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColorPickerComponent } from './board-color-picker.component';

describe('BoardColorPickerComponent', () => {
  let component: BoardColorPickerComponent;
  let fixture: ComponentFixture<BoardColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardColorPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
