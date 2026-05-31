import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthIconComponent } from './oauth-icon.component';

describe('OauthIconComponent', () => {
  let component: OauthIconComponent;
  let fixture: ComponentFixture<OauthIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
