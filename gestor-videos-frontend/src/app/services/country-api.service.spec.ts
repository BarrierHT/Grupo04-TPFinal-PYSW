import { TestBed } from '@angular/core/testing';

import { CountryApiService } from './country-api.service';

describe('CountryApiService', () => {
  let service: CountryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
