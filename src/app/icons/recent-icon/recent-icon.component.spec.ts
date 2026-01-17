import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentIconComponent } from './recent-icon.component';

describe('RecentIconComponent', () => {
  let component: RecentIconComponent;
  let fixture: ComponentFixture<RecentIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
