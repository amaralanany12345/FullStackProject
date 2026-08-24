import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemDetails } from './cart-item-details';

describe('CartItemDetails', () => {
  let component: CartItemDetails;
  let fixture: ComponentFixture<CartItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
