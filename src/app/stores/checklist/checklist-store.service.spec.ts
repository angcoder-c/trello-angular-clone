import { TestBed } from '@angular/core/testing';

import { ChecklistStoreService } from './checklist-store.service';

describe('ChecklistStoreService', () => {
  let service: ChecklistStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
