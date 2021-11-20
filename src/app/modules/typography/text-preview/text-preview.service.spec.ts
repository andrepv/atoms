import { TestBed } from '@angular/core/testing';

import { TextPreviewService } from './text-preview.service';

describe('TextStylesService', () => {
  let service: TextPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
