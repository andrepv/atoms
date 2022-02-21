import { TestBed } from '@angular/core/testing';

import { ExportCodePreviewService } from './export-code-preview.service';

describe('ExportCodePreviewService', () => {
  let service: ExportCodePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportCodePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
