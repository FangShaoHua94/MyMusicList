import { TestBed } from '@angular/core/testing';

import { playListService } from './playList.service';

describe('playListService', () => {
  let service: playListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(playListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
