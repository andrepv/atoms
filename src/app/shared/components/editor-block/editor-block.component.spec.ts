import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBlockComponent } from './editor-block.component';

describe('EditorBlockComponent', () => {
  let component: EditorBlockComponent;
  let fixture: ComponentFixture<EditorBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
