import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularScaleEditorTokenComponent } from './modular-scale-editor-token.component';

describe('ModularScaleEditorTokenComponent', () => {
  let component: ModularScaleEditorTokenComponent;
  let fixture: ComponentFixture<ModularScaleEditorTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModularScaleEditorTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularScaleEditorTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
