import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCodePreviewComponent } from './section-code-preview.component';

describe('SectionCodePreviewComponent', () => {
  let component: SectionCodePreviewComponent;
  let fixture: ComponentFixture<SectionCodePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCodePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCodePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
