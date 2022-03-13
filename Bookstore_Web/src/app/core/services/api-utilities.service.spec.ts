import { TestBed } from '@angular/core/testing';

import { ApiUtilitiesService } from './api-utilities.service';

describe('ApiUtilitiesService', () => {
  let service: ApiUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
