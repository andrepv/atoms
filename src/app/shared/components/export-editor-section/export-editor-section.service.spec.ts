import { TestBed } from '@angular/core/testing';

import { ExportEditorSectionService } from './export-editor-section.service';

describe('ExportEditorSectionService', () => {
  let service: ExportEditorSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportEditorSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
