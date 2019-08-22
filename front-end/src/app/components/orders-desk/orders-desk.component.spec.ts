import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDeskComponent } from './orders-desk.component';

describe('OrdersDeskComponent', () => {
  let component: OrdersDeskComponent;
  let fixture: ComponentFixture<OrdersDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
