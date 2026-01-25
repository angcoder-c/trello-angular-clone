import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindIconComponent } from './tailwind-icon.component';

describe('TailwindIconComponent', () => {
  let component: TailwindIconComponent;
  let fixture: ComponentFixture<TailwindIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailwindIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailwindIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
