import { TestBed } from '@angular/core/testing';

import { PreloadDataGuard } from './preload-data.guard';

describe('PreloadDataGuard', () => {
  let guard: PreloadDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreloadDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
