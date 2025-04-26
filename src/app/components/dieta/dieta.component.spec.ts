import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DietaComponent } from './dieta.component';

describe('DietaComponent', () => {
  let component: DietaComponent;
  let fixture: ComponentFixture<DietaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DietaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
