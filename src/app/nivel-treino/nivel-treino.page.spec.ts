import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NivelTreinoPage } from './nivel-treino.page';

describe('NivelTreinoPage', () => {
  let component: NivelTreinoPage;
  let fixture: ComponentFixture<NivelTreinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelTreinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
