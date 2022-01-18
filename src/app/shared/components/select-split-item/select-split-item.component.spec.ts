import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSplitItemComponent } from './select-split-item.component';

describe('SelectSplitItemComponent', () => {
  let component: SelectSplitItemComponent;
  let fixture: ComponentFixture<SelectSplitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSplitItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSplitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
