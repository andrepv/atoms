import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTokenComponent } from './editable-token.component';

describe('EditableTokenComponent', () => {
  let component: EditableTokenComponent;
  let fixture: ComponentFixture<EditableTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
