import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdadePage } from './idade.page';

describe('IdadePage', () => {
  let component: IdadePage;
  let fixture: ComponentFixture<IdadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
