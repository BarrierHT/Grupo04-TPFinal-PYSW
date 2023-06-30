import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreGroupsComponent } from './explore-groups.component';

describe('ExploreGroupsComponent', () => {
  let component: ExploreGroupsComponent;
  let fixture: ComponentFixture<ExploreGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreGroupsComponent]
    });
    fixture = TestBed.createComponent(ExploreGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
