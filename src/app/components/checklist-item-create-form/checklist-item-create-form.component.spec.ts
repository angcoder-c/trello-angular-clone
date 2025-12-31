import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistItemCreateFormComponent } from './checklist-item-create-form.component';

describe('ChecklistItemCreateFormComponent', () => {
  let component: ChecklistItemCreateFormComponent;
  let fixture: ComponentFixture<ChecklistItemCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistItemCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistItemCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
