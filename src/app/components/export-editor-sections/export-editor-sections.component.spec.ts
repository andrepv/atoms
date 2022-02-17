import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditorSectionsComponent } from './export-editor-sections.component';

describe('ExportEditorSectionsComponent', () => {
  let component: ExportEditorSectionsComponent;
  let fixture: ComponentFixture<ExportEditorSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditorSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEditorSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
