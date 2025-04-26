import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSheetPage } from './payment-sheet.page';

describe('PaymentSheetPage', () => {
  let component: PaymentSheetPage;
  let fixture: ComponentFixture<PaymentSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
