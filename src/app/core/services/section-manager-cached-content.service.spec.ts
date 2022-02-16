import { TestBed } from '@angular/core/testing';

import { SectionManagerCachedContentService  } from './section-manager-cached-content.service';

describe('StoreService', () => {
  let service: SectionManagerCachedContentService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionManagerCachedContentService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
