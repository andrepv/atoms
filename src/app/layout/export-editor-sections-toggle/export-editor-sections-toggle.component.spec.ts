import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditorSectionsToggleComponent } from './export-editor-sections-toggle.component';

describe('ExportEditorSectionsToggleComponent', () => {
  let component: ExportEditorSectionsToggleComponent;
  let fixture: ComponentFixture<ExportEditorSectionsToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditorSectionsToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEditorSectionsToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
