import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptIconComponent } from './typescript-icon.component';

describe('TypescriptIconComponent', () => {
  let component: TypescriptIconComponent;
  let fixture: ComponentFixture<TypescriptIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypescriptIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
