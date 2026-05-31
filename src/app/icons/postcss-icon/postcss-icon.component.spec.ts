import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcssIconComponent } from './postcss-icon.component';

describe('PostcssIconComponent', () => {
  let component: PostcssIconComponent;
  let fixture: ComponentFixture<PostcssIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostcssIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcssIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
