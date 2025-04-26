import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesoAlturaPage } from './peso-altura.page';

describe('PesoAlturaPage', () => {
  let component: PesoAlturaPage;
  let fixture: ComponentFixture<PesoAlturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoAlturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
