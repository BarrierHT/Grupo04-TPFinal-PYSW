import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPanelComponent } from './stats-panel.component';

describe('StatsPanelComponent', () => {
  let component: StatsPanelComponent;
  let fixture: ComponentFixture<StatsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsPanelComponent]
    });
    fixture = TestBed.createComponent(StatsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
