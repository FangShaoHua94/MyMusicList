import { TestBed } from '@angular/core/testing';

import { PlayListService } from './playList.service';

describe('playListService', () => {
  let service: PlayListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
