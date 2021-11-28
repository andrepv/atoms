import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceDropzoneComponent } from './typeface-dropzone.component';

describe('CustomFontComponent', () => {
  let component: TypefaceDropzoneComponent;
  let fixture: ComponentFixture<TypefaceDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceDropzoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
