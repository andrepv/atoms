import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListHeaderComponent } from './group-list-header.component';

describe('GroupsHeaderComponent', () => {
  let component: GroupListHeaderComponent;
  let fixture: ComponentFixture<GroupListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupListHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
