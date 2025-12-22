import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLabelFormComponentComponent } from './set-label-form-component.component';

describe('SetLabelFormComponentComponent', () => {
  let component: SetLabelFormComponentComponent;
  let fixture: ComponentFixture<SetLabelFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetLabelFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetLabelFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
