import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistCreateFormComponent } from './checklist-create-form.component';

describe('ChecklistCreateFormComponent', () => {
  let component: ChecklistCreateFormComponent;
  let fixture: ComponentFixture<ChecklistCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
