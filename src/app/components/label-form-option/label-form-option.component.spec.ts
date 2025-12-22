import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelFormOptionComponent } from './label-form-option.component';

describe('LabelFormOptionComponent', () => {
  let component: LabelFormOptionComponent;
  let fixture: ComponentFixture<LabelFormOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelFormOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelFormOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
