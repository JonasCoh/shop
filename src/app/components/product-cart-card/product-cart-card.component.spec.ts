import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartCardComponent } from './product-cart-card.component';

describe('ProductCartCardComponent', () => {
  let component: ProductCartCardComponent;
  let fixture: ComponentFixture<ProductCartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCartCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
