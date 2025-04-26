import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoasVindasPage } from './boas-vindas.page';

describe('BoasVindasPage', () => {
  let component: BoasVindasPage;
  let fixture: ComponentFixture<BoasVindasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoasVindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
