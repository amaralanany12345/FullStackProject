import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOrder } from './apply-order';

describe('ApplyOrder', () => {
  let component: ApplyOrder;
  let fixture: ComponentFixture<ApplyOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
