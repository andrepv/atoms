import { TestBed } from '@angular/core/testing';

import { SectionContentEditorService } from './section-content-editor.service';

describe('EditorService', () => {
  let service: SectionContentEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionContentEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
