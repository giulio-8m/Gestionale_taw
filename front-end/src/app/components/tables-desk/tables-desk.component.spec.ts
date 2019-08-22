import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesDeskComponent } from './tables-desk.component';

describe('TablesDeskComponent', () => {
  let component: TablesDeskComponent;
  let fixture: ComponentFixture<TablesDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
