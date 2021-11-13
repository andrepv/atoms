import { TestBed } from '@angular/core/testing';

import { SectionContentManagerService } from './section-content-manager.service';

describe('ContentManagerService', () => {
  let service: SectionContentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionContentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
