import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileNameComponent } from './input-file-name.component';

describe('InputFileNameComponent', () => {
  let component: InputFileNameComponent;
  let fixture: ComponentFixture<InputFileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFileNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
