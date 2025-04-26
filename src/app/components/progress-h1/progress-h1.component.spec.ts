import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressH1Component } from './progress-h1.component';

describe('ProgressH1Component', () => {
  let component: ProgressH1Component;
  let fixture: ComponentFixture<ProgressH1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProgressH1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressH1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
