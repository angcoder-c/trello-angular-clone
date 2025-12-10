import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleEditableComponent } from './title-editable.component';

describe('TitleEditableComponent', () => {
  let component: TitleEditableComponent;
  let fixture: ComponentFixture<TitleEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
