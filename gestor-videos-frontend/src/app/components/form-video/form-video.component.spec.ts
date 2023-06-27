import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVideoComponent } from './form-video.component';

describe('FormVideoComponent', () => {
  let component: FormVideoComponent;
  let fixture: ComponentFixture<FormVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormVideoComponent]
    });
    fixture = TestBed.createComponent(FormVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
