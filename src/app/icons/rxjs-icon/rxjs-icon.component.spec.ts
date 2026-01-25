import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsIconComponent } from './rxjs-icon.component';

describe('RxjsIconComponent', () => {
  let component: RxjsIconComponent;
  let fixture: ComponentFixture<RxjsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
