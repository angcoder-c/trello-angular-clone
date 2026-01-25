import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackCardComponent } from './stack-card.component';

describe('StackCardComponent', () => {
  let component: StackCardComponent;
  let fixture: ComponentFixture<StackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
