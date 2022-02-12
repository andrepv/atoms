import { TestBed } from '@angular/core/testing';

import { ExportEditorService } from './export-editor.service';

describe('ExportEditorService', () => {
  let service: ExportEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
