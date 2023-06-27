import { TestBed } from '@angular/core/testing';

import { RatingApiService } from './rating-api.service';

describe('RatingApiService', () => {
  let service: RatingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
