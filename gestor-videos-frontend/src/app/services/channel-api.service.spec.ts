import { TestBed } from '@angular/core/testing';

import { ChannelApiService } from './channel-api.service';

describe('ChannelApiService', () => {
  let service: ChannelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
