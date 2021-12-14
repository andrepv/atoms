import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTokensEditorComponent } from './custom-tokens-editor.component';

describe('CustomTokensEditorComponent', () => {
  let component: CustomTokensEditorComponent;
  let fixture: ComponentFixture<CustomTokensEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTokensEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTokensEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
