import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExercicioSemanalPage } from './exercicio-semanal.page';

describe('ExercicioSemanalPage', () => {
  let component: ExercicioSemanalPage;
  let fixture: ComponentFixture<ExercicioSemanalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicioSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
