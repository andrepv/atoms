import { TestBed } from '@angular/core/testing';

import { FontManagerService } from './font-manager.service';

describe('FontManagerService', () => {
  let service: FontManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
