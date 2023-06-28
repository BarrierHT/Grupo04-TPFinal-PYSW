import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedVideosComponent } from './searched-videos.component';

describe('SearchedVideosComponent', () => {
  let component: SearchedVideosComponent;
  let fixture: ComponentFixture<SearchedVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedVideosComponent]
    });
    fixture = TestBed.createComponent(SearchedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
