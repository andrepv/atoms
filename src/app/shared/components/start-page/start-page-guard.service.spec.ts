import { TestBed } from '@angular/core/testing';

import { StartPageGuardService } from './start-page-guard.service';

describe('StartPageGuardService', () => {
  let service: StartPageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartPageGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
