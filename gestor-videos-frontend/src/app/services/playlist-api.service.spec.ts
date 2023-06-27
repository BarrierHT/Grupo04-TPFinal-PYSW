import { TestBed } from '@angular/core/testing';

import { PlaylistApiService } from './playlist-api.service';

describe('PlaylistApiService', () => {
  let service: PlaylistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
