import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscolherDietaPage } from './escolher-dieta.page';

describe('EscolherDietaPage', () => {
  let component: EscolherDietaPage;
  let fixture: ComponentFixture<EscolherDietaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolherDietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
