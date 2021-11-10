import { TestBed } from '@angular/core/testing';

import { TextStylesService } from './text-styles.service';

describe('TextStylesService', () => {
  let service: TextStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
