import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineComponent } from './ordine.component';

describe('OrdineComponent', () => {
  let component: OrdineComponent;
  let fixture: ComponentFixture<OrdineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
