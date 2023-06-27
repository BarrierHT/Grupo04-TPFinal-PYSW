import { TestBed } from '@angular/core/testing';

import { VideoApiService } from './video-api.service';

describe('VideoApiService', () => {
  let service: VideoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
