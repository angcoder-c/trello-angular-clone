import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DexieIconComponent } from './dexie-icon.component';

describe('DexieIconComponent', () => {
  let component: DexieIconComponent;
  let fixture: ComponentFixture<DexieIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DexieIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DexieIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
