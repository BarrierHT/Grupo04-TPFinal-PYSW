import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideoComponent } from './show-video.component';

describe('ShowVideoComponent', () => {
  let component: ShowVideoComponent;
  let fixture: ComponentFixture<ShowVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowVideoComponent]
    });
    fixture = TestBed.createComponent(ShowVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
